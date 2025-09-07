<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageDeliveryOverview extends Model
{
    protected $table = 'delivery_overview'; // Name of your SQL view
    public $incrementing = false; // If your view doesn't have an auto-increment id
    public $timestamps = false;   // Views don't have timestamps
}
