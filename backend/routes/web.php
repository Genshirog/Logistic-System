<?php

use App\Http\Controllers\StorageDashboardController;
use App\Http\Controllers\StorageDeliveryController;
use App\Http\Controllers\StorageInventoryController;
use App\Http\Controllers\StorageTempController;
use App\Http\Controllers\StorageNotificationController;
use App\Http\Controllers\FarmerMatchingController;
use App\Http\Controllers\FarmerChatController;
use Illuminate\Support\Facades\Route;

// Storage routes
Route::get('/storage/dashboard/stats',[StorageDashboardController::class, 'stats']);
Route::get('/storage/dashboard/units',[StorageDashboardController::class,'units']);
Route::get('/storage/dashboard/offers',[StorageDashboardController::class,'offers']);
Route::get('/storage/dashboard/deliveries',[StorageDashboardController::class,'deliveries']);
Route::get('/storage/delivery/deliveries',[StorageDeliveryController::class,'deliveries']);
Route::get('/storage/inventory/inventories',[StorageInventoryController::class,'inventories']);
Route::get('/storage/temperature/units',[StorageTempController::class,'tempUnits']);
Route::get('/storage/notification/notifications',[StorageNotificationController::class,'notifications']);

// Farmer matching routes
Route::prefix('api/farmer')->group(function () {
    // Marketplace routes
    Route::get('/{farmerId}/potential-matches', [FarmerMatchingController::class, 'getPotentialMatches']);
    Route::post('/send-connection-request', [FarmerMatchingController::class, 'sendConnectionRequest']);
    Route::post('/respond-connection-request', [FarmerMatchingController::class, 'respondToConnectionRequest']);
    Route::get('/{farmerId}/pending-requests', [FarmerMatchingController::class, 'getPendingRequests']);
    Route::get('/{farmerId}/matches', [FarmerMatchingController::class, 'getMatches']);
    
    // Chat routes
    Route::get('/{farmerId}/chats', [FarmerChatController::class, 'getChats']);
    Route::get('/chat/{chatId}/messages/{farmerId}', [FarmerChatController::class, 'getMessages']);
    Route::post('/chat/send-message', [FarmerChatController::class, 'sendMessage']);
    Route::post('/chat/send-storage-proposal', [FarmerChatController::class, 'sendStorageProposal']);
});
