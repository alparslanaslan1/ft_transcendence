<?php
namespace App\Controller;

use App\Service\UserService;
use PDO;

class UserController
{
    private UserService $svc;

    public function __construct(private PDO $pdo)
    {
        $this->svc = new UserService($pdo);
        header('Content-Type: application/json');
    }

    public function register(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['email']||$data['password']||$data['alias'])) {
            http_response_code(422);
            echo json_encode(['error'=>'Eksik alan']);
            return;
        }
        $ok = $this->svc->create($data['email'], $data['password'], $data['alias']);
        http_response_code($ok ? 201 : 409);
        echo json_encode(['success'=>$ok]);
    }

    public function login(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $user = $this->svc->authenticate($data['email'], $data['password']);
        if (!$user) {
            http_response_code(401);
            echo json_encode(['error'=>'Geçersiz kimlik']);
            return;
        }
        // Basit token: burada JWT ekleyebilirsin
        $token = \App\Service\AuthService::issueToken($user);
        echo json_encode(['token'=>$token,'user'=>$user]);
    }
}
