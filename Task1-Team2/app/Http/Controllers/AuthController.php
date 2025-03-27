<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public const Headers = [
        'X-TIMESTAMP'   => '2025-03-27',
        'X-SIGNATURE'   => 'MayBank2025',
        'ORIGIN'        => 'www.maybank.com',
        'X-PARTNER-ID'  => '123456',
        'X-EXTERNAL-ID' => '78910',
        'CHANNEL-ID'    => '95221',
    ];

    public function register(Request $request)
    {
        $input = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|email|unique:users",
            "password" => "required|string|min:8|confirmed",
        ]);
        $user = User::create([
            "name" => $input["name"],
            "email" => $input["email"],
            "password" => bcrypt($input["password"]),
        ]);
        $token = $user->createToken('DaudSensei')->plainTextToken;
        $data = [
            'status' => Response::HTTP_CREATED,
            'message' => 'User Berhasil Dibuat',
            'data' => $user,
            'token' => $token,
            'type' => 'Bearer',
        ];
        return response()->json($data, Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $input = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $input['email'])->first();

        if (!$user || !Hash::check($input['password'], $user->password)) {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Kredensial Login Salah. Silahkan Coba Kembali'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $token = $user->createToken('DaudSensei')->plainTextToken;

        $data = [
            'status' => Response::HTTP_OK,
            'message' => 'User Berhasil Login',
            'data' => $user,
            'token' => $token,
            'type' => 'Bearer',
        ];
        return response()->json($data, Response::HTTP_OK);
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token) {
            $token->delete();
        });
        $data = [
            'status' => Response::HTTP_OK,
            'message' => 'Berhasl Logout',
        ];
        return response()->json($data, Response::HTTP_OK);
    }
}
