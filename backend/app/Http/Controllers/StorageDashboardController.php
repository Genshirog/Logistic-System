<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StorageDashboardController extends Controller
{
    public function stats(){
        return response()->json([
            'totalCapacity' => 10000,
            'currentOccupancy' => 7500,
            'activeUnits' => 12,
            'pendingOffers' => 8,
            'avgTemperature' => 3.8,
            'alertsCount' => 3,
        ]);
    }

    public function units(){
        return response()->json([
            [
                'id' => 'A-1',
                'product' => 'Organic Tomatoes',
                'capacity' => 1000,
                'occupied' => 200,
                'temp' => 4.1,
                'targetTemp' => 4.0,
                'status' => 'optimal',
            ],
            [
                'id' => 'A-2',
                'product' => 'Fresh Lettuce',
                'capacity' => 800,
                'occupied' => 200,
                'temp' => 6.2,
                'targetTemp' => 3.5,
                'status' => 'warning',
            ],
            [
                'id' => 'B-1',
                'product' => 'Bell Peppers',
                'capacity' => 1200,
                'occupied' => 300,
                'temp' => 4.5,
                'targetTemp' => 4.0,
                'status' => 'optimal',
            ],
            [
                'id' => 'B-2',
                'product' => 'Baby Carrots',
                'capacity' => 900,
                'occupied' => 150,
                'temp' => 8.1,
                'targetTemp' => 2.0,
                'status' => 'critical',
            ],
        ]);
    }

    public function offers(){
        return response()->json([
            [
            'id' => 1,
            'farmer' => "Juan Dela Cruz",
            'product' => "Organic Cabbage",
            'quantity' => 200,
            'unit' => "kg",
            'price' => 2400,
            'submitted' => "2 hours ago",
            ],
            [
            'id' => 2,
            'farmer' => "Maria Santos",
            'product' => "Sweet Corn",
            'quantity' => 600,
            'unit' => "kg",
            'price' => 3000,
            'submitted' => "4 hours ago",
            ],
            [
            'id' => 3,
            'farmer' => "Pedro Garcia",
            'product' => "Green Beans",
            'quantity' => 250,
            'unit' => "kg",
            'price' => 1750,
            'submitted' => "6 hours ago",
            ],
        ]);
    }

    public function deliveries(){
        return response()->json([
            [
                'id'=> 1,
                'buyer'=> "Metro Market",
                'product'=> "Organic Tomatoes",
                'quantity'=> 200, 
                'status'=> "completed", 
                'time'=> "10=>30 AM"
            ],
            [
                'id'=> 2, 
                'buyer'=> "Fresh Mart", 
                'product'=> "Fresh Lettuce", 
                'quantity'=> 150, 
                'status'=> "in-transit", 
                'time'=> "2=>00 PM" 
            ],
            [
                'id'=> 3, 
                'buyer'=> "City Grocers", 
                'product'=> "Bell Peppers", 
                'quantity'=> 100, 
                'status'=> "scheduled", 
                'time'=> "4:30 PM" 
            ],
        ]);
    }
}
