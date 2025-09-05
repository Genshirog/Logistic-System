<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StorageNotificationController extends Controller
{
    public function notifications(){
        return response()->json([
    [
      'id'=> 1,
      'type'=> "temperature_critical",
      'title'=> "Critical Temperature Alert - Unit B-2",
      'message'=>
        "Temperature in storage unit B-2 has reached 8.1°C, critically above safe range. Immediate action required.",
      'timestamp'=> "2024-01-20T11:15:00Z",
      'priority'=> "high",
      'read'=> false,
      'actionRequired'=> true,
      'storageUnit'=> "B-2",
      'currentTemp'=> 8.1,
      'targetTemp'=> 2.0,
      'product'=> "Baby Carrots",
    ],
    [
      'id'=> 2,
      'type'=> "new_offer",
      'title'=> "New Farmer Offer Received",
      'message'=> "Juan Dela Cruz has submitted a new offer for 400kg of Organic Cabbage.",
      'timestamp'=> "2024-01-20T10:45:00Z",
      'priority'=> "medium",
      'read'=> false,
      'actionRequired'=> true,
      'farmer'=> "Juan Dela Cruz",
      'product'=> "Organic Cabbage",
      'quantity'=> 400,
      'price'=> 2400,
    ],
    [
      'id'=> 3,
      'type'=> "capacity_warning",
      'title'=> "Storage Capacity Warning",
      'message'=> "Storage facility is at 85% capacity. Consider optimizing space or declining new offers.",
      'timestamp'=> "2024-01-20T09:30:00Z",
      'priority'=> "medium",
      'read'=> false,
      'actionRequired'=> false,
      'currentCapacity'=> 85,
      'maxCapacity'=> 100,
    ],
    [
      'id'=> 4,
      'type'=> "delivery_completed",
      'title'=> "Delivery Completed - Metro Market",
      'message'=> "200kg of Organic Tomatoes successfully delivered to Metro Market.",
      'timestamp'=> "2024-01-20T08:20:00Z",
      'priority'=> "low",
      'read'=> true,
      'actionRequired'=> false,
      'buyer'=> "Metro Market",
      'product'=> "Organic Tomatoes",
      'quantity'=> 200,
    ],
    [
      'id'=> 5,
      'type'=> "maintenance_due",
      'title'=> "Maintenance Due - Cooling System A",
      'message'=> "Cooling system in unit A-2 is due for scheduled maintenance.",
      'timestamp'=> "2024-01-19T16:00:00Z",
      'priority'=> "medium",
      'read'=> true,
      'actionRequired'=> true,
      'system'=> "Cooling System A",
      'unit'=> "A-2",
      'lastMaintenance'=> "2024-01-05",
    ],
    [
      'id'=> 6,
      'type'=> "temperature_normalized",
      'title'=> "Temperature Normalized - Unit A-1",
      'message'=> "Temperature in storage unit A-1 has returned to optimal range (4.1°C).",
      'timestamp'=> "2024-01-19T14:45:00Z",
      'priority'=> "low",
      'read'=> true,
      'actionRequired'=> false,
      'storageUnit'=> "A-1",
      'currentTemp'=> 4.1,
      'product'=> "Organic Tomatoes",
    ],
        ]);
    }
}
