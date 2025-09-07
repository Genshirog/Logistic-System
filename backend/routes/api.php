<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StorageTempController;

// Add your API route here
Route::post('/storage/units/{id}/power', [StorageTempController::class, 'powerStatus']);

// You can add more API routes below as needed
