<?php

namespace App\Http\Controllers;

use App\Models\StorageInventoryInventories;
use Illuminate\Http\Request;

class StorageInventoryController extends Controller
{
    public function inventories(){
        $inventory = StorageInventoryInventories::all();
        return response()->json($inventory);
    }
}
