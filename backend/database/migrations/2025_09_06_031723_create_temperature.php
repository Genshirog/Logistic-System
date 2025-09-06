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
    Schema::create('temps', function (Blueprint $table) {
        $table->id();
        $table->foreignId('storage_id')->constrained('storages');
        $table->foreignId('product_id')->nullable()->constrained('products');
        $table->float('currentTemp');
        $table->float('targetTemp');
        $table->string('targetRange');
        $table->string('status');
        $table->string('powerStatus');
        $table->float('humidity');
        $table->float('targetHumidity');
        $table->date('lastMaintenance')->nullable();
        $table->string('trend');
        $table->json('alerts')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temperature');
    }
};
