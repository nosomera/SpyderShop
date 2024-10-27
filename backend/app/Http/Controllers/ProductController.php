<?php

namespace App\Http\Controllers;
use MongoDB\Client;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    protected $collection;
     public function __construct()
   {
  $client = new Client(env('DB_CONNECTION_URL')); 
  $this->collection = $client->Store->products;
  }
  public function index()
 {
 $products = $this->collection->find()->toArray();
 return response()->json($products);
 }
  public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'count' => 'required|integer',
        'price' => 'required|numeric',
        'description' => 'required|string',
        'image' => 'required|string' // Asegúrate de que sea una cadena
    ]);

    // Obtén la ruta de la imagen del request
    $imagePath = $request->input('image');

    // Crea el array del producto
    $product = [
        'name' => $request->input('name'),
        'count' => (int)$request->input('count'), // Cambia 'grade' por 'count'
        'price' => (float)$request->input('price'),
        'description' => $request->input('description'),
        'image' => $imagePath, // Asegúrate de que esto tenga la ruta correcta
    ];

    // Inserta el producto en la base de datos
    $result = $this->collection->insertOne($product);

    return response()->json($product);
}

  public function upload(Request $request)
{
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación de la imagen
    ]);

    if ($request->file('image')) {
        $path = $request->file('image')->store('images', 'public'); // Guarda la imagen en el directorio public/images
        return response()->json(['path' => $path], 200); // Retorna la ruta de la imagen guardada
    }

    return response()->json(['message' => 'Error al subir la imagen.'], 500);
}

}
