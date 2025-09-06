<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageTransaction extends Model
{
    public function farmer() {
        return $this->belongsTo(Farmer::class);
    }
    public function product() {
        return $this->belongsTo(Product::class);
    }
    public function storage() {
        return $this->belongsTo(Storage::class);
    }
}

