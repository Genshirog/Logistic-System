"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Check, 
  X, 
  MapPin, 
  Star,
  Clock,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PendingRequest {
  id: number
  farmer: {
    id: number
    name: string
    location: string
    profile_image?: string
    bio: string
  }
  compatibility_score: number
  match_reasons: string[]
  matched_at: string
}

interface PendingRequestsModalProps {
  isOpen: boolean
  onClose: () => void
  farmerId: number
  onRequestResponded: () => void
}

export function PendingRequestsModal({ 
  isOpen, 
  onClose, 
  farmerId, 
  onRequestResponded 
}: PendingRequestsModalProps) {
  const [requests, setRequests] = useState<PendingRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [responding, setResponding] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadPendingRequests()
    }
  }, [isOpen, farmerId])

  const loadPendingRequests = async () => {
    try {
      setLoading(true)
      // Mock data - replace with actual API call
      const mockRequests: PendingRequest[] = [
        {
          id: 1,
          farmer: {
            id: 3,
            name: "Juan Dela Cruz",
            location: "Cavite, Philippines",
            bio: "Fruit farmer specializing in mangoes and bananas. Has excess cold storage space available for sharing."
          },
          compatibility_score: 85,
          match_reasons: [
            "Similar temperature requirements",
            "Close proximity (8.5km away)",
            "Perfect storage match - you need storage, they have excess"
          ],
          matched_at: "2024-01-10T14:30:00Z"
        },
        {
          id: 2,
          farmer: {
            id: 4,
            name: "Ana Rodriguez",
            location: "Batangas, Philippines",
            bio: "Dairy farmer with excess cold storage capacity. Looking to help other farmers reduce storage costs."
          },
          compatibility_score: 72,
          match_reasons: [
            "Perfect storage match - you need storage, they have excess",
            "Similar temperature requirements"
          ],
          matched_at: "2024-01-09T10:15:00Z"
        }
      ]
      setRequests(mockRequests)
    } catch (error) {
      console.error('Error loading pending requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const respondToRequest = async (requestId: number, action: 'accept' | 'reject') => {
    try {
      setResponding(requestId)
      // Mock API call - replace with actual API call
      console.log(`Responding to request ${requestId} with action: ${action}`)
      
      // Remove the request from the list
      setRequests(prev => prev.filter(req => req.id !== requestId))
      onRequestResponded()
    } catch (error) {
      console.error('Error responding to request:', error)
    } finally {
      setResponding(null)
    }
  }

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Connection Requests ({requests.length})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
              <p className="text-muted-foreground">
                You don't have any pending connection requests at the moment.
              </p>
            </div>
          ) : (
            requests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Profile Image */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 text-primary" />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {request.farmer.name}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{request.farmer.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className={cn("text-sm font-medium", getCompatibilityColor(request.compatibility_score))}>
                              {request.compatibility_score}%
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatTimeAgo(request.matched_at)}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {request.farmer.bio}
                      </p>

                      {/* Match Reasons */}
                      {request.match_reasons.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Why they want to connect:</h4>
                          <div className="flex flex-wrap gap-2">
                            {request.match_reasons.map((reason, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => respondToRequest(request.id, 'accept')}
                          disabled={responding === request.id}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          onClick={() => respondToRequest(request.id, 'reject')}
                          disabled={responding === request.id}
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
