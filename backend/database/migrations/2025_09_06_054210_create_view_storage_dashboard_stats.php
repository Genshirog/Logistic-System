<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    DB::statement("
        CREATE VIEW storageStats AS
        SELECT
            SUM(s.capacity) AS totalCapacity,
            COALESCE(SUM(i.quantity), 0) AS currentOccupancy,
            COUNT(s.id) AS activeUnits,
            (
                SELECT COUNT(*) FROM storage_transactions WHERE status = 'pending'
            ) AS pendingOffers,
            ROUND(AVG(t.currentTemp), 2) AS avgTemperature,
            (
                SELECT COUNT(*) FROM temps WHERE JSON_LENGTH(alerts) > 0 AND alerts != '[\"None\"]'
            ) AS alertsCount
        FROM storages s
        LEFT JOIN inventories i ON s.id = i.storage_id
        LEFT JOIN temps t ON s.id = t.storage_id;
    ");
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW storageStats");
    }
};
