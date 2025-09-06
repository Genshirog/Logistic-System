<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    public function buyer() {
        return $this->belongsTo(Buyer::class);
    }
    public function product() {
        return $this->belongsTo(Product::class);
    }
    public function storage() {
        return $this->belongsTo(Storage::class);
    }
    public function driver() {
        return $this->belongsTo(Driver::class);
    }
    public function vehicle() {
        return $this->belongsTo(Vehicle::class);
    }
}

