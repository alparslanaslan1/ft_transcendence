<?php
// CLI: php src/scripts/migrate.php

require_once __DIR__ . '/../../src/bootstrap.php';

// migrations tablosunu oluştur (eğer yoksa)
$pdo->exec("
    CREATE TABLE IF NOT EXISTS migrations (
        id TEXT PRIMARY KEY,
        applied_at DATETIME NOT NULL
    )
");

$dir = __DIR__ . '/../../migrations';
$applied = $pdo->query("SELECT id FROM migrations")->fetchAll(PDO::FETCH_COLUMN) ?: [];

foreach (scandir($dir) as $file) {
    if (!preg_match('/^\d+.*\.php$/', $file)) continue;
    $id = pathinfo($file, PATHINFO_FILENAME);
    if (in_array($id, $applied)) continue;

    $migration = include "$dir/$file";
    if (is_callable($migration)) {
        echo "Applying $file...\n";
        $pdo->beginTransaction();
        $migration($pdo);
        $pdo->exec("INSERT INTO migrations (id, applied_at) VALUES (" .
            $pdo->quote($id) . ", datetime('now'))");
        $pdo->commit();
    }
}
echo "Migrations tamam.\n";
