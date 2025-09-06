<?php

namespace App\Http\Controllers;

use App\Models\Farmer;
use App\Models\FarmerSwipe;
use App\Models\FarmerMatch;
use App\Models\FarmerChat;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class FarmerMatchingController extends Controller
{
    /**
     * Get potential matches for a farmer
     */
    public function getPotentialMatches(Request $request, $farmerId): JsonResponse
    {
        $farmer = Farmer::findOrFail($farmerId);
        
        // Get farmers that haven't been swiped on yet
        $swipedIds = $farmer->getSwipedFarmerIds();
        $swipedIds[] = $farmerId; // Exclude self
        
        $potentialMatches = Farmer::where('is_active', true)
            ->whereNotIn('id', $swipedIds)
            ->where(function ($query) use ($farmer) {
                // Match farmers looking for storage with those who have excess
                if ($farmer->is_looking_for_storage) {
                    $query->where('has_excess_storage', true);
                } elseif ($farmer->has_excess_storage) {
                    $query->where('is_looking_for_storage', true);
                }
            })
            ->limit(10)
            ->get()
            ->map(function ($potentialFarmer) use ($farmer) {
                $compatibilityScore = $farmer->calculateCompatibilityWith($potentialFarmer);
                $reasons = $this->getMatchReasons($farmer, $potentialFarmer);
                
                return [
                    'id' => $potentialFarmer->id,
                    'name' => $potentialFarmer->name,
                    'bio' => $potentialFarmer->bio,
                    'location' => $potentialFarmer->location,
                    'produce_types' => $potentialFarmer->produce_types,
                    'storage_capacity_needed' => $potentialFarmer->storage_capacity_needed,
                    'has_excess_storage' => $potentialFarmer->has_excess_storage,
                    'is_looking_for_storage' => $potentialFarmer->is_looking_for_storage,
                    'cost_per_cubic_meter' => $potentialFarmer->cost_per_cubic_meter,
                    'max_temperature' => $potentialFarmer->max_temperature,
                    'min_temperature' => $potentialFarmer->min_temperature,
                    'profile_image' => $potentialFarmer->profile_image,
                    'compatibility_score' => $compatibilityScore,
                    'match_reasons' => $reasons,
                    'distance_km' => $this->calculateDistance($farmer, $potentialFarmer)
                ];
            })
            ->sortByDesc('compatibility_score')
            ->values();

        return response()->json([
            'success' => true,
            'data' => $potentialMatches
        ]);
    }

    /**
     * Send connection request to another farmer
     */
    public function sendConnectionRequest(Request $request): JsonResponse
    {
        $request->validate([
            'sender_id' => 'required|exists:farmers,id',
            'receiver_id' => 'required|exists:farmers,id|different:sender_id',
            'message' => 'nullable|string|max:500'
        ]);

        $sender = Farmer::findOrFail($request->sender_id);
        $receiver = Farmer::findOrFail($request->receiver_id);

        // Check if already connected or has pending request
        $existingMatch = FarmerMatch::where(function ($query) use ($sender, $receiver) {
            $query->where('farmer1_id', $sender->id)->where('farmer2_id', $receiver->id)
                  ->orWhere('farmer1_id', $receiver->id)->where('farmer2_id', $sender->id);
        })->first();

        if ($existingMatch) {
            return response()->json([
                'success' => false,
                'message' => 'Already connected or has pending request'
            ], 400);
        }

        // Create connection request (pending match)
        $match = FarmerMatch::create([
            'farmer1_id' => $sender->id,
            'farmer2_id' => $receiver->id,
            'status' => 'pending',
            'compatibility_score' => $sender->calculateCompatibilityWith($receiver),
            'match_reasons' => $this->getMatchReasons($sender, $receiver),
            'matched_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'match' => $match,
                'message' => 'Connection request sent successfully'
            ]
        ]);
    }

    /**
     * Accept or reject a connection request
     */
    public function respondToConnectionRequest(Request $request): JsonResponse
    {
        $request->validate([
            'match_id' => 'required|exists:farmer_matches,id',
            'farmer_id' => 'required|exists:farmers,id',
            'action' => 'required|in:accept,reject'
        ]);

        $match = FarmerMatch::findOrFail($request->match_id);
        $farmer = Farmer::findOrFail($request->farmer_id);

        // Verify farmer is part of this match
        if ($match->farmer1_id !== $farmer->id && $match->farmer2_id !== $farmer->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to respond to this request'
            ], 403);
        }

        if ($match->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'This request has already been responded to'
            ], 400);
        }

        // Update match status
        $match->update([
            'status' => $request->action === 'accept' ? 'accepted' : 'rejected',
            'responded_at' => now()
        ]);

        // If accepted, create chat room
        if ($request->action === 'accept') {
            FarmerChat::create([
                'farmer1_id' => $match->farmer1_id,
                'farmer2_id' => $match->farmer2_id,
                'match_id' => $match->id,
                'is_active' => true,
                'last_message_at' => now()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'match' => $match,
                'message' => $request->action === 'accept' ? 'Connection accepted' : 'Connection rejected'
            ]
        ]);
    }

    /**
     * Get pending connection requests for a farmer
     */
    public function getPendingRequests($farmerId): JsonResponse
    {
        $farmer = Farmer::findOrFail($farmerId);
        
        $pendingRequests = FarmerMatch::where('farmer2_id', $farmer->id)
            ->where('status', 'pending')
            ->with('farmer1')
            ->get()
            ->map(function ($match) {
                return [
                    'id' => $match->id,
                    'farmer' => [
                        'id' => $match->farmer1->id,
                        'name' => $match->farmer1->name,
                        'location' => $match->farmer1->location,
                        'profile_image' => $match->farmer1->profile_image,
                        'bio' => $match->farmer1->bio,
                    ],
                    'compatibility_score' => $match->compatibility_score,
                    'match_reasons' => $match->match_reasons,
                    'matched_at' => $match->matched_at,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $pendingRequests
        ]);
    }

    /**
     * Get matches for a farmer
     */
    public function getMatches($farmerId): JsonResponse
    {
        $farmer = Farmer::findOrFail($farmerId);
        
        $matches = $farmer->getAllMatches()
            ->where('status', 'accepted')
            ->map(function ($match) use ($farmer) {
                $otherFarmer = $match->getOtherFarmer($farmer);
                $chat = FarmerChat::where('match_id', $match->id)->first();
                
                return [
                    'id' => $match->id,
                    'farmer' => [
                        'id' => $otherFarmer->id,
                        'name' => $otherFarmer->name,
                        'location' => $otherFarmer->location,
                        'profile_image' => $otherFarmer->profile_image,
                    ],
                    'compatibility_score' => $match->compatibility_score,
                    'matched_at' => $match->matched_at,
                    'chat_id' => $chat ? $chat->id : null,
                    'unread_count' => $chat ? $chat->getUnreadMessageCount($farmer) : 0
                ];
            })
            ->sortByDesc('matched_at')
            ->values();

        return response()->json([
            'success' => true,
            'data' => $matches
        ]);
    }

    /**
     * Create a match between two farmers
     */
    private function createMatch(Farmer $farmer1, Farmer $farmer2): FarmerMatch
    {
        $compatibilityScore = $farmer1->calculateCompatibilityWith($farmer2);
        $reasons = $this->getMatchReasons($farmer1, $farmer2);

        $match = FarmerMatch::create([
            'farmer1_id' => $farmer1->id,
            'farmer2_id' => $farmer2->id,
            'status' => 'accepted',
            'compatibility_score' => $compatibilityScore,
            'match_reasons' => $reasons,
            'matched_at' => now(),
            'responded_at' => now()
        ]);

        // Create chat room
        FarmerChat::create([
            'farmer1_id' => $farmer1->id,
            'farmer2_id' => $farmer2->id,
            'match_id' => $match->id,
            'is_active' => true,
            'last_message_at' => now()
        ]);

        return $match;
    }

    /**
     * Get match reasons for two farmers
     */
    private function getMatchReasons(Farmer $farmer1, Farmer $farmer2): array
    {
        $reasons = [];

        // Temperature compatibility
        if ($farmer1->max_temperature && $farmer2->max_temperature) {
            $tempDiff = abs($farmer1->max_temperature - $farmer2->max_temperature);
            if ($tempDiff <= 2) {
                $reasons[] = 'Similar temperature requirements';
            }
        }

        // Location proximity
        if ($farmer1->latitude && $farmer1->longitude && $farmer2->latitude && $farmer2->longitude) {
            $distance = $this->calculateDistance($farmer1, $farmer2);
            if ($distance <= 50) {
                $reasons[] = 'Close proximity (' . round($distance, 1) . 'km away)';
            }
        }

        // Storage compatibility
        if ($farmer1->is_looking_for_storage && $farmer2->has_excess_storage) {
            $reasons[] = 'Perfect storage match - you need storage, they have excess';
        } elseif ($farmer1->has_excess_storage && $farmer2->is_looking_for_storage) {
            $reasons[] = 'Perfect storage match - you have excess storage, they need it';
        }

        // Produce compatibility
        if ($farmer1->produce_types && $farmer2->produce_types) {
            $commonTypes = array_intersect($farmer1->produce_types, $farmer2->produce_types);
            if (count($commonTypes) > 0) {
                $reasons[] = 'Similar produce types: ' . implode(', ', $commonTypes);
            }
        }

        return $reasons;
    }

    /**
     * Calculate distance between two farmers
     */
    private function calculateDistance(Farmer $farmer1, Farmer $farmer2): ?float
    {
        if (!$farmer1->latitude || !$farmer1->longitude || !$farmer2->latitude || !$farmer2->longitude) {
            return null;
        }

        $earthRadius = 6371; // Earth's radius in kilometers

        $dLat = deg2rad($farmer2->latitude - $farmer1->latitude);
        $dLon = deg2rad($farmer2->longitude - $farmer1->longitude);

        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($farmer1->latitude)) * cos(deg2rad($farmer2->latitude)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        return $earthRadius * $c;
    }
}
