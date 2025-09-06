<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class StorageTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('storage_transactions')->insert([
            [
                'farmer_id' => 1,
                'product_id' => 1,
                'storage_id' => 1,
                'quantity' => 500,
                'pricePerKg' => 2.50,
                'totalValue' => 1250.00,
                'datePurchased' => '2025-08-01',
                'status' => 'completed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'farmer_id' => 2,
                'product_id' => 2,
                'storage_id' => 2,
                'quantity' => 300,
                'pricePerKg' => 1.80,
                'totalValue' => 540.00,
                'datePurchased' => '2025-08-05',
                'status' => 'completed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'farmer_id' => 3,
                'product_id' => 3,
                'storage_id' => 3,
                'quantity' => 200,
                'pricePerKg' => 3.20,
                'totalValue' => 640.00,
                'datePurchased' => '2025-08-10',
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'farmer_id' => 4,
                'product_id' => 4,
                'storage_id' => 4,
                'quantity' => 400,
                'pricePerKg' => 0.90,
                'totalValue' => 360.00,
                'datePurchased' => '2025-08-12',
                'status' => 'completed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'farmer_id' => 5,
                'product_id' => 5,
                'storage_id' => 5,
                'quantity' => 350,
                'pricePerKg' => 2.10,
                'totalValue' => 735.00,
                'datePurchased' => '2025-08-15',
                'status' => 'cancelled',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

    }
}
