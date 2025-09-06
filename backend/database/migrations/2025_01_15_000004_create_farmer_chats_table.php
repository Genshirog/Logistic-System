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
        Schema::create('farmer_chats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farmer1_id')->constrained('farmers')->onDelete('cascade');
            $table->foreignId('farmer2_id')->constrained('farmers')->onDelete('cascade');
            $table->foreignId('match_id')->constrained('farmer_matches')->onDelete('cascade');
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_message_at')->nullable();
            $table->timestamps();
            
            // Ensure unique chat rooms
            $table->unique(['farmer1_id', 'farmer2_id']);
            $table->check('farmer1_id != farmer2_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmer_chats');
    }
};
