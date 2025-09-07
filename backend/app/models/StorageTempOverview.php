<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageTempOverview extends Model
{
    protected $table = 'storageUnitOverview'; // Name of your SQL view
    public $incrementing = false; // If your view doesn't have an auto-increment id
    public $timestamps = false; 
}
