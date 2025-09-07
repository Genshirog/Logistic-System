<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FarmerMatch;
use App\Models\Farmer;
use App\Models\StorageTransaction;
use Illuminate\Support\Facades\DB;

class GroupStorageController extends Controller
{
    /**
     * Get group storage statistics for a farmer
     */
    public function getStats($farmerId)
    {
        try {
            // Get active groups where farmer is a member
            $activeGroups = FarmerMatch::where(function ($query) use ($farmerId) {
                $query->where('farmer1_id', $farmerId)
                      ->orWhere('farmer2_id', $farmerId);
            })
            ->where('status', 'accepted')
            ->count();

            // Calculate total savings (mock calculation)
            $totalSavings = $activeGroups * 1500; // Average savings per group

            // Count storage partners
            $storagePartners = FarmerMatch::where(function ($query) use ($farmerId) {
                $query->where('farmer1_id', $farmerId)
                      ->orWhere('farmer2_id', $farmerId);
            })
            ->where('status', 'accepted')
            ->count();

            // Calculate shared costs this month
            $sharedCosts = $activeGroups * 500; // Average shared cost per group

            return response()->json([
                'success' => true,
                'data' => [
                    'activeGroups' => $activeGroups,
                    'totalSavings' => $totalSavings,
                    'storagePartners' => $storagePartners,
                    'sharedCosts' => $sharedCosts,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch group storage stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all storage groups for a farmer
     */
    public function getGroups($farmerId)
    {
        try {
            $groups = FarmerMatch::where(function ($query) use ($farmerId) {
                $query->where('farmer1_id', $farmerId)
                      ->orWhere('farmer2_id', $farmerId);
            })
            ->where('status', 'accepted')
            ->with(['farmer1', 'farmer2'])
            ->get()
            ->map(function ($match) use ($farmerId) {
                $partner = $match->farmer1_id == $farmerId ? $match->farmer2 : $match->farmer1;
                
                return [
                    'id' => $match->id,
                    'name' => "Storage Group with {$partner->name}",
                    'facility' => "Cold Storage Facility", // Mock data
                    'location' => "Metro Manila", // Mock data
                    'temperature' => "2-4°C", // Mock data
                    'currentTemp' => 3.2, // Mock data
                    'status' => 'active',
                    'totalCapacity' => 1000, // Mock data
                    'usedCapacity' => 750, // Mock data
                    'partner' => [
                        'id' => $partner->id,
                        'name' => $partner->name,
                        'produce' => implode(', ', $partner->produce_types ?? []),
                        'quantity' => "200 kg", // Mock data
                        'contribution' => 50, // Mock data
                    ],
                    'monthlyCost' => 1000, // Mock data
                    'yourShare' => 500, // Mock data
                    'savings' => 200, // Mock data
                    'nextPayment' => now()->addDays(15)->format('Y-m-d'),
                    'establishedDate' => $match->matched_at->format('Y-m-d'),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $groups
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch storage groups',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get detailed information about a specific storage group
     */
    public function getGroupDetails($farmerId, $groupId)
    {
        try {
            $group = FarmerMatch::where('id', $groupId)
                ->where(function ($query) use ($farmerId) {
                    $query->where('farmer1_id', $farmerId)
                          ->orWhere('farmer2_id', $farmerId);
                })
                ->with(['farmer1', 'farmer2'])
                ->first();

            if (!$group) {
                return response()->json([
                    'success' => false,
                    'message' => 'Group not found'
                ], 404);
            }

            $partner = $group->farmer1_id == $farmerId ? $group->farmer2 : $group->farmer1;

            $groupDetails = [
                'id' => $group->id,
                'name' => "Storage Group with {$partner->name}",
                'facility' => "Cold Storage Facility",
                'location' => "Metro Manila",
                'temperature' => "2-4°C",
                'currentTemp' => 3.2,
                'status' => $group->status,
                'totalCapacity' => 1000,
                'usedCapacity' => 750,
                'partners' => [
                    [
                        'id' => $partner->id,
                        'name' => $partner->name,
                        'produce' => implode(', ', $partner->produce_types ?? []),
                        'quantity' => "200 kg",
                        'contribution' => 50,
                    ]
                ],
                'monthlyCost' => 1000,
                'yourShare' => 500,
                'savings' => 200,
                'nextPayment' => now()->addDays(15)->format('Y-m-d'),
                'establishedDate' => $group->matched_at->format('Y-m-d'),
                'compatibilityScore' => $group->compatibility_score,
                'matchReasons' => $group->match_reasons,
            ];

            return response()->json([
                'success' => true,
                'data' => $groupDetails
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch group details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get storage cost breakdown for a farmer
     */
    public function getCostBreakdown($farmerId)
    {
        try {
            // Mock cost breakdown data
            $costBreakdown = [
                'totalMonthlyCost' => 1500,
                'yourShare' => 500,
                'savings' => 200,
                'breakdown' => [
                    [
                        'category' => 'Storage Rental',
                        'amount' => 800,
                        'yourShare' => 267,
                    ],
                    [
                        'category' => 'Electricity',
                        'amount' => 400,
                        'yourShare' => 133,
                    ],
                    [
                        'category' => 'Maintenance',
                        'amount' => 300,
                        'yourShare' => 100,
                    ],
                ],
                'projectedSavings' => [
                    'monthly' => 200,
                    'yearly' => 2400,
                ]
            ];

            return response()->json([
                'success' => true,
                'data' => $costBreakdown
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch cost breakdown',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get storage facility information
     */
    public function getStorageFacilities()
    {
        try {
            // Mock storage facilities data
            $facilities = [
                [
                    'id' => 1,
                    'name' => 'Cold Storage Facility North',
                    'location' => 'Quezon City, Metro Manila',
                    'temperatureRange' => '2-4°C',
                    'capacity' => 1000,
                    'availableCapacity' => 250,
                    'costPerKg' => 2.5,
                    'rating' => 4.8,
                ],
                [
                    'id' => 2,
                    'name' => 'Premium Cold Storage South',
                    'location' => 'Makati City, Metro Manila',
                    'temperatureRange' => '4-6°C',
                    'capacity' => 800,
                    'availableCapacity' => 200,
                    'costPerKg' => 3.0,
                    'rating' => 4.9,
                ],
                [
                    'id' => 3,
                    'name' => 'Specialized Storage East',
                    'location' => 'Pasig City, Metro Manila',
                    'temperatureRange' => '1-3°C',
                    'capacity' => 500,
                    'availableCapacity' => 100,
                    'costPerKg' => 2.8,
                    'rating' => 4.7,
                ],
            ];

            return response()->json([
                'success' => true,
                'data' => $facilities
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch storage facilities',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
