<?php
// src/bootstrap.php

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// DB bağlantısı
$dbPath = $_ENV['DB_PATH'] ?? __DIR__ . '/../database.sqlite';
try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    error_log($e->getMessage());
    die('Database connection failed.');
}

// Global servis olarak kullanılacaksa buraya ekleyebilirsin
