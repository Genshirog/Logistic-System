<?php

namespace App\Http\Controllers;

use App\Models\StorageDashboardDeliveries;
use App\Models\storageDashboardOffers;
use App\Models\StorageDashboardUnits;
use App\Models\StorageDashboardStats;
use Illuminate\Http\Request;

class StorageDashboardController extends Controller
{
    public function stats(){
        $stats = StorageDashboardStats::first();
        return response()->json($stats);
    }


    public function units()
    {
        // Read from the SQL view
        $units = StorageDashboardUnits::all();

        // Return as JSON
        return response()->json($units);
    }


    public function offers(){
        $offers = StorageDashboardOffers::all();
        return response()->json($offers);
    }

    public function deliveries(){
        $deliveries = StorageDashboardDeliveries::all();
        return response()->json($deliveries);
    }
}
