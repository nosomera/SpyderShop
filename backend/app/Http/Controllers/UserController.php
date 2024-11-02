<?php

namespace App\Http\Controllers;
use MongoDB\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\ModelUser;

class UserController extends Controller
{
    protected $collection;

    public function __construct()
   {
  $client = new Client(env('DB_CONNECTION_URL')); 
  $this->collection = $client->Store->user;
  }

  public function index()
 {
 $users = $this->collection->find()->toArray();
 return response()->json($users);
 }
 public function store(Request $request)
 {
     try {
         
         $validatedData = $request->validate([
             'name' => 'required|string|max:255',
             'address' => 'required|string|max:255',
             'password' => 'required|string|min:3',
             'rol' => 'required|string|min:3',
         ]);
 
         $validatedData['password'] = Hash::make($validatedData['password']);
 
         $result = $this->collection->insertOne($validatedData);
 
         return response()->json([
             'message' => 'User created successfully.',
             'user_id' => $result->getInsertedId(),
         ], 201);
         
     } catch (\Exception $e) {
         return response()->json(['error' => $e->getMessage()], 500);
     }
 }
 
 
public function showUser($id)
{
    try {
        // Convierte el ID a ObjectId
        $objectId = new \MongoDB\BSON\ObjectId($id);

        // Busca el producto en la colección usando el ID
        $user = $this->collection->findOne(['_id' => $objectId]);

        // Verifica si el producto existe
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'Producto no encontrado.'], 404);
        }
    } catch (\MongoDB\Driver\Exception\Exception $e) {
        return response()->json(['message' => 'Error en el servidor.', 'error' => $e->getMessage()], 500);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al procesar la solicitud.', 'error' => $e->getMessage()], 500);
    }
}

public function login(Request $request)
{
    try {
        
        $validatedData = $request->validate([
            'address' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $userData = $this->collection->findOne(['address' => $validatedData['address']]);

        if (!$userData) {
            return response()->json(['message' => 'Credenciales incorrectas.'], 401);
        }

        if (Hash::check($validatedData['password'], $userData['password'])) {
            
            $user = new ModelUser();
            $user->fill((array) $userData);
            $user->setAttribute('id', (string) $userData['_id']);
            $token = $user->createToken('token-name')->plainTextToken;

            return response()->json([
                'message' => 'Inicio de sesión exitoso.',
                'token' => $token,
            ], 200);
        }

        return response()->json(['message' => 'Credenciales incorrectas.'], 401);
    } catch (\Exception $e) {
        // Captura cualquier excepción y devuelve un error
        return response()->json(['error' => 'Error en el servidor: ' . $e->getMessage()], 500);
    }
}


}
