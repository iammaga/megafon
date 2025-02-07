<?php

use App\Http\Controllers\AppealController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('appeals')->middleware('can:viewAny,App\Models\Appeal')->group(function () {
        Route::get('/search', [AppealController::class, 'search']);
        Route::get('/', [AppealController::class, 'index']);
        Route::post('/', [AppealController::class, 'store']);
        Route::get('{appeal}', [AppealController::class, 'show']);
        Route::put('{appeal}', [AppealController::class, 'update'])
        ->middleware('can:update,appeal');
    });

    Route::apiResource('users', UserController::class)
        ->middleware('can:viewAny,App\Models\User');
});
