<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FarmerChat extends Model
{
    protected $fillable = [
        'farmer1_id',
        'farmer2_id',
        'match_id',
        'is_active',
        'last_message_at'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'last_message_at' => 'datetime',
    ];

    public function farmer1(): BelongsTo
    {
        return $this->belongsTo(Farmer::class, 'farmer1_id');
    }

    public function farmer2(): BelongsTo
    {
        return $this->belongsTo(Farmer::class, 'farmer2_id');
    }

    public function match(): BelongsTo
    {
        return $this->belongsTo(FarmerMatch::class, 'match_id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(FarmerMessage::class, 'chat_id')->orderBy('created_at', 'asc');
    }

    public function getOtherFarmer(Farmer $farmer): Farmer
    {
        return $this->farmer1_id === $farmer->id ? $this->farmer2 : $this->farmer1;
    }

    public function getUnreadMessageCount(Farmer $farmer): int
    {
        return $this->messages()
            ->where('sender_id', '!=', $farmer->id)
            ->where('is_read', false)
            ->count();
    }
}
