<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    DB::statement("DROP VIEW IF EXISTS temp_units_overview");
    DB::statement("
        CREATE VIEW temp_units_overview AS
        SELECT
            s.name AS id,
            s.name AS name,
            p.name AS product,
            t.currentTemp,
            t.targetTemp,
            t.targetRange,
            t.status,
            t.powerStatus,
            t.humidity,
            t.targetHumidity,
            t.lastMaintenance,
            t.trend,
            t.alerts
        FROM temps t
        LEFT JOIN storages s ON s.id = t.storage_id
        LEFT JOIN products p ON p.id = t.product_id;
    ");
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS temp_units_overview");
    }
};
