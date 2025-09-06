"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Send, 
  X, 
  MapPin, 
  Thermometer, 
  Package,
  DollarSign,
  Calendar,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  message: string
  message_type: 'text' | 'storage_proposal' | 'cost_share'
  metadata?: any
  sender: {
    id: number
    name: string
    profile_image?: string
  }
  is_read: boolean
  created_at: string
}

interface FarmerChatModalProps {
  chatId: number
  farmerId: number
  isOpen: boolean
  onClose: () => void
}

export function FarmerChatModal({ chatId, farmerId, isOpen, onClose }: FarmerChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showStorageProposal, setShowStorageProposal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data - replace with actual API calls
  const mockMessages: Message[] = [
    {
      id: 1,
      message: "Hi! I saw we matched. I'm interested in sharing storage space with you.",
      message_type: 'text',
      sender: {
        id: 2,
        name: "Maria Santos",
        profile_image: "/placeholder-user.jpg"
      },
      is_read: true,
      created_at: "2024-01-10T10:30:00Z"
    },
    {
      id: 2,
      message: "Great! I have excess cold storage capacity. What kind of produce do you need to store?",
      message_type: 'text',
      sender: {
        id: farmerId,
        name: "You"
      },
      is_read: true,
      created_at: "2024-01-10T10:35:00Z"
    },
    {
      id: 3,
      message: "I'd like to propose sharing storage space with you.",
      message_type: 'storage_proposal',
      metadata: {
        proposal_type: 'storage_sharing',
        storage_capacity: 10,
        duration_days: 30,
        cost_per_cubic_meter: 50,
        start_date: '2024-01-15',
        total_cost: 15000
      },
      sender: {
        id: 2,
        name: "Maria Santos",
        profile_image: "/placeholder-user.jpg"
      },
      is_read: false,
      created_at: "2024-01-10T10:40:00Z"
    }
  ]

  useEffect(() => {
    if (isOpen) {
      loadMessages()
    }
  }, [isOpen, chatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    try {
      setLoading(true)
      // Mock API call - replace with actual API call
      setTimeout(() => {
        setMessages(mockMessages)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error loading messages:', error)
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now(),
      message: newMessage,
      message_type: 'text',
      sender: {
        id: farmerId,
        name: "You"
      },
      is_read: false,
      created_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")

    try {
      // Mock API call - replace with actual API call
      console.log('Sending message:', message)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const sendStorageProposal = async (proposalData: any) => {
    const message: Message = {
      id: Date.now(),
      message: "I'd like to propose sharing storage space with you.",
      message_type: 'storage_proposal',
      metadata: proposalData,
      sender: {
        id: farmerId,
        name: "You"
      },
      is_read: false,
      created_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, message])
    setShowStorageProposal(false)

    try {
      // Mock API call - replace with actual API call
      console.log('Sending storage proposal:', message)
    } catch (error) {
      console.error('Error sending storage proposal:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const renderStorageProposal = (message: Message) => {
    if (message.message_type !== 'storage_proposal' || !message.metadata) return null

    const { storage_capacity, duration_days, cost_per_cubic_meter, start_date, total_cost } = message.metadata

    return (
      <Card className="mt-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Package className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">Storage Proposal</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Package className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Capacity:</span>
              <span className="font-medium">{storage_capacity} m³</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{duration_days} days</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <DollarSign className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Cost/m³:</span>
              <span className="font-medium">₱{cost_per_cubic_meter}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Start Date:</span>
              <span className="font-medium">{new Date(start_date).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Cost:</span>
              <span className="font-bold text-blue-900">₱{total_cost.toLocaleString()}</span>
            </div>
          </div>
          
          {message.sender.id === farmerId && (
            <div className="mt-3 flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                Edit Proposal
              </Button>
              <Button size="sm" variant="destructive" className="flex-1">
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Chat with Maria Santos</span>
          </DialogTitle>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender.id === farmerId ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] space-y-1",
                    message.sender.id === farmerId ? "order-2" : "order-1"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2",
                      message.sender.id === farmerId
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.message}</p>
                    {renderStorageProposal(message)}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{message.sender.name}</span>
                    <span>•</span>
                    <span>{formatTime(message.created_at)}</span>
                    {!message.is_read && message.sender.id !== farmerId && (
                      <Badge variant="secondary" className="text-xs">Unread</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex space-x-2 pt-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button
            onClick={() => setShowStorageProposal(true)}
            variant="outline"
            size="sm"
          >
            <Package className="h-4 w-4" />
          </Button>
          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Storage Proposal Modal */}
        {showStorageProposal && (
          <StorageProposalModal
            isOpen={showStorageProposal}
            onClose={() => setShowStorageProposal(false)}
            onSubmit={sendStorageProposal}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

// Storage Proposal Modal Component
interface StorageProposalModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

function StorageProposalModal({ isOpen, onClose, onSubmit }: StorageProposalModalProps) {
  const [formData, setFormData] = useState({
    storage_capacity: '',
    duration_days: '',
    cost_per_cubic_meter: '',
    start_date: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const proposalData = {
      ...formData,
      storage_capacity: parseFloat(formData.storage_capacity),
      duration_days: parseInt(formData.duration_days),
      cost_per_cubic_meter: parseFloat(formData.cost_per_cubic_meter),
      total_cost: parseFloat(formData.storage_capacity) * parseInt(formData.duration_days) * parseFloat(formData.cost_per_cubic_meter)
    }
    onSubmit(proposalData)
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Storage Proposal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Storage Capacity (m³)</label>
              <Input
                type="number"
                value={formData.storage_capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, storage_capacity: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Duration (days)</label>
              <Input
                type="number"
                value={formData.duration_days}
                onChange={(e) => setFormData(prev => ({ ...prev, duration_days: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Cost per m³ (₱)</label>
              <Input
                type="number"
                value={formData.cost_per_cubic_meter}
                onChange={(e) => setFormData(prev => ({ ...prev, cost_per_cubic_meter: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Message (optional)</label>
            <Input
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Add a personal message..."
            />
          </div>
          
          {formData.storage_capacity && formData.duration_days && formData.cost_per_cubic_meter && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Total Cost:</div>
              <div className="text-lg font-bold">
                ₱{(parseFloat(formData.storage_capacity) * parseInt(formData.duration_days) * parseFloat(formData.cost_per_cubic_meter)).toLocaleString()}
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Send Proposal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
