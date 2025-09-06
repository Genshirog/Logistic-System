<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Farmer extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'bio', 'location', 'latitude', 'longitude',
        'profile_image', 'produce_types', 'storage_capacity_needed',
        'max_temperature', 'min_temperature', 'is_looking_for_storage',
        'has_excess_storage', 'cost_per_cubic_meter', 'is_active'
    ];

    protected $casts = [
        'produce_types' => 'array',
        'is_looking_for_storage' => 'boolean',
        'has_excess_storage' => 'boolean',
        'is_active' => 'boolean',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'max_temperature' => 'decimal:2',
        'min_temperature' => 'decimal:2',
        'cost_per_cubic_meter' => 'decimal:2',
    ];

    // Existing relationships
    public function storageTransactions(): HasMany
    {
        return $this->hasMany(StorageTransaction::class);
    }

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }

    // New matching relationships
    public function sentSwipes(): HasMany
    {
        return $this->hasMany(FarmerSwipe::class, 'swiper_id');
    }

    public function receivedSwipes(): HasMany
    {
        return $this->hasMany(FarmerSwipe::class, 'swiped_id');
    }

    public function matchesAsFarmer1(): HasMany
    {
        return $this->hasMany(FarmerMatch::class, 'farmer1_id');
    }

    public function matchesAsFarmer2(): HasMany
    {
        return $this->hasMany(FarmerMatch::class, 'farmer2_id');
    }

    public function chatsAsFarmer1(): HasMany
    {
        return $this->hasMany(FarmerChat::class, 'farmer1_id');
    }

    public function chatsAsFarmer2(): HasMany
    {
        return $this->hasMany(FarmerChat::class, 'farmer2_id');
    }

    public function sentMessages(): HasMany
    {
        return $this->hasMany(FarmerMessage::class, 'sender_id');
    }

    // Helper methods
    public function getAllMatches()
    {
        return $this->matchesAsFarmer1->merge($this->matchesAsFarmer2);
    }

    public function getAllChats()
    {
        return $this->chatsAsFarmer1->merge($this->chatsAsFarmer2);
    }

    public function getSwipedFarmerIds()
    {
        return $this->sentSwipes()->pluck('swiped_id')->toArray();
    }

    public function getSwipedByFarmerIds()
    {
        return $this->receivedSwipes()->pluck('swiper_id')->toArray();
    }

    // Compatibility scoring
    public function calculateCompatibilityWith(Farmer $otherFarmer): float
    {
        $score = 0;
        $maxScore = 100;

        // Temperature compatibility (30 points)
        if ($this->max_temperature && $otherFarmer->max_temperature) {
            $tempDiff = abs($this->max_temperature - $otherFarmer->max_temperature);
            $tempScore = max(0, 30 - ($tempDiff * 3)); // 3 points per degree difference
            $score += $tempScore;
        }

        // Location proximity (25 points)
        if ($this->latitude && $this->longitude && $otherFarmer->latitude && $otherFarmer->longitude) {
            $distance = $this->calculateDistance($otherFarmer->latitude, $otherFarmer->longitude);
            $locationScore = max(0, 25 - ($distance / 10)); // 1 point per 10km
            $score += $locationScore;
        }

        // Storage needs compatibility (25 points)
        if ($this->is_looking_for_storage && $otherFarmer->has_excess_storage) {
            $score += 25;
        } elseif ($this->has_excess_storage && $otherFarmer->is_looking_for_storage) {
            $score += 25;
        }

        // Produce type compatibility (20 points)
        if ($this->produce_types && $otherFarmer->produce_types) {
            $commonTypes = array_intersect($this->produce_types, $otherFarmer->produce_types);
            $produceScore = (count($commonTypes) / max(count($this->produce_types), count($otherFarmer->produce_types))) * 20;
            $score += $produceScore;
        }

        return min($maxScore, $score);
    }

    private function calculateDistance($lat2, $lon2): float
    {
        $earthRadius = 6371; // Earth's radius in kilometers

        $lat1 = $this->latitude;
        $lon1 = $this->longitude;

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        return $earthRadius * $c;
    }
}

