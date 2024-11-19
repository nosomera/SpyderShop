<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrdenesController;

// Rutas relacionadas con productos
Route::get('/products', [ProductController::class, 'index']); // Lista de productos
Route::post('/products', [ProductController::class, 'store']); // Crear un nuevo producto
Route::get('/products/{id}', [ProductController::class, 'show']); // Ver un producto por ID
Route::put('/products/{id}', [ProductController::class, 'edit']); // Editar un producto por ID
Route::post('/products/upload', [ProductController::class, 'upload']); // Subir datos de productos

// Rutas relacionadas con usuarios
Route::get('/users', [UserController::class, 'index']); // Listar todos los usuarios
Route::get('/users/{id}', [UserController::class, 'showUser']); // Ver un usuario por ID

// Rutas de autenticación
Route::post('/register', [UserController::class, 'register']);
Route::post('/logout', [UserController::class, 'logout']);
Route::get('/validation', [UserController::class, 'validateToken']);
Route::post('/login', [UserController::class, 'login']);

//Rutas de Ordenes
Route::post('/orders', [OrdenesController::class, 'createOrder']);

// Ruta de prueba
Route::get('/test', function () {
    return 'Test route is working!';
});
