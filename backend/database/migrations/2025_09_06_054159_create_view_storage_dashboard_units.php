<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE VIEW storageDashboard AS
SELECT
    s.id AS storage_id,
    s.name AS unit,
    p.name AS product,
    s.capacity,
    COALESCE(SUM(i.quantity), 0) AS occupied,
    t.currentTemp AS temp,
    t.targetTemp,
    t.status
FROM storages s
LEFT JOIN inventories i ON s.id = i.storage_id
LEFT JOIN products p ON i.product_id = p.id
LEFT JOIN temps t ON s.id = t.storage_id
GROUP BY s.id, s.name, p.name, s.capacity, t.currentTemp, t.targetTemp, t.status;
");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW storageDashboard");
    }
};
