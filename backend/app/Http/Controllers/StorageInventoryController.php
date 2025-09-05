<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StorageInventoryController extends Controller
{
    public function inventories(){
        return response()->json([
        [
        'id'=> 1,
        'product'=> "Organic Tomatoes",
        'farmer'=> "Juan Dela Cruz",
        'unit'=> "A-1",
        'quantity'=> 500,
        'capacity'=> 1000,
        'pricePerKg'=> 5.0,
        'totalValue'=> 2500,
        'currentTemp'=> 4.1,
        'targetTemp'=> 4.0,
        'targetRange'=> "2-4°C",
        'status'=> "optimal",
        'dateReceived'=> "2024-01-15",
        'expiryDate'=> "2024-01-25",
        'condition'=> "excellent",
        ],
        [
        'id'=> 2,
        'product'=> "Fresh Lettuce",
        'farmer'=> "Maria Santos",
        'unit'=> "A-2",
        'quantity'=> 200,
        'capacity'=> 800,
        'pricePerKg'=> 6.0,
        'totalValue'=> 1200,
        'currentTemp'=> 6.2,
        'targetTemp'=> 3.5,
        'targetRange'=> "1-3°C",
        'status'=> "warning",
        'dateReceived'=> "2024-01-12",
        'expiryDate'=> "2024-01-20",
        'condition'=> "good",
        ],
        [
        'id'=> 3,
        'product'=> "Bell Peppers",
        'farmer'=> "Pedro Garcia",
        'unit'=> "B-1",
        'quantity'=> 300,
        'capacity'=> 1200,
        'pricePerKg'=> 6.0,
        'totalValue'=> 1800,
        'currentTemp'=> 4.5,
        'targetTemp'=> 4.0,
        'targetRange'=> "3-5°C",
        'status'=> "optimal",
        'dateReceived'=> "2024-01-18",
        'expiryDate'=> "2024-01-28",
        'condition'=> "excellent",
        ],
        [
        'id'=> 4,
        'product'=> "Baby Carrots",
        'farmer'=> "Ana Rodriguez",
        'unit'=> "B-2",
        'quantity'=> 150,
        'capacity'=> 900,
        'pricePerKg'=> 4.5,
        'totalValue'=> 675,
        'currentTemp'=> 8.1,
        'targetTemp'=> 2.0,
        'targetRange'=> "0-2°C",
        'status'=> "critical",
        'dateReceived'=> "2024-01-05",
        'expiryDate'=> "2024-01-22",
        'condition'=> "fair",
        ],
        ]);
    }
}
