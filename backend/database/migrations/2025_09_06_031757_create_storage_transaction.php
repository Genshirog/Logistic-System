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
    Schema::create('storage_transactions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('farmer_id')->constrained('farmers');
        $table->foreignId('product_id')->constrained('products');
        $table->foreignId('storage_id')->constrained('storages');
        $table->integer('quantity');
        $table->decimal('pricePerKg', 8, 2); // Purchase price from farmer
        $table->decimal('totalValue', 10, 2);
        $table->date('datePurchased');
        $table->string('status')->default('completed'); // e.g., completed, pending, cancelled
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('storage_transaction');
    }
};
