<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class StorageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('storages')->insert([
            [
                'name' => 'Central Warehouse',
                'capacity' => 10000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'North Storage',
                'capacity' => 7500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'East Depot',
                'capacity' => 5000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'South Facility',
                'capacity' => 8500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'West Storage',
                'capacity' => 6000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
