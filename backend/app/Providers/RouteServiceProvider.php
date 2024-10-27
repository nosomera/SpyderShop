<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
class RouteServiceProvider extends ServiceProvider
{
public function boot()
{
// Cargar las rutas directamente
Route::prefix('api')
->middleware('api')
->namespace('App\Http\Controllers')
->group(base_path('routes/api.php'));
Route::middleware('web')
->namespace('App\Http\Controllers')
->group(base_path('routes/web.php'));
}
}