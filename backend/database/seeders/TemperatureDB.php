<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TemperatureDB extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('temps')->insert([
            [
                'storage_id' => 1,
                'product_id' => 1,
                'currentTemp' => 18.5,
                'targetTemp' => 20.0,
                'targetRange' => '18-22',
                'status' => 'stable',
                'powerStatus' => 'on',
                'humidity' => 55.0,
                'targetHumidity' => 60.0,
                'lastMaintenance' => '2025-08-01',
                'trend' => 'rising',
                'alerts' => json_encode(['none']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'storage_id' => 2,
                'product_id' => 2,
                'currentTemp' => 15.2,
                'targetTemp' => 16.0,
                'targetRange' => '15-17',
                'status' => 'warning',
                'powerStatus' => 'on',
                'humidity' => 62.0,
                'targetHumidity' => 60.0,
                'lastMaintenance' => '2025-07-15',
                'trend' => 'falling',
                'alerts' => json_encode(['temp_low']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'storage_id' => 3,
                'product_id' => 3,
                'currentTemp' => 21.0,
                'targetTemp' => 20.0,
                'targetRange' => '19-21',
                'status' => 'stable',
                'powerStatus' => 'off',
                'humidity' => 58.0,
                'targetHumidity' => 60.0,
                'lastMaintenance' => null,
                'trend' => 'stable',
                'alerts' => json_encode(['power_off']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'storage_id' => 4,
                'product_id' => null,
                'currentTemp' => 17.8,
                'targetTemp' => 18.0,
                'targetRange' => '17-19',
                'status' => 'stable',
                'powerStatus' => 'on',
                'humidity' => 59.0,
                'targetHumidity' => 60.0,
                'lastMaintenance' => '2025-06-20',
                'trend' => 'rising',
                'alerts' => json_encode(['none']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'storage_id' => 5,
                'product_id' => 5,
                'currentTemp' => 19.5,
                'targetTemp' => 20.0,
                'targetRange' => '19-21',
                'status' => 'critical',
                'powerStatus' => 'on',
                'humidity' => 65.0,
                'targetHumidity' => 60.0,
                'lastMaintenance' => '2025-08-10',
                'trend' => 'rising',
                'alerts' => json_encode(['humidity_high', 'temp_high']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
