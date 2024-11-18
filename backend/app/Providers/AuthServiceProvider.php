<?php

namespace App\Providers;



use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Sanctum\Sanctum;
use App\Models\PersonalAccessToken;

class AuthServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerPolicies();

        // Usar el modelo de PersonalAccessToken personalizado
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
