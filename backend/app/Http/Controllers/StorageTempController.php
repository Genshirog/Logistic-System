<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StorageTempController extends Controller
{
    public function tempUnits(){
        return response()->json([
            [
                'id' => "A-1",
                'name' => "Cold Storage Unit A-1",
                'product' => "Organic Tomatoes",
                'currentTemp' => 4.1,
                'targetTemp' => 4.0,
                'targetRange' => "2-4°C",
                'status' => "optimal",
                'powerStatus' => "on",
                'humidity' => 85,
                'targetHumidity' => 90,
                'lastMaintenance' => "2024-01-10",
                'trend' => "stable",
                'alerts' => [],
            ],
            [
                'id' => "A-2",
                'name' => "Cold Storage Unit A-2",
                'product' => "Fresh Lettuce",
                'currentTemp' => 6.2,
                'targetTemp' => 3.5,
                'targetRange' => "1-3°C",
                'status' => "warning",
                'powerStatus' => "on",
                'humidity' => 78,
                'targetHumidity' => 95,
                'lastMaintenance' => "2024-01-08",
                'trend' => "rising",
                'alerts' => ["Temperature above target", "Humidity below optimal"],
            ],
            [
                'id' => "B-1",
                'name' => "Cold Storage Unit B-1",
                'product' => "Bell Peppers",
                'currentTemp' => 4.5,
                'targetTemp' => 4.0,
                'targetRange' => "3-5°C",
                'status' => "optimal",
                'powerStatus' => "on",
                'humidity' => 88,
                'targetHumidity' => 85,
                'lastMaintenance' => "2024-01-12",
                'trend' => "falling",
                'alerts' => [],
            ],
            [
                'id' => "B-2",
                'name' => "Cold Storage Unit B-2",
                'product' => "Baby Carrots",
                'currentTemp' => 8.1,
                'targetTemp' => 2.0,
                'targetRange' => "0-2°C",
                'status' => "critical",
                'powerStatus' => "on",
                'humidity' => 65,
                'targetHumidity' => 98,
                'lastMaintenance' => "2024-01-05",
                'trend' => "rising",
                'alerts' => ["Critical temperature deviation", "Cooling system malfunction", "Humidity critically low"],
            ],
        ]);
    }
}
