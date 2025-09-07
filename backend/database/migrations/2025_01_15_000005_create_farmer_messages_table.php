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
        Schema::create('farmer_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained('farmer_chats')->onDelete('cascade');
            $table->foreignId('sender_id')->constrained('farmers')->onDelete('cascade');
            $table->text('message');
            $table->enum('message_type', ['text', 'storage_proposal', 'cost_share'])->default('text');
            $table->json('metadata')->nullable(); // For storage proposals, cost sharing details, etc.
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmer_messages');
    }
};
