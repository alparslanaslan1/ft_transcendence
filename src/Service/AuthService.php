<?php
namespace App\Service;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService
{
    public static function issueToken(array $user): string
    {
        $now = time();
        $payload = [
            'iss' => $_ENV['JWT_ISSUER'],
            'iat' => $now,
            'exp' => $now + (int)$_ENV['JWT_LIFETIME'],
            'user' => ['id'=>$user['id'],'email'=>$user['email'],'alias'=>$user['alias']]
        ];
        return JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');
    }

    public static function validateToken(string $jwt): object
    {
        return JWT::decode($jwt, new Key($_ENV['JWT_SECRET'], 'HS256'));
    }
}
