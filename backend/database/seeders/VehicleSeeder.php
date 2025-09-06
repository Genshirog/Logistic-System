<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('vehicles')->insert([
            [
                'identifier' => 'TRUCK-001',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'identifier' => 'VAN-002',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'identifier' => 'PICKUP-003',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'identifier' => 'LORRY-004',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'identifier' => 'MINIVAN-005',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
