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
    Schema::create('inventories', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained('products');
        $table->foreignId('farmer_id')->constrained('farmers');
        $table->foreignId('storage_id')->constrained('storages');
        $table->integer('quantity');
        $table->date('dateReceived');
        $table->date('expiryDate');
        $table->string('condition');
        $table->decimal('totalValue', 10, 2);
        $table->string('status');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory');
    }
};
