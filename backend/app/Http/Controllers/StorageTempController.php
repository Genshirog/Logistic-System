<?php

namespace App\Http\Controllers;

use App\Models\StorageTempOverview;
use Illuminate\Http\Request;

class StorageTempController extends Controller
{
    public function tempUnits(){
        $temp = StorageTempOverview::all();
        return response()->json($temp);
    }
}
