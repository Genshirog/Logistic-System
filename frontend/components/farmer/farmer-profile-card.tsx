"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Heart, 
  X, 
  MapPin, 
  Thermometer, 
  Package, 
  Star,
  ArrowLeft,
  ArrowRight,
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

interface FarmerProfileCardProps {
  farmer: FarmerProfile
  onSwipe: (action: 'like' | 'pass') => void
  currentIndex: number
  totalMatches: number
}

export function FarmerProfileCard({ 
  farmer, 
  onSwipe, 
  currentIndex, 
  totalMatches 
}: FarmerProfileCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSwipe = (action: 'like' | 'pass') => {
    setIsAnimating(true)
    setTimeout(() => {
      onSwipe(action)
      setIsAnimating(false)
    }, 300)
  }

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

  return (
    <div className="relative">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>{currentIndex + 1} of {totalMatches}</span>
        <div className="flex items-center space-x-2">
          <span>Compatibility</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className={cn("font-medium", getCompatibilityColor(farmer.compatibility_score))}>
              {farmer.compatibility_score}%
            </span>
          </div>
        </div>
      </div>

      <Card className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        isAnimating && "scale-95 opacity-50"
      )}>
        {/* Profile Image */}
        <div className="relative h-80 bg-gradient-to-br from-green-100 to-blue-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
              <Package className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          {/* Compatibility Badge */}
          <div className="absolute top-4 right-4">
            <Badge 
              variant={farmer.compatibility_score >= 80 ? "default" : farmer.compatibility_score >= 60 ? "secondary" : "outline"}
              className="flex items-center space-x-1"
            >
              <Star className="h-3 w-3" />
              <span>{farmer.compatibility_score}%</span>
            </Badge>
          </div>

          {/* Storage Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant={farmer.has_excess_storage ? "default" : "secondary"}
              className="bg-green-600 hover:bg-green-700"
            >
              {farmer.has_excess_storage ? "Has Storage" : "Needs Storage"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Basic Info */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">{farmer.name}</h2>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{farmer.location}</span>
              {farmer.distance_km && (
                <span className="ml-2">• {farmer.distance_km}km away</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{farmer.bio}</p>
          </div>

          {/* Compatibility Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Compatibility</span>
              <span className={cn("text-sm font-medium", getCompatibilityColor(farmer.compatibility_score))}>
                {getCompatibilityLabel(farmer.compatibility_score)}
              </span>
            </div>
            <Progress value={farmer.compatibility_score} className="h-2" />
          </div>

          {/* Match Reasons */}
          {farmer.match_reasons.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Why you match
              </h4>
              <div className="space-y-1">
                {farmer.match_reasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Produce Types */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Produce Types</h4>
            <div className="flex flex-wrap gap-2">
              {farmer.produce_types.map((type, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Storage Details */}
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium">Storage Details</h4>
            
            {farmer.has_excess_storage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Available Storage</span>
                  <span className="font-medium">Excess capacity available</span>
                </div>
                {farmer.cost_per_cubic_meter && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cost per m³</span>
                    <span className="font-medium">₱{farmer.cost_per_cubic_meter}/day</span>
                  </div>
                )}
              </div>
            )}

            {farmer.is_looking_for_storage && farmer.storage_capacity_needed && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Storage Needed</span>
                <span className="font-medium">{farmer.storage_capacity_needed} m³</span>
              </div>
            )}

            {farmer.max_temperature && farmer.min_temperature && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Thermometer className="h-3 w-3 mr-1" />
                  Temperature Range
                </span>
                <span className="font-medium">
                  {farmer.min_temperature}°C - {farmer.max_temperature}°C
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              onClick={() => handleSwipe('pass')}
              disabled={isAnimating}
            >
              <X className="h-5 w-5 mr-2" />
              Pass
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => handleSwipe('like')}
              disabled={isAnimating}
            >
              <Heart className="h-5 w-5 mr-2" />
              Like
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Swipe Instructions */}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        <p>Swipe right to like, left to pass</p>
      </div>
    </div>
  )
}
