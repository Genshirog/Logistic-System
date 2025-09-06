<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageDashboardDeliveries extends Model
{
    protected $table = 'deliveriesDashboard'; // Name of your SQL view
    public $incrementing = false;      // Views usually don't have auto-increment id
    public $timestamps = false;
}
