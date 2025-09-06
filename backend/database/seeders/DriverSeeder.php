<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('drivers')->insert([
            [
                'name' => 'Alex Turner',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Brenda Lee',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Carlos Mendoza',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Diana Cruz',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ethan Smith',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
