<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class BuyerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('buyers')->insert([
            [
                'name' => 'Green Grocers',
                'address' => '101 Market St, Cityville',
                'type' => 'Retail',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'FreshMart',
                'address' => '202 Fresh Ave, Townsville',
                'type' => 'MSME',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'BulkBuyers Inc.',
                'address' => '303 Bulk Rd, Metrocity',
                'type' => 'Wholesale',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Healthy Eats',
                'address' => '404 Health Blvd, Suburbia',
                'type' => 'MSME',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Corner Store',
                'address' => '505 Corner Ln, Villagetown',
                'type' => 'Retail',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
