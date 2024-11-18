<?php

namespace App\Models;

use MongoDB\Laravel\Auth\User as Authenticatable;
 //use MongoDB\Laravel\Eloquent\Model as Eloquent;
//use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class ModelUser extends Authenticatable
{
    
    use HasApiTokens, HasFactory, Notifiable;

    protected $connection = 'mongodb';
   protected $collection = 'model_users'; 

    protected $fillable = ['name', 'email', 'password', 'role'];

    protected $hidden = ['password', 'remember_token'];


}
