<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('deliveries', function (Blueprint $table) {
        $table->id();
        $table->foreignId('buyer_id')->constrained('buyers');
        $table->foreignId('product_id')->constrained('products');
        $table->foreignId('storage_id')->constrained('storages');
        $table->integer('quantity');
        $table->string('unit');
        $table->string('status');
        $table->date('scheduledDate');
        $table->string('scheduledTime');
        $table->string('address');
        $table->foreignId('driver_id')->constrained('drivers');
        $table->foreignId('vehicle_id')->constrained('vehicles');
        $table->string('estimatedDuration');
        $table->string('priority');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery');
    }
};
