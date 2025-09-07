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
        DB::statement("DROP VIEW IF EXISTS delivery_overview");
        DB::statement("CREATE VIEW delivery_overview AS
SELECT
    d.id AS id,
    b.name AS buyer,
    p.name AS product,
    d.quantity,
    d.unit,
    d.status AS status,
    d.scheduledDate,
    d.scheduledTime,
    d.address AS address,
    dr.name AS driver,
    v.identifier AS vehicle,
    d.estimatedDuration,
    d.priority
FROM deliveries d
LEFT JOIN buyers b ON b.id = d.buyer_id
LEFT JOIN products p ON p.id = d.product_id
LEFT JOIN drivers dr ON dr.id = d.driver_id
LEFT JOIN vehicles v ON v.id = d.vehicle_id;

");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS delivery_overview");
    }
};
