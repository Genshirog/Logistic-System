<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StorageDeliveryController extends Controller
{
    public function deliveries(){
        return response()->json([
            [
            'id'=> 1,
            'buyer'=> "Metro Market",
            'product'=> "Organic Tomatoes",
            'quantity'=> 200,
            'unit'=> "kg",
            'status'=> "scheduled",
            'scheduledDate'=> "2024-01-20",
            'scheduledTime'=> "10=>30 AM",
            'address'=> "123 Market St, Manila",
            'driver'=> "Carlos Santos",
            'vehicle'=> "Truck-001",
            'estimatedDuration'=> "2 hours",
            'priority'=> "high",
            ],
            [
            'id'=> 2,
            'buyer'=> "Fresh Mart",
            'product'=> "Fresh Lettuce",
            'quantity'=> 150,
            'unit'=> "kg",
            'status'=> "in-transit",
            'scheduledDate'=> "2024-01-19",
            'scheduledTime'=> "2=>00 PM",
            'address'=> "456 Commerce Ave, Quezon City",
            'driver'=> "Maria Garcia",
            'vehicle'=> "Van-003",
            'estimatedDuration'=> "1.5 hours",
            'priority'=> "medium",
            ],
            [
            'id'=> 3,
            'buyer'=> "City Grocers",
            'product'=> "Bell Peppers",
            'quantity'=> 100,
            'unit'=> "kg",
            'status'=> "completed",
            'scheduledDate'=> "2024-01-19",
            'scheduledTime'=> "9=>00 AM",
            'address'=> "789 Main Rd, Makati",
            'driver'=> "Juan Dela Cruz",
            'vehicle'=> "Truck-002",
            'estimatedDuration'=> "1 hour",
            'priority'=> "low",
            ],
            [
            'id'=> 4,
            'buyer'=> "Organic Foods Co.",
            'product'=> "Baby Carrots",
            'quantity'=> 75,
            'unit'=> "kg",
            'status'=> "pending",
            'scheduledDate'=> "2024-01-21",
            'scheduledTime'=> "11=>00 AM",
            'address'=> "321 Green St, Pasig",
            'driver'=> "Ana Rodriguez",
            'vehicle'=> "Van-001",
            'estimatedDuration'=> "2.5 hours",
            'priority'=> "medium",
            ],
        ]);
    }
}
