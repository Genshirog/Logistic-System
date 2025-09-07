<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FarmerMatch extends Model
{
    protected $fillable = [
        'farmer1_id',
        'farmer2_id',
        'status',
        'compatibility_score',
        'match_reasons',
        'matched_at',
        'responded_at'
    ];

    protected $casts = [
        'match_reasons' => 'array',
        'matched_at' => 'datetime',
        'responded_at' => 'datetime',
        'compatibility_score' => 'decimal:2',
    ];

    public function farmer1(): BelongsTo
    {
        return $this->belongsTo(Farmer::class, 'farmer1_id');
    }

    public function farmer2(): BelongsTo
    {
        return $this->belongsTo(Farmer::class, 'farmer2_id');
    }

    public function getOtherFarmer(Farmer $farmer): Farmer
    {
        return $this->farmer1_id === $farmer->id ? $this->farmer2 : $this->farmer1;
    }
}
