<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Farmer extends Model
{
    public function storageTransactions() {
        return $this->hasMany(StorageTransaction::class);
    }
    public function inventories() {
        return $this->hasMany(Inventory::class);
    }
}

