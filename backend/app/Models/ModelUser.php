<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class ModelUser extends Model
{
    use HasApiTokens;

    protected $connection = 'mongodb'; // Asegúrate de usar la conexión correcta
    protected $collection = 'users'; // Asegúrate de que esto sea correcto

    protected $fillable = [
        'name',
        'address',
        'password',
        'rol',
    ];

    protected $hidden = [
        'password',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
