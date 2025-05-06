<?php
namespace App\Service;

use PDO;

class UserService
{
    public function __construct(private PDO $pdo){}

    public function create(string $email, string $pass, string $alias): bool
    {
        $hash = password_hash($pass, PASSWORD_BCRYPT);
        $stmt = $this->pdo->prepare(
            "INSERT INTO users (email,password,alias) VALUES (?,?,?)"
        );
        return $stmt->execute([$email, $hash, $alias]);
    }

    public function authenticate(string $email, string $pass): ?array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email=?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($pass, $user['password'])) {
            unset($user['password']);
            return $user;
        }
        return null;
    }
}
