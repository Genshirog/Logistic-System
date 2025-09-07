<?php

namespace App\Http\Controllers;

use App\Models\StorageDeliveryOverview;
use Illuminate\Http\Request;

class StorageDeliveryController extends Controller
{
    public function deliveries(){
        $delivery = StorageDeliveryOverview::all();
        return response()->json($delivery);
    }
}
