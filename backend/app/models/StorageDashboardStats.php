<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageDashboardStats extends Model
{
    protected $table = 'storageStats'; // Name of your SQL view
    public $incrementing = false;      // Views usually don't have auto-increment id
    public $timestamps = false;        // Views don't have timestamps
}
