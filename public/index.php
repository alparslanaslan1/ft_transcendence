<?php
require __DIR__ . '/../src/bootstrap.php';

use App\Controller\UserController;
use App\Service\AuthMiddleware;

header('Content-Type: application/json');

$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/register' && $method === 'POST') {
    (new UserController($pdo))->register();
    exit;
}

if ($uri === '/api/login' && $method === 'POST') {
    (new UserController($pdo))->login();
    exit;
}

if ($uri === '/api/profile' && $method === 'GET') {
    $tokenData = AuthMiddleware::protect();
    echo json_encode(['profile'=>$tokenData->user]);
    exit;
}

http_response_code(404);
echo json_encode(['error'=>'Not found']);
