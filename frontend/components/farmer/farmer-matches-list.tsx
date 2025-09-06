"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  Star,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

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

interface FarmerMatchesListProps {
  matches: Match[]
  onOpenChat: (chatId: number) => void
}

export function FarmerMatchesList({ matches, onOpenChat }: FarmerMatchesListProps) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (matches.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Heart className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
          <p className="text-muted-foreground text-center mb-4">
            Start swiping to find farmers to share storage with!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Matches</h3>
        <Badge variant="secondary">{matches.length} matches</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {/* Profile Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-primary">
                    {match.farmer.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {match.farmer.name}
                  </h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{match.farmer.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className={cn("text-sm font-medium", getCompatibilityColor(match.compatibility_score))}>
                    {match.compatibility_score}%
                  </span>
                </div>
              </div>

              {/* Match Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Matched
                  </span>
                  <span className="font-medium">{formatTimeAgo(match.matched_at)}</span>
                </div>
              </div>

              {/* Unread Messages Indicator */}
              {match.unread_count > 0 && (
                <div className="mb-4">
                  <Badge variant="destructive" className="text-xs">
                    {match.unread_count} unread message{match.unread_count > 1 ? 's' : ''}
                  </Badge>
                </div>
              )}

              {/* Action Button */}
              <Button
                className="w-full"
                onClick={() => match.chat_id && onOpenChat(match.chat_id)}
                disabled={!match.chat_id}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {match.chat_id ? "Open Chat" : "Chat Unavailable"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
