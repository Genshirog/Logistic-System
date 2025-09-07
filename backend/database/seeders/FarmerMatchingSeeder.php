<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Farmer;
use App\Models\FarmerMatch;
use App\Models\FarmerSwipe;
use App\Models\FarmerChat;
use App\Models\FarmerMessage;

class FarmerMatchingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample farmers with enhanced profiles
        $farmers = [
            [
                'name' => 'Maria Santos',
                'email' => 'maria.santos@example.com',
                'phone' => '+63 912 345 6789',
                'bio' => 'Organic vegetable farmer with 5 years experience. Specializing in tomatoes, lettuce, and bell peppers. Looking to share cold storage costs with other farmers.',
                'location' => 'Laguna, Philippines',
                'latitude' => 14.2736,
                'longitude' => 121.4658,
                'produce_types' => ['Tomatoes', 'Lettuce', 'Bell Peppers'],
                'storage_capacity_needed' => 10,
                'has_excess_storage' => false,
                'is_looking_for_storage' => true,
                'max_temperature' => 4.0,
                'min_temperature' => 2.0,
                'is_active' => true,
            ],
            [
                'name' => 'Juan Dela Cruz',
                'email' => 'juan.delacruz@example.com',
                'phone' => '+63 923 456 7890',
                'bio' => 'Fruit farmer specializing in mangoes and bananas. Has excess cold storage space available for sharing. 10 years of farming experience.',
                'location' => 'Cavite, Philippines',
                'latitude' => 14.4791,
                'longitude' => 120.8970,
                'produce_types' => ['Mangoes', 'Bananas', 'Papayas'],
                'has_excess_storage' => true,
                'is_looking_for_storage' => false,
                'cost_per_cubic_meter' => 50,
                'max_temperature' => 5.0,
                'min_temperature' => 3.0,
                'is_active' => true,
            ],
            [
                'name' => 'Ana Rodriguez',
                'email' => 'ana.rodriguez@example.com',
                'phone' => '+63 934 567 8901',
                'bio' => 'Dairy farmer with excess cold storage capacity. Looking to help other farmers reduce storage costs while maintaining quality.',
                'location' => 'Batangas, Philippines',
                'latitude' => 13.7567,
                'longitude' => 121.0583,
                'produce_types' => ['Dairy Products', 'Cheese', 'Yogurt'],
                'has_excess_storage' => true,
                'is_looking_for_storage' => false,
                'cost_per_cubic_meter' => 45,
                'max_temperature' => 4.5,
                'min_temperature' => 2.5,
                'is_active' => true,
            ],
            [
                'name' => 'Carlos Mendoza',
                'email' => 'carlos.mendoza@example.com',
                'phone' => '+63 945 678 9012',
                'bio' => 'Vegetable farmer focusing on leafy greens and herbs. Needs cold storage for maintaining freshness during peak season.',
                'location' => 'Quezon, Philippines',
                'latitude' => 14.0060,
                'longitude' => 121.4858,
                'produce_types' => ['Spinach', 'Kale', 'Basil', 'Parsley'],
                'storage_capacity_needed' => 8,
                'has_excess_storage' => false,
                'is_looking_for_storage' => true,
                'max_temperature' => 3.5,
                'min_temperature' => 1.5,
                'is_active' => true,
            ],
            [
                'name' => 'Elena Garcia',
                'email' => 'elena.garcia@example.com',
                'phone' => '+63 956 789 0123',
                'bio' => 'Root vegetable specialist with modern cold storage facility. Open to sharing space with compatible farmers.',
                'location' => 'Rizal, Philippines',
                'latitude' => 14.6507,
                'longitude' => 121.1025,
                'produce_types' => ['Carrots', 'Potatoes', 'Onions', 'Garlic'],
                'has_excess_storage' => true,
                'is_looking_for_storage' => false,
                'cost_per_cubic_meter' => 40,
                'max_temperature' => 4.0,
                'min_temperature' => 2.0,
                'is_active' => true,
            ],
            [
                'name' => 'Roberto Silva',
                'email' => 'roberto.silva@example.com',
                'phone' => '+63 967 890 1234',
                'bio' => 'Berry farmer with seasonal storage needs. Looking for cost-effective cold storage solutions.',
                'location' => 'Bulacan, Philippines',
                'latitude' => 14.7943,
                'longitude' => 120.8799,
                'produce_types' => ['Strawberries', 'Blueberries', 'Raspberries'],
                'storage_capacity_needed' => 6,
                'has_excess_storage' => false,
                'is_looking_for_storage' => true,
                'max_temperature' => 2.0,
                'min_temperature' => 0.5,
                'is_active' => true,
            ],
            [
                'name' => 'Isabella Torres',
                'email' => 'isabella.torres@example.com',
                'phone' => '+63 978 901 2345',
                'bio' => 'Flower farmer with controlled environment storage. Available for sharing with temperature-sensitive produce.',
                'location' => 'Pampanga, Philippines',
                'latitude' => 15.0794,
                'longitude' => 120.6200,
                'produce_types' => ['Roses', 'Orchids', 'Tulips'],
                'has_excess_storage' => true,
                'is_looking_for_storage' => false,
                'cost_per_cubic_meter' => 55,
                'max_temperature' => 3.0,
                'min_temperature' => 1.0,
                'is_active' => true,
            ],
            [
                'name' => 'Miguel Santos',
                'email' => 'miguel.santos@example.com',
                'phone' => '+63 989 012 3456',
                'bio' => 'Grain farmer with large storage capacity. Looking to diversify by sharing space with fresh produce farmers.',
                'location' => 'Nueva Ecija, Philippines',
                'latitude' => 15.5785,
                'longitude' => 120.9889,
                'produce_types' => ['Rice', 'Corn', 'Wheat'],
                'has_excess_storage' => true,
                'is_looking_for_storage' => false,
                'cost_per_cubic_meter' => 35,
                'max_temperature' => 5.5,
                'min_temperature' => 3.5,
                'is_active' => true,
            ]
        ];

        foreach ($farmers as $farmerData) {
            Farmer::create($farmerData);
        }

        // Create some sample matches and chats
        $this->createSampleMatches();
    }

    private function createSampleMatches()
    {
        // Get farmers
        $maria = Farmer::where('name', 'Maria Santos')->first();
        $juan = Farmer::where('name', 'Juan Dela Cruz')->first();
        $carlos = Farmer::where('name', 'Carlos Mendoza')->first();
        $elena = Farmer::where('name', 'Elena Garcia')->first();

        if ($maria && $juan) {
            // Create match between Maria and Juan
            $match1 = FarmerMatch::create([
                'farmer1_id' => $maria->id,
                'farmer2_id' => $juan->id,
                'status' => 'accepted',
                'compatibility_score' => 85.5,
                'match_reasons' => [
                    'Similar temperature requirements',
                    'Close proximity (15.2km away)',
                    'Perfect storage match - you have excess storage, they need it'
                ],
                'matched_at' => now()->subDays(2),
                'responded_at' => now()->subDays(2),
            ]);

            // Create chat for the match
            $chat1 = FarmerChat::create([
                'farmer1_id' => $maria->id,
                'farmer2_id' => $juan->id,
                'match_id' => $match1->id,
                'is_active' => true,
                'last_message_at' => now()->subHours(1),
            ]);

            // Create sample messages
            FarmerMessage::create([
                'chat_id' => $chat1->id,
                'sender_id' => $maria->id,
                'message' => 'Hi! I saw we matched. I\'m interested in sharing storage space with you.',
                'message_type' => 'text',
                'is_read' => true,
                'created_at' => now()->subHours(3),
            ]);

            FarmerMessage::create([
                'chat_id' => $chat1->id,
                'sender_id' => $juan->id,
                'message' => 'Great! I have excess cold storage capacity. What kind of produce do you need to store?',
                'message_type' => 'text',
                'is_read' => true,
                'created_at' => now()->subHours(2),
            ]);

            FarmerMessage::create([
                'chat_id' => $chat1->id,
                'sender_id' => $maria->id,
                'message' => 'I\'d like to propose sharing storage space with you.',
                'message_type' => 'storage_proposal',
                'metadata' => [
                    'proposal_type' => 'storage_sharing',
                    'storage_capacity' => 10,
                    'duration_days' => 30,
                    'cost_per_cubic_meter' => 50,
                    'start_date' => now()->addDays(5)->format('Y-m-d'),
                    'total_cost' => 15000
                ],
                'is_read' => false,
                'created_at' => now()->subHours(1),
            ]);
        }

        if ($carlos && $elena) {
            // Create match between Carlos and Elena
            $match2 = FarmerMatch::create([
                'farmer1_id' => $carlos->id,
                'farmer2_id' => $elena->id,
                'status' => 'accepted',
                'compatibility_score' => 78.2,
                'match_reasons' => [
                    'Similar temperature requirements',
                    'Perfect storage match - you need storage, they have excess'
                ],
                'matched_at' => now()->subDays(5),
                'responded_at' => now()->subDays(5),
            ]);

            // Create chat for the match
            $chat2 = FarmerChat::create([
                'farmer1_id' => $carlos->id,
                'farmer2_id' => $elena->id,
                'match_id' => $match2->id,
                'is_active' => true,
                'last_message_at' => now()->subDays(1),
            ]);

            // Create sample messages
            FarmerMessage::create([
                'chat_id' => $chat2->id,
                'sender_id' => $carlos->id,
                'message' => 'Hello! I\'m looking for cold storage for my leafy greens.',
                'message_type' => 'text',
                'is_read' => true,
                'created_at' => now()->subDays(4),
            ]);

            FarmerMessage::create([
                'chat_id' => $chat2->id,
                'sender_id' => $elena->id,
                'message' => 'Perfect! I have space available. What\'s your storage capacity requirement?',
                'message_type' => 'text',
                'is_read' => true,
                'created_at' => now()->subDays(3),
            ]);
        }
    }
}
