<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::post('users/register', [AuthController::class, 'register']);
Route::post('users/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('users/logout', [AuthController::class, 'logout']);
    Route::get('informasi-saldo', function () {
        return response()->json([
            'status' => "success",
            'message' => 'Informasi saldo berhasil ditemukan',
            'data' => [
                'saldo' => 1000000,
                'rekening' => "1234567890"
            ],
        ]);
    })->middleware('snap-bi');
});
