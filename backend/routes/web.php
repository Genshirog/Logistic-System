<?php

use App\Http\Controllers\StorageDashboardController;
use App\Http\Controllers\StorageDeliveryController;
use App\Http\Controllers\StorageInventoryController;
use App\Http\Controllers\StorageTempController;
use App\Http\Controllers\StorageNotificationController;
use Illuminate\Support\Facades\Route;

Route::get('/storage/dashboard/stats',[StorageDashboardController::class, 'stats']);
Route::get('/storage/dashboard/units',[StorageDashboardController::class,'units']);
Route::get('/storage/dashboard/offers',[StorageDashboardController::class,'offers']);
Route::get('/storage/dashboard/deliveries',[StorageDashboardController::class,'deliveries']);
Route::get('/storage/delivery/deliveries',[StorageDeliveryController::class,'deliveries']);
Route::get('/storage/inventory/inventories',[StorageInventoryController::class,'inventories']);
Route::get('/storage/temperature/units',[StorageTempController::class,'tempUnits']);
Route::get('/storage/notification/notifications',[StorageNotificationController::class,'notifications']);
