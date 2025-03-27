<?php

namespace App\Http\Middleware;

use App\Http\Controllers\AuthController;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SnapBI
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::guard('sanctum')->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $ah = AuthController::Headers;
        $res1 = $request->header('X-TIMESTAMP');
        $res2 = $request->header('X-SIGNATURE');
        $res3 = $request->header('ORIGIN');
        $res4 = $request->header('X-PARTNER-ID');
        $res5 = $request->header('X-EXTERNAL-ID');
        $res6 = $request->header('CHANNEL-ID');

        // logic cek header
        if (
            $res1 === $ah['X-TIMESTAMP'] && $res2 === $ah['X-SIGNATURE']
            && $res3 === $ah['ORIGIN'] && $res4 === $ah['X-PARTNER-ID']
            && $res5 === $ah['X-EXTERNAL-ID'] && $res6 === $ah['CHANNEL-ID']
        ) {
            return $next($request);
        } else {
            return response()->json([
                'status' => 599,
                'message' => 'Anda Tidak Punya Akses',
            ], 599);
        }
    }
}
