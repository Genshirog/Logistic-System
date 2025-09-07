"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Heart, 
  MapPin, 
  Thermometer, 
  Package, 
  Star,
  MessageCircle,
  DollarSign,
  Calendar,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

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

interface FarmerMarketplaceCardProps {
  farmer: FarmerProfile
  onConnect: (farmerId: number) => void
  viewMode: 'grid' | 'list'
}

export function FarmerMarketplaceCard({ 
  farmer, 
  onConnect, 
  viewMode 
}: FarmerMarketplaceCardProps) {
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getCompatibilityLabel = (score: number) => {
    if (score >= 80) return "Excellent Match"
    if (score >= 60) return "Good Match"
    return "Fair Match"
  }

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            {/* Profile Image */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center flex-shrink-0">
              <Package className="h-10 w-10 text-primary" />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{farmer.name}</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{farmer.location}</span>
                    {farmer.distance_km && (
                      <span className="ml-2">• {farmer.distance_km}km away</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={farmer.has_excess_storage ? "default" : "secondary"}
                    className={farmer.has_excess_storage ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {farmer.has_excess_storage ? "Has Storage" : "Needs Storage"}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className={cn("text-sm font-medium", getCompatibilityColor(farmer.compatibility_score))}>
                      {farmer.compatibility_score}%
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{farmer.bio}</p>

              {/* Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Produce Types */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Produce Types</h4>
                  <div className="flex flex-wrap gap-1">
                    {farmer.produce_types.slice(0, 3).map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                    {farmer.produce_types.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{farmer.produce_types.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Storage Details */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Storage Details</h4>
                  <div className="space-y-1">
                    {farmer.has_excess_storage && farmer.cost_per_cubic_meter && (
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">₱{farmer.cost_per_cubic_meter}/m³/day</span>
                      </div>
                    )}
                    {farmer.is_looking_for_storage && farmer.storage_capacity_needed && (
                      <div className="flex items-center text-sm">
                        <Package className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">Needs {farmer.storage_capacity_needed} m³</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Temperature */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Temperature Range</h4>
                  {farmer.max_temperature && farmer.min_temperature ? (
                    <div className="flex items-center text-sm">
                      <Thermometer className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {farmer.min_temperature}°C - {farmer.max_temperature}°C
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Not specified</span>
                  )}
                </div>
              </div>

              {/* Match Reasons */}
              {farmer.match_reasons.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    Why you match
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.match_reasons.slice(0, 2).map((reason, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                    {farmer.match_reasons.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{farmer.match_reasons.length - 2} more reasons
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-end">
                <Button onClick={() => onConnect(farmer.id)} className="min-w-32">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid view
  return (
    <Card className="hover:shadow-md transition-shadow h-full">
      {/* Profile Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <Package className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        {/* Compatibility Badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant={farmer.compatibility_score >= 80 ? "default" : farmer.compatibility_score >= 60 ? "secondary" : "outline"}
            className="flex items-center space-x-1"
          >
            <Star className="h-3 w-3" />
            <span>{farmer.compatibility_score}%</span>
          </Badge>
        </div>

        {/* Storage Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant={farmer.has_excess_storage ? "default" : "secondary"}
            className="bg-green-600 hover:bg-green-700"
          >
            {farmer.has_excess_storage ? "Has Storage" : "Needs Storage"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Basic Info */}
        <div>
          <h3 className="font-semibold text-foreground mb-1">{farmer.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate">{farmer.location}</span>
            {farmer.distance_km && (
              <span className="ml-1">• {farmer.distance_km}km</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{farmer.bio}</p>
        </div>

        {/* Compatibility Score */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Compatibility</span>
            <span className={cn("text-xs font-medium", getCompatibilityColor(farmer.compatibility_score))}>
              {getCompatibilityLabel(farmer.compatibility_score)}
            </span>
          </div>
          <Progress value={farmer.compatibility_score} className="h-1.5" />
        </div>

        {/* Produce Types */}
        <div>
          <h4 className="text-xs font-medium mb-1">Produce Types</h4>
          <div className="flex flex-wrap gap-1">
            {farmer.produce_types.slice(0, 2).map((type, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                {type}
              </Badge>
            ))}
            {farmer.produce_types.length > 2 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{farmer.produce_types.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Storage Details */}
        <div className="space-y-2 p-2 bg-muted/50 rounded text-xs">
          {farmer.has_excess_storage && farmer.cost_per_cubic_meter && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Cost/m³:</span>
              <span className="font-medium">₱{farmer.cost_per_cubic_meter}/day</span>
            </div>
          )}
          
          {farmer.is_looking_for_storage && farmer.storage_capacity_needed && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Needs:</span>
              <span className="font-medium">{farmer.storage_capacity_needed} m³</span>
            </div>
          )}

          {farmer.max_temperature && farmer.min_temperature && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Temp:</span>
              <span className="font-medium">
                {farmer.min_temperature}°-{farmer.max_temperature}°C
              </span>
            </div>
          )}
        </div>

        {/* Match Reasons */}
        {farmer.match_reasons.length > 0 && (
          <div>
            <h4 className="text-xs font-medium mb-1">Match Reasons</h4>
            <div className="space-y-1">
              {farmer.match_reasons.slice(0, 2).map((reason, index) => (
                <div key={index} className="flex items-start space-x-1">
                  <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground line-clamp-1">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={() => onConnect(farmer.id)} 
          className="w-full mt-3"
          size="sm"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardContent>
    </Card>
  )
}
