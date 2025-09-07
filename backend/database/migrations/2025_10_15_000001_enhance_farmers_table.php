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
        Schema::table('farmers', function (Blueprint $table) {
            $table->string('email')->unique()->after('name');
            $table->string('phone')->nullable()->after('email');
            $table->text('bio')->nullable()->after('phone');
            $table->string('location')->nullable()->after('bio');
            $table->decimal('latitude', 10, 8)->nullable()->after('location');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            $table->string('profile_image')->nullable()->after('longitude');
            $table->json('produce_types')->nullable()->after('profile_image'); // Array of produce types
            $table->integer('storage_capacity_needed')->nullable()->after('produce_types'); // in cubic meters
            $table->decimal('max_temperature', 5, 2)->nullable()->after('storage_capacity_needed');
            $table->decimal('min_temperature', 5, 2)->nullable()->after('max_temperature');
            $table->boolean('is_looking_for_storage')->default(false)->after('min_temperature');
            $table->boolean('has_excess_storage')->default(false)->after('is_looking_for_storage');
            $table->decimal('cost_per_cubic_meter', 8, 2)->nullable()->after('has_excess_storage');
            $table->boolean('is_active')->default(true)->after('cost_per_cubic_meter');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('farmers', function (Blueprint $table) {
            $table->dropColumn([
                'email', 'phone', 'bio', 'location', 'latitude', 'longitude',
                'profile_image', 'produce_types', 'storage_capacity_needed',
                'max_temperature', 'min_temperature', 'is_looking_for_storage',
                'has_excess_storage', 'cost_per_cubic_meter', 'is_active'
            ]);
        });
    }
};
