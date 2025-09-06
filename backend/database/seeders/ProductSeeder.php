<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('products')->insert([
            [
                'name' => 'Wheat Flour',
                'pricePerKg' => 2.50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rice',
                'pricePerKg' => 1.80,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sugar',
                'pricePerKg' => 3.20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Salt',
                'pricePerKg' => 0.90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cornmeal',
                'pricePerKg' => 2.10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
