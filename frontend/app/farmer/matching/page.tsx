"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { 
  Heart, 
  MapPin, 
  Thermometer, 
  Package, 
  Users, 
  MessageCircle,
  Star,
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc
} from "lucide-react"
import { FarmerMarketplaceCard } from "@/components/farmer/farmer-marketplace-card"
import { FarmerMatchesList } from "@/components/farmer/farmer-matches-list"
import { FarmerChatModal } from "@/components/farmer/farmer-chat-modal"
import { PendingRequestsModal } from "@/components/farmer/pending-requests-modal"

interface FarmerProfile {
  id: number
  name: string
  bio: string
  location: string
  produce_types: string[]
  storage_capacity_needed?: number
  has_excess_storage: boolean
  is_looking_for_storage: boolean
  cost_per_cubic_meter?: number
  max_temperature?: number
  min_temperature?: number
  profile_image?: string
  compatibility_score: number
  match_reasons: string[]
  distance_km?: number
}

interface Match {
  id: number
  farmer: {
    id: number
    name: string
    location: string
    profile_image?: string
  }
  compatibility_score: number
  matched_at: string
  chat_id?: number
  unread_count: number
}

export default function FarmerMatchingPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'marketplace' | 'matches'>('marketplace')
  const [potentialMatches, setPotentialMatches] = useState<FarmerProfile[]>([])
  const [filteredMatches, setFilteredMatches] = useState<FarmerProfile[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showPendingRequests, setShowPendingRequests] = useState(false)
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0)
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<'compatibility' | 'distance' | 'cost' | 'name'>('compatibility')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterStorageType, setFilterStorageType] = useState<'all' | 'has_storage' | 'needs_storage'>('all')
  const [filterProduceType, setFilterProduceType] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Mock farmer ID - in real app this would come from auth context
  const currentFarmerId = 1

  useEffect(() => {
    loadPotentialMatches()
    loadMatches()
    loadPendingRequestsCount()
  }, [])

  useEffect(() => {
    filterAndSortMatches()
  }, [potentialMatches, searchTerm, sortBy, sortOrder, filterStorageType, filterProduceType])

  const loadPotentialMatches = async () => {
    try {
      setLoading(true)
      // Mock data - replace with actual API call
      const mockMatches: FarmerProfile[] = [
        {
          id: 2,
          name: "Maria Santos",
          bio: "Organic vegetable farmer with 5 years experience. Looking to share cold storage costs.",
          location: "Laguna, Philippines",
          produce_types: ["Tomatoes", "Lettuce", "Bell Peppers"],
          storage_capacity_needed: 10,
          has_excess_storage: false,
          is_looking_for_storage: true,
          max_temperature: 4.0,
          min_temperature: 2.0,
          compatibility_score: 85,
          match_reasons: [
            "Similar temperature requirements",
            "Close proximity (15.2km away)",
            "Perfect storage match - you have excess storage, they need it"
          ],
          distance_km: 15.2
        },
        {
          id: 3,
          name: "Juan Dela Cruz",
          bio: "Fruit farmer specializing in mangoes and bananas. Has excess cold storage space.",
          location: "Cavite, Philippines",
          produce_types: ["Mangoes", "Bananas", "Papayas"],
          has_excess_storage: true,
          is_looking_for_storage: false,
          cost_per_cubic_meter: 50,
          max_temperature: 5.0,
          min_temperature: 3.0,
          compatibility_score: 72,
          match_reasons: [
            "Close proximity (8.5km away)",
            "Perfect storage match - you need storage, they have excess"
          ],
          distance_km: 8.5
        },
        {
          id: 4,
          name: "Ana Rodriguez",
          bio: "Dairy farmer with excess cold storage. Looking to help other farmers reduce costs.",
          location: "Batangas, Philippines",
          produce_types: ["Dairy Products", "Cheese", "Yogurt"],
          has_excess_storage: true,
          is_looking_for_storage: false,
          cost_per_cubic_meter: 45,
          max_temperature: 4.5,
          min_temperature: 2.5,
          compatibility_score: 68,
          match_reasons: [
            "Similar temperature requirements",
            "Perfect storage match - you need storage, they have excess"
          ],
          distance_km: 25.3
        }
      ]
      setPotentialMatches(mockMatches)
    } catch (error) {
      console.error('Error loading potential matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMatches = async () => {
    try {
      // Mock data - replace with actual API call
      const mockMatches: Match[] = [
        {
          id: 1,
          farmer: {
            id: 5,
            name: "Carlos Mendoza",
            location: "Quezon, Philippines",
            profile_image: "/placeholder-user.jpg"
          },
          compatibility_score: 90,
          matched_at: "2024-01-10T10:30:00Z",
          chat_id: 1,
          unread_count: 2
        },
        {
          id: 2,
          farmer: {
            id: 6,
            name: "Elena Garcia",
            location: "Rizal, Philippines",
            profile_image: "/placeholder-user.jpg"
          },
          compatibility_score: 78,
          matched_at: "2024-01-08T14:20:00Z",
          chat_id: 2,
          unread_count: 0
        }
      ]
      setMatches(mockMatches)
    } catch (error) {
      console.error('Error loading matches:', error)
    }
  }

  const filterAndSortMatches = () => {
    let filtered = [...potentialMatches]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(farmer => 
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.produce_types.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Storage type filter
    if (filterStorageType === 'has_storage') {
      filtered = filtered.filter(farmer => farmer.has_excess_storage)
    } else if (filterStorageType === 'needs_storage') {
      filtered = filtered.filter(farmer => farmer.is_looking_for_storage)
    }

    // Produce type filter
    if (filterProduceType !== 'all') {
      filtered = filtered.filter(farmer => 
        farmer.produce_types.includes(filterProduceType)
      )
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'compatibility':
          aValue = a.compatibility_score
          bValue = b.compatibility_score
          break
        case 'distance':
          aValue = a.distance_km || 999
          bValue = b.distance_km || 999
          break
        case 'cost':
          aValue = a.cost_per_cubic_meter || 999
          bValue = b.cost_per_cubic_meter || 999
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        default:
          aValue = a.compatibility_score
          bValue = b.compatibility_score
      }

      if (sortBy === 'name') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
    })

    setFilteredMatches(filtered)
  }

  const handleConnect = async (farmerId: number) => {
    try {
      // Mock API call - replace with actual API call
      console.log(`Connecting with farmer ${farmerId}`)
      // In real implementation, this would create a match or send a connection request
    } catch (error) {
      console.error('Error connecting:', error)
    }
  }

  const loadPendingRequestsCount = async () => {
    try {
      // Mock API call - replace with actual API call
      setPendingRequestsCount(2) // Mock count
    } catch (error) {
      console.error('Error loading pending requests count:', error)
    }
  }

  const getUniqueProduceTypes = () => {
    const allTypes = potentialMatches.flatMap(farmer => farmer.produce_types)
    return Array.from(new Set(allTypes))
  }

  const openChat = (chatId: number) => {
    setSelectedChat(chatId)
    setShowChatModal(true)
  }

  return (
    <DashboardLayout userRole="farmer" title="Storage Marketplace">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'marketplace'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Package className="h-4 w-4 inline mr-2" />
            Storage Marketplace
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'matches'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            My Connections ({matches.length})
          </button>
          
          {/* Pending Requests Button */}
          {pendingRequestsCount > 0 && (
            <button
              onClick={() => setShowPendingRequests(true)}
              className="pb-2 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground relative"
            >
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Requests
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center">
                {pendingRequestsCount}
              </Badge>
            </button>
          )}
        </div>

        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search farmers, locations, or produce types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filters Row */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Filters:</span>
                    </div>

                    <Select value={filterStorageType} onValueChange={(value: any) => setFilterStorageType(value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Storage Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Storage Types</SelectItem>
                        <SelectItem value="has_storage">Has Storage Available</SelectItem>
                        <SelectItem value="needs_storage">Needs Storage</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterProduceType} onValueChange={setFilterProduceType}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Produce Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Produce Types</SelectItem>
                        {getUniqueProduceTypes().map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compatibility">Compatibility</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="cost">Cost</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                      {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>

                    <div className="flex items-center space-x-2 ml-auto">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading farmers...</p>
                </div>
              </div>
            ) : filteredMatches.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No farmers found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Try adjusting your search criteria or filters to find more farmers.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm("")
                    setFilterStorageType('all')
                    setFilterProduceType('all')
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredMatches.length} of {potentialMatches.length} farmers
                  </p>
                </div>

                <div className={viewMode === 'grid' 
                  ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
                  : "space-y-4"
                }>
                  {filteredMatches.map((farmer) => (
                    <FarmerMarketplaceCard
                      key={farmer.id}
                      farmer={farmer}
                      onConnect={handleConnect}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <FarmerMatchesList
            matches={matches}
            onOpenChat={openChat}
          />
        )}

        {/* Chat Modal */}
        {showChatModal && selectedChat && (
          <FarmerChatModal
            chatId={selectedChat}
            farmerId={currentFarmerId}
            isOpen={showChatModal}
            onClose={() => {
              setShowChatModal(false)
              setSelectedChat(null)
            }}
          />
        )}

        {/* Pending Requests Modal */}
        {showPendingRequests && (
          <PendingRequestsModal
            isOpen={showPendingRequests}
            onClose={() => setShowPendingRequests(false)}
            farmerId={currentFarmerId}
            onRequestResponded={() => {
              setPendingRequestsCount(prev => Math.max(0, prev - 1))
              loadMatches() // Refresh matches list
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
