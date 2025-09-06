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
        DB::statement('DROP VIEW IF EXISTS inventory_views');
        DB::statement("
        CREATE VIEW storageUnitOverview AS
SELECT
    i.id,
    p.name AS product,
    f.name AS farmer,
    s.name AS unit,
    i.quantity,
    s.capacity,
    p.pricePerKg, -- <-- from products table
    i.totalValue,
    t.currentTemp,
    t.targetTemp,
    t.targetRange,
    t.status,
    i.dateReceived,
    i.expiryDate,
    i.condition
FROM inventories i
JOIN products p ON i.product_id = p.id
JOIN farmers f ON i.farmer_id = f.id
JOIN storages s ON i.storage_id = s.id
LEFT JOIN temps t ON s.id = t.storage_id
;
");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS inventory_views');
    }
};
