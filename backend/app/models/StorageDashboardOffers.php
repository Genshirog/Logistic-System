<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class storageDashboardOffers extends Model
{
    protected $table = 'offersDashboard'; // Name of your SQL view
    public $incrementing = false;      // Views usually don't have auto-increment id
    public $timestamps = false;
}
