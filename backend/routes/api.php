<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);


Route::post('/products/upload', [ProductController::class, 'upload']);

Route::get('/test', function () {
    return 'Test route is working!';
    });
Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
        });
