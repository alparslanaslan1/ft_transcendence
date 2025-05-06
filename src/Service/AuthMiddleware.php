<?php
namespace App\Service;

class AuthMiddleware
{
    public static function protect(): object
    {
        $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (!preg_match('/Bearer\s(\S+)/', $hdr, $m)) {
            http_response_code(401);
            exit(json_encode(['error'=>'Token bulunamadı']));
        }
        try {
            return AuthService::validateToken($m[1]);
        } catch (\Exception $e) {
            http_response_code(401);
            exit(json_encode(['error'=>'Geçersiz token']));
        }
    }
}
