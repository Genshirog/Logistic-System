<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    public function deliveries() {
        return $this->hasMany(Delivery::class);
    }
}
