<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageDashboardUnits extends Model
{
    protected $table = 'storageDashboard'; // Name of your SQL view
    public $incrementing = false; // If your view doesn't have an auto-increment id
    public $timestamps = false;   // Views don't have timestamps
}
