<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    public function product() {
        return $this->belongsTo(Product::class);
    }
    public function farmer() {
        return $this->belongsTo(Farmer::class);
    }
    public function storage() {
        return $this->belongsTo(Storage::class);
    }
}

