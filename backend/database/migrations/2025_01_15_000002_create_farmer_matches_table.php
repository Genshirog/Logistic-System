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
        Schema::create('farmer_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farmer1_id')->constrained('farmers')->onDelete('cascade');
            $table->foreignId('farmer2_id')->constrained('farmers')->onDelete('cascade');
            $table->enum('status', ['pending', 'accepted', 'rejected', 'expired'])->default('pending');
            $table->decimal('compatibility_score', 5, 2)->nullable(); // 0-100 compatibility score
            $table->text('match_reasons')->nullable(); // JSON array of reasons for match
            $table->timestamp('matched_at')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
            
            // Ensure unique matches and prevent self-matching
            $table->unique(['farmer1_id', 'farmer2_id']);
            $table->check('farmer1_id != farmer2_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmer_matches');
    }
};
