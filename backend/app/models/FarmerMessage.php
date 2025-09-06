<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FarmerMessage extends Model
{
    protected $fillable = [
        'chat_id',
        'sender_id',
        'message',
        'message_type',
        'metadata',
        'is_read',
        'read_at'
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_read' => 'boolean',
        'read_at' => 'datetime',
    ];

    public function chat(): BelongsTo
    {
        return $this->belongsTo(FarmerChat::class, 'chat_id');
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(Farmer::class, 'sender_id');
    }
}
