<?php

namespace App\Http\Controllers;
use Carbon\Carbon;

use MongoDB\Client;
use Illuminate\Http\Request;

class OrdenesController extends Controller
{
    protected $collection;

    public function __construct()
    {
        $client = new Client(env('DB_CONNECTION_URL')); 
        $this->collection = $client->spyderShop->ordenes;
    }

    public function index()
 {
 $ordenes = $this->collection->find()->toArray();
 return response()->json($ordenes);
 }

    public function createOrder(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|string',
            'name' => 'required|string',
            'address' => 'required|string',
            'cart' => 'required|array',
            'total' => 'required|numeric',
        ]);

        $order = [
            'user_id' => $validated['user_id'],
            'name' => $validated['name'],
            'address' => $validated['address'],
            'cart' => $validated['cart'],
            'total' => $validated['total'],
            'status' => 'Aprobada',
            'created_at' => Carbon::now('America/Bogota')->toDateTimeString(),

        ];

        try {
            $this->collection->insertOne($order);
            return response()->json(['message' => 'Compra Aprobada', 'order' => $order], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo guardar la orden', 'message' => $e->getMessage()], 500);
        }
    }

    public function showOrden ($id){
        try {
           
            $ordenes = $this->collection->find(['user_id' => $id])->toArray();
            
       
            if (empty($ordenes)) {
                return response()->json(['message' => 'No se encontraron órdenes para este usuario.'], 404);
            }
    
            // Devuelve las órdenes encontradas
            return response()->json($ordenes);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las órdenes', 'message' => $e->getMessage()], 500);
        }

    }
    
}