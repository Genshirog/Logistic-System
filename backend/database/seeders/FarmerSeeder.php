<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class FarmerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('farmers')->insert([
            [
                'name' => 'John Carter',
                'contactInfo' => 'john.carter@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maria Lopez',
                'contactInfo' => 'maria.lopez@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Samuel Kim',
                'contactInfo' => 'samuel.kim@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Aisha Bello',
                'contactInfo' => 'aisha.bello@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Liam Smith',
                'contactInfo' => 'liam.smith@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
