<?php
return function(PDO $pdo) {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS migrations (
            id TEXT PRIMARY KEY,
            applied_at DATETIME NOT NULL
        );
    ");
};
