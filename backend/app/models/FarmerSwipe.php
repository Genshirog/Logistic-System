<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FarmerSwipe extends Model
{
    protected $fillable = [
        'swiper_id',
        'swiped_id',
        'action',
        'swiped_at'
    ];

    protected $casts = [
        'swiped_at' => 'datetime',
    ];

    public function swiper(): BelongsTo
    {
        return $this->belongsTo(Farmer::class, 'swiper_id');
    }

    public function swiped(): BelongsTo
    {
        return $this->belongsTo(Farmer::class, 'swiped_id');
    }
}
