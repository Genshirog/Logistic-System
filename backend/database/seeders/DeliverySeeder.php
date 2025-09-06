<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class DeliverySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('deliveries')->insert([
            // Completed Deliveries
            [
                'buyer_id' => 1,
                'product_id' => 2,
                'storage_id' => 1,
                'quantity' => 100,
                'unit' => 'kg',
                'status' => 'completed',
                'scheduledDate' => '2025-09-01',
                'scheduledTime' => '09:00 AM',
                'address' => '123 Main St',
                'driver_id' => 1,
                'vehicle_id' => 1,
                'estimatedDuration' => '2h',
                'priority' => 'high',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'buyer_id' => 2,
                'product_id' => 3,
                'storage_id' => 2,
                'quantity' => 50,
                'unit' => 'pcs',
                'status' => 'completed',
                'scheduledDate' => '2025-09-02',
                'scheduledTime' => '10:30 AM',
                'address' => '456 Oak Ave',
                'driver_id' => 2,
                'vehicle_id' => 2,
                'estimatedDuration' => '1.5h',
                'priority' => 'medium',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'buyer_id' => 3,
                'product_id' => 1,
                'storage_id' => 3,
                'quantity' => 200,
                'unit' => 'kg',
                'status' => 'completed',
                'scheduledDate' => '2025-09-03',
                'scheduledTime' => '08:15 AM',
                'address' => '789 Pine Rd',
                'driver_id' => 3,
                'vehicle_id' => 3,
                'estimatedDuration' => '3h',
                'priority' => 'low',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // In-Transit Deliveries
            [
                'buyer_id' => 4,
                'product_id' => 2,
                'storage_id' => 1,
                'quantity' => 120,
                'unit' => 'kg',
                'status' => 'in-transit',
                'scheduledDate' => '2025-09-04',
                'scheduledTime' => '11:00 AM',
                'address' => '321 Maple St',
                'driver_id' => 1,
                'vehicle_id' => 2,
                'estimatedDuration' => '2.5h',
                'priority' => 'high',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'buyer_id' => 5,
                'product_id' => 3,
                'storage_id' => 2,
                'quantity' => 80,
                'unit' => 'pcs',
                'status' => 'in-transit',
                'scheduledDate' => '2025-09-05',
                'scheduledTime' => '01:45 PM',
                'address' => '654 Cedar Ave',
                'driver_id' => 2,
                'vehicle_id' => 3,
                'estimatedDuration' => '2h',
                'priority' => 'medium',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'buyer_id' => 1,
                'product_id' => 1,
                'storage_id' => 3,
                'quantity' => 150,
                'unit' => 'kg',
                'status' => 'in-transit',
                'scheduledDate' => '2025-09-06',
                'scheduledTime' => '03:30 PM',
                'address' => '987 Birch Rd',
                'driver_id' => 3,
                'vehicle_id' => 1,
                'estimatedDuration' => '1h',
                'priority' => 'low',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
