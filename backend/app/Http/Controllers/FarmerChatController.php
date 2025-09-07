<?php

namespace App\Http\Controllers;

use App\Models\FarmerChat;
use App\Models\FarmerMessage;
use App\Models\Farmer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FarmerChatController extends Controller
{
    /**
     * Get all chats for a farmer
     */
    public function getChats($farmerId): JsonResponse
    {
        $farmer = Farmer::findOrFail($farmerId);
        
        $chats = $farmer->getAllChats()
            ->where('is_active', true)
            ->map(function ($chat) use ($farmer) {
                $otherFarmer = $chat->getOtherFarmer($farmer);
                $lastMessage = $chat->messages()->latest()->first();
                
                return [
                    'id' => $chat->id,
                    'other_farmer' => [
                        'id' => $otherFarmer->id,
                        'name' => $otherFarmer->name,
                        'profile_image' => $otherFarmer->profile_image,
                        'location' => $otherFarmer->location,
                    ],
                    'last_message' => $lastMessage ? [
                        'message' => $lastMessage->message,
                        'message_type' => $lastMessage->message_type,
                        'created_at' => $lastMessage->created_at,
                        'is_read' => $lastMessage->is_read,
                    ] : null,
                    'unread_count' => $chat->getUnreadMessageCount($farmer),
                    'last_message_at' => $chat->last_message_at,
                ];
            })
            ->sortByDesc('last_message_at')
            ->values();

        return response()->json([
            'success' => true,
            'data' => $chats
        ]);
    }

    /**
     * Get messages for a specific chat
     */
    public function getMessages($chatId, $farmerId): JsonResponse
    {
        $chat = FarmerChat::findOrFail($chatId);
        $farmer = Farmer::findOrFail($farmerId);
        
        // Verify farmer is part of this chat
        if ($chat->farmer1_id !== $farmer->id && $chat->farmer2_id !== $farmer->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to chat'
            ], 403);
        }

        $messages = $chat->messages()
            ->with('sender:id,name,profile_image')
            ->get()
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'message' => $message->message,
                    'message_type' => $message->message_type,
                    'metadata' => $message->metadata,
                    'sender' => [
                        'id' => $message->sender->id,
                        'name' => $message->sender->name,
                        'profile_image' => $message->sender->profile_image,
                    ],
                    'is_read' => $message->is_read,
                    'created_at' => $message->created_at,
                ];
            });

        // Mark messages as read
        $chat->messages()
            ->where('sender_id', '!=', $farmer->id)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now()
            ]);

        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    /**
     * Send a message
     */
    public function sendMessage(Request $request): JsonResponse
    {
        $request->validate([
            'chat_id' => 'required|exists:farmer_chats,id',
            'sender_id' => 'required|exists:farmers,id',
            'message' => 'required|string|max:1000',
            'message_type' => 'in:text,storage_proposal,cost_share',
            'metadata' => 'nullable|array'
        ]);

        $chat = FarmerChat::findOrFail($request->chat_id);
        $sender = Farmer::findOrFail($request->sender_id);
        
        // Verify sender is part of this chat
        if ($chat->farmer1_id !== $sender->id && $chat->farmer2_id !== $sender->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to send message to this chat'
            ], 403);
        }

        $message = FarmerMessage::create([
            'chat_id' => $chat->id,
            'sender_id' => $sender->id,
            'message' => $request->message,
            'message_type' => $request->message_type ?? 'text',
            'metadata' => $request->metadata,
            'is_read' => false
        ]);

        // Update chat's last message timestamp
        $chat->update([
            'last_message_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $message->id,
                'message' => $message->message,
                'message_type' => $message->message_type,
                'metadata' => $message->metadata,
                'sender' => [
                    'id' => $sender->id,
                    'name' => $sender->name,
                    'profile_image' => $sender->profile_image,
                ],
                'created_at' => $message->created_at,
            ]
        ]);
    }

    /**
     * Send a storage proposal message
     */
    public function sendStorageProposal(Request $request): JsonResponse
    {
        $request->validate([
            'chat_id' => 'required|exists:farmer_chats,id',
            'sender_id' => 'required|exists:farmers,id',
            'storage_capacity' => 'required|numeric|min:1',
            'duration_days' => 'required|integer|min:1',
            'cost_per_cubic_meter' => 'required|numeric|min:0',
            'start_date' => 'required|date|after:today',
            'message' => 'nullable|string|max:500'
        ]);

        $chat = FarmerChat::findOrFail($request->chat_id);
        $sender = Farmer::findOrFail($request->sender_id);
        
        // Verify sender is part of this chat
        if ($chat->farmer1_id !== $sender->id && $chat->farmer2_id !== $sender->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to send proposal to this chat'
            ], 403);
        }

        $metadata = [
            'proposal_type' => 'storage_sharing',
            'storage_capacity' => $request->storage_capacity,
            'duration_days' => $request->duration_days,
            'cost_per_cubic_meter' => $request->cost_per_cubic_meter,
            'start_date' => $request->start_date,
            'total_cost' => $request->storage_capacity * $request->duration_days * $request->cost_per_cubic_meter
        ];

        $message = FarmerMessage::create([
            'chat_id' => $chat->id,
            'sender_id' => $sender->id,
            'message' => $request->message ?? 'I\'d like to propose sharing storage space with you.',
            'message_type' => 'storage_proposal',
            'metadata' => $metadata,
            'is_read' => false
        ]);

        // Update chat's last message timestamp
        $chat->update([
            'last_message_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $message->id,
                'message' => $message->message,
                'message_type' => $message->message_type,
                'metadata' => $message->metadata,
                'sender' => [
                    'id' => $sender->id,
                    'name' => $sender->name,
                    'profile_image' => $sender->profile_image,
                ],
                'created_at' => $message->created_at,
            ]
        ]);
    }
}
