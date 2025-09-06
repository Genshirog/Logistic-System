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
        DB::statement("CREATE VIEW offersDashboard AS
SELECT
    st.id,
    f.name AS farmer,
    p.name AS product,
    st.quantity,
    'kg' AS unit,
    st.totalValue AS price,
    TIMESTAMPDIFF(HOUR, st.created_at, NOW()) AS submitted_hours_ago
FROM storage_transactions st
JOIN farmers f ON st.farmer_id = f.id
JOIN products p ON st.product_id = p.id
WHERE st.status = 'pending';
");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW offersDashboard");
    }
};
