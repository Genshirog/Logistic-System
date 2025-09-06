# Farmer Storage Marketplace

A marketplace-style platform for farmers to find storage partners and share cold chain storage costs.

## Features

### 🎯 Smart Matching Algorithm
- **Compatibility Scoring**: Matches farmers based on temperature requirements, location proximity, storage needs, and produce types
- **Location-Based**: Prioritizes farmers within reasonable distance (configurable radius)
- **Storage Compatibility**: Matches farmers who need storage with those who have excess capacity
- **Temperature Matching**: Ensures compatible temperature requirements for produce storage

### 👥 Farmer Profiles
- **Comprehensive Profiles**: Name, bio, location, contact information
- **Produce Types**: Array of produce types the farmer grows
- **Storage Needs**: Capacity needed or excess capacity available
- **Temperature Requirements**: Min/max temperature ranges
- **Cost Information**: Cost per cubic meter for storage sharing
- **Location Data**: Latitude/longitude for distance calculations

### 💬 Chat System
- **Real-time Messaging**: Text-based communication between matched farmers
- **Storage Proposals**: Structured proposals for storage sharing arrangements
- **Cost Sharing**: Built-in cost calculation and sharing features
- **Message Types**: Support for text, storage proposals, and cost sharing messages

### 🛒 Marketplace Interface
- **Browse & Search**: Search and filter farmers by location, produce type, and storage needs
- **Grid & List Views**: Toggle between grid and list views for different browsing preferences
- **Advanced Filtering**: Filter by storage type, produce type, distance, and compatibility
- **Connection Requests**: Send connection requests instead of instant matching
- **Pending Requests**: Manage incoming connection requests with accept/decline options

## Database Schema

### Enhanced Farmers Table
```sql
- email (unique)
- phone
- bio
- location
- latitude/longitude
- profile_image
- produce_types (JSON array)
- storage_capacity_needed
- max_temperature/min_temperature
- is_looking_for_storage (boolean)
- has_excess_storage (boolean)
- cost_per_cubic_meter
- is_active (boolean)
```

### New Tables
- **farmer_matches**: Stores successful matches between farmers
- **farmer_swipes**: Tracks swipe actions (like/pass)
- **farmer_chats**: Chat rooms for matched farmers
- **farmer_messages**: Individual messages within chats

## API Endpoints

### Marketplace
- `GET /api/farmer/{farmerId}/potential-matches` - Get potential matches
- `POST /api/farmer/send-connection-request` - Send connection request
- `POST /api/farmer/respond-connection-request` - Accept/reject connection request
- `GET /api/farmer/{farmerId}/pending-requests` - Get pending connection requests
- `GET /api/farmer/{farmerId}/matches` - Get accepted matches

### Chat
- `GET /api/farmer/{farmerId}/chats` - Get all chats for farmer
- `GET /api/farmer/chat/{chatId}/messages/{farmerId}` - Get chat messages
- `POST /api/farmer/chat/send-message` - Send text message
- `POST /api/farmer/chat/send-storage-proposal` - Send storage proposal

## Frontend Components

### Pages
- `/farmer/matching` - Main marketplace interface with tabs for browsing and connections

### Components
- `FarmerMarketplaceCard` - Marketplace-style farmer cards with detailed information
- `FarmerMatchesList` - Grid of connected farmers with chat access
- `FarmerChatModal` - Chat interface with message history and proposals
- `PendingRequestsModal` - Modal for managing incoming connection requests

## Compatibility Algorithm

The matching system uses a weighted scoring algorithm:

1. **Temperature Compatibility (30 points)**
   - Compares min/max temperature requirements
   - 3 points deducted per degree difference

2. **Location Proximity (25 points)**
   - Calculates distance using Haversine formula
   - 1 point deducted per 10km distance

3. **Storage Needs Compatibility (25 points)**
   - Perfect match when one needs storage and other has excess
   - Full points for complementary needs

4. **Produce Type Compatibility (20 points)**
   - Based on common produce types
   - Percentage of overlap multiplied by 20

## Usage

### For Farmers Looking for Storage
1. Set `is_looking_for_storage = true`
2. Specify `storage_capacity_needed`
3. Set temperature requirements
4. Add produce types
5. Browse marketplace to find farmers with excess storage
6. Send connection requests to compatible farmers

### For Farmers with Excess Storage
1. Set `has_excess_storage = true`
2. Set `cost_per_cubic_meter`
3. Specify available capacity
4. Set temperature ranges
5. Wait for connection requests from farmers needing storage
6. Accept or decline requests based on compatibility

### Marketplace Features
1. **Search & Filter**: Use search bar and filters to find specific farmers
2. **Browse**: View farmers in grid or list format
3. **Connect**: Send connection requests instead of instant matching
4. **Manage Requests**: Accept or decline incoming connection requests
5. **Chat**: Once connected, farmers can chat and make storage proposals

## Benefits

- **Cost Reduction**: Share storage costs between multiple farmers
- **Waste Reduction**: Better utilization of existing cold storage
- **Quality Maintenance**: Proper temperature control for all produce
- **Community Building**: Connect farmers in the same region
- **Efficiency**: Optimize storage capacity usage

## Future Enhancements

- Real-time notifications
- Push notifications for new matches/messages
- Advanced filtering options
- Rating and review system
- Integration with existing inventory management
- Mobile app development
- Multi-language support
- Advanced analytics and reporting

## Installation

1. Run the new migrations:
```bash
php artisan migrate
```

2. Seed the database with sample data:
```bash
php artisan db:seed --class=FarmerMatchingSeeder
```

3. Access the marketplace interface at `/farmer/matching`

## Configuration

The system can be configured by modifying:
- Compatibility scoring weights in `FarmerMatchingController`
- Distance calculation parameters
- Temperature tolerance ranges
- Maximum distance for matching
- Minimum compatibility score threshold
