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
        Schema::create('farmer_swipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('swiper_id')->constrained('farmers')->onDelete('cascade');
            $table->foreignId('swiped_id')->constrained('farmers')->onDelete('cascade');
            $table->enum('action', ['like', 'pass']); // like or pass (swipe right or left)
            $table->timestamp('swiped_at');
            $table->timestamps();
            
            // Ensure unique swipes and prevent self-swiping
            $table->unique(['swiper_id', 'swiped_id']);
            $table->check('swiper_id != swiped_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmer_swipes');
    }
};
