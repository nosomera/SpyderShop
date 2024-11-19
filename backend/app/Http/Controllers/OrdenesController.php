<?php

namespace App\Http\Controllers;

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
            'created_at' => now(),
        ];

        $this->collection->insertOne($order);

        return response()->json(['message' => 'Compra Aprobada', 'order' => $order], 201);
    }
}
