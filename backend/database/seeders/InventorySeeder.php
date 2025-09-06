<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('inventories')->insert([
            [
                'product_id' => 1,
                'farmer_id' => 1,
                'storage_id' => 1,
                'quantity' => 500,
                'dateReceived' => '2025-08-01',
                'expiryDate' => '2025-12-01',
                'condition' => 'fresh',
                'totalValue' => 1250.00,
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'farmer_id' => 2,
                'storage_id' => 2,
                'quantity' => 300,
                'dateReceived' => '2025-08-05',
                'expiryDate' => '2025-11-15',
                'condition' => 'good',
                'totalValue' => 540.00,
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 3,
                'farmer_id' => 3,
                'storage_id' => 3,
                'quantity' => 200,
                'dateReceived' => '2025-08-10',
                'expiryDate' => '2025-10-30',
                'condition' => 'fresh',
                'totalValue' => 640.00,
                'status' => 'reserved',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 4,
                'farmer_id' => 4,
                'storage_id' => 4,
                'quantity' => 400,
                'dateReceived' => '2025-08-12',
                'expiryDate' => '2025-12-20',
                'condition' => 'excellent',
                'totalValue' => 360.00,
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 5,
                'farmer_id' => 5,
                'storage_id' => 5,
                'quantity' => 350,
                'dateReceived' => '2025-08-15',
                'expiryDate' => '2025-11-25',
                'condition' => 'good',
                'totalValue' => 735.00,
                'status' => 'expired',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
