<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    public function inventories() {
        return $this->hasMany(Inventory::class);
    }
    public function storageTransactions() {
        return $this->hasMany(StorageTransaction::class);
    }
    public function temp() {
        return $this->hasOne(Temperature::class);
    }
}

