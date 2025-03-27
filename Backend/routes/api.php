<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthJwtController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('test-api', function () {
    return response()->json([
        'status' => 200,
        'message' => 'data rahasia mr. daud',
        'data' => ['nama' => 'Mr.Daud', 'umur' => 25]
    ]);
})->middleware(['custom-header']);


Route::post('users/register', [AuthController::class, 'register']);
Route::post('users/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('users/logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::post('/products', [ProductController::class, 'store']);
Route::post('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// jwt auth
Route::post('jwt/register', [AuthJwtController::class, 'register']);
Route::post('jwt/login', [AuthJwtController::class, 'login'])->middleware(['custom-header']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('jwt/profile', [AuthJwtController::class, 'profile']);
    Route::post('jwt/logout', [AuthJwtController::class, 'logout']);
    Route::post('jwt/refresh', [AuthJwtController::class, 'refresh']);
});
