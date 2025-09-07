<?php

namespace App\Http\Controllers;

use App\Models\StorageTempOverview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StorageTempController extends Controller
{
    public function tempUnits()
{
    $units = DB::table('temps')
        ->leftJoin('storages', 'storages.id', '=', 'temps.storage_id')
        ->leftJoin('products', 'products.id', '=', 'temps.product_id')
        ->select(
            'temps.id as dbId',
            'storages.name as id',
            'storages.name as name',
            'products.name as product',
            'temps.currentTemp',
            'temps.targetTemp',
            'temps.targetRange',
            'temps.status',
            'temps.powerStatus',
            'temps.humidity',
            'temps.targetHumidity',
            'temps.lastMaintenance',
            'temps.trend',
            'temps.alerts'
        )
        ->get()
        ->map(function ($unit) {
    // Only update temperature if powerStatus is "on"
    if ($unit->powerStatus === 'on') {
        // Simulate a small change: -0.2 to +0.2
        $change = rand(-20, 20) / 100;
        $newTemp = $unit->currentTemp + $change;
        $unit->currentTemp = round(max(0, min(50, $newTemp)), 1);
    }
    // Ensure alerts is always an array
    $unit->alerts = is_array($unit->alerts) ? $unit->alerts : [];
    return $unit;
    });

    return response()->json($units);
}


    public function powerStatus(Request $request, $id)
{
    $request->validate([
        'powerStatus' => 'required|string|in:on,off',
    ]);
    
    $unit = DB::table('temps')->where('id', $id)->first();

    if (!$unit) {
        return response()->json(['error' => 'Unit not found'], 404);
    }

    DB::table('temps')
        ->where('id', $id)
        ->update(['powerStatus' => $request->powerStatus]);

    return response()->json(['success' => true, 'powerStatus' => $request->powerStatus]);
}


}
