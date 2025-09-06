<?php

namespace Database\Seeders;

use App\Models\StorageTransaction;
use App\Models\Vehicle;
use App\Models\Buyer;
use App\Models\Farmer;
use App\Models\Product;
use App\Models\Temperature;
use App\Models\Driver;
use App\Models\Delivery;
use App\Models\Inventory;
use App\Models\Storage;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
{
    $this->call([
        ProductSeeder::class,
        FarmerSeeder::class,
        StorageSeeder::class,
        BuyerSeeder::class,
        DriverSeeder::class,
        VehicleSeeder::class,
        StorageTransactionSeeder::class,
        TemperatureSeeder::class,
        InventorySeeder::class,
        DeliverySeeder::class,
        FarmerMatchingSeeder::class,
        // Add more seeders here as needed
    ]);
}
}
