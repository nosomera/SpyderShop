<?php

namespace App\Http\Controllers;
use MongoDB\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\ModelUser;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    protected $collection;


    public function __construct()
    {
        $client = new Client(env('DB_CONNECTION_URL'));
        $this->collection = $client->spyderShop->model_users; // Nombre de la colección en MongoDB
    }

  public function index()
 {
 $users = $this->collection->find()->toArray();
 return response()->json($users);
 }
 public function login(Request $request)
 {
     // Validación de las credenciales
     $validator = Validator::make($request->all(), [
         'email' => 'required|string|email',
         'password' => 'required|string',
     ]);
     
     if ($validator->fails()) {
         return response()->json($validator->errors(), 422);
     }
     
     // Buscar al usuario en la base de datos
     $user = $this->collection->findOne(['email' => $request->email]);
 
     if (!$user || !Hash::check($request->password, $user['password'])) {
         return response()->json(['message' => 'Credenciales incorrectas'], 401);
     }
 
     // Generar un token aleatorio
     $token = Str::random(60); // Se puede ajustar la longitud del token según sea necesario
 
     // Almacenar el token en MongoDB
     $this->collection->updateOne(
         ['_id' => $user['_id']],
         ['$set' => ['api_token' => $token]]
     );
 
     // Devolver el token al cliente
     return response()->json(['message' => 'Inicio de sesión exitoso', 'token' => $token,'role' => $user['role']], 200);
 }

 public function validateToken(Request $request)
{
    $token = $request->bearerToken();

    if (!$token) {
        return response()->json(['message' => 'Token no proporcionado'], 400);
    }

    // Buscar el usuario con este token
    $user = $this->collection->findOne(['api_token' => $token]);

    if (!$user) {
        return response()->json(['message' => 'Token inválido'], 401);
    }

    // El token es válido
    return response()->json(['message' => 'Token válido', 'user' => $user], 200);
}

public function logout(Request $request)
{
    // Obtener el token del encabezado Authorization
    $token = $request->bearerToken();

    if (!$token) {
        return response()->json(['message' => 'Token no proporcionado'], 400);
    }

    // Buscar el usuario con este token
    $user = $this->collection->findOne(['api_token' => $token]);

    if (!$user) {
        return response()->json(['message' => 'Token inválido'], 401);
    }

    // Invalidar el token
    $this->collection->updateOne(
        ['_id' => $user['_id']],
        ['$set' => ['api_token' => null]]
    );

    return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
}

 
    public function register(Request $request)
    {
        
        // Validación de datos, con validación personalizada para el email único
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:email',  // Validación de unicidad
            'password' => 'required|string|min:4|confirmed',
            'role' => 'required|string|in:admin,viewer',
        ]);
    
        // Crear el usuario en la base de datos MongoDB
       try {
    $user = ModelUser::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => Hash::make($request->password),
        'role' => $validatedData['role'],
    ]);

    return response()->json([
        'message' => 'Usuario registrado exitosamente',
        'user' => $user,
    ], 201);
} catch (\Exception $e) {
    return response()->json([
        'error' => 'No se pudo guardar el usuario',
        'message' => $e->getMessage(),
    ], 500);
}

    }
    

}
