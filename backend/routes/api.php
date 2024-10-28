<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'edit']);

Route::post('/products/upload', [ProductController::class, 'upload']);

Route::get('/test', function () {
    return 'Test route is working!';
    });
Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
        });
