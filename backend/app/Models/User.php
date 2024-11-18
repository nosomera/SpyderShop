<?php

namespace App\Models;


use Laravel\Passport\HasApiTokens;


class User extends Authenticatablet
{

    use HasApiTokens, Notifiable;
}
