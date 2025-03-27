<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthJwtController extends Controller
{
    //registrasi
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed|min:8'
        ]);

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password'])
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'User created',
            'data' => $user
        ], Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $token = JWTAuth::attempt([
            'email' => $request['email'],
            'password' => $request['password']
        ]);

        if (!empty($token)) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => 'Login success',
                'token' => $token,
                'type' => 'Bearer (JWT)'
            ], Response::HTTP_OK);
        }
        return response()->json([
            'status' => Response::HTTP_UNAUTHORIZED,
            'message' => 'Invalid credentials',
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function profile()
    {
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'User profile',
            'data' => auth()->user(),
        ]);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        // auth()->logout();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Logout success',
        ], Response::HTTP_OK);
    }

    public function refresh()
    {
        $newToken = JWTAuth::refresh(JWTAuth::getToken());
        $data = [
            'status' => Response::HTTP_OK,
            'message' => 'New token generated',
            'token' => $newToken,
        ];
        return response()->json($data, Response::HTTP_OK);
    }
}
