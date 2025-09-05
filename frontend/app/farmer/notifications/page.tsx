import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Thermometer, CheckCircle, AlertTriangle, Package, TrendingUp, Clock } from "lucide-react"

export default function FarmerNotifications() {
  // Mock data - in real app this would come from real-time API
  const notifications = [
    {
      id: 1,
      type: "temperature_alert",
      title: "Temperature Alert - Organic Tomatoes",
      message: "Temperature in storage unit A-1 has risen to 6.2°C, above the safe range of 2-4°C.",
      timestamp: "2024-01-20T10:30:00Z",
      priority: "high",
      read: false,
      actionRequired: true,
      relatedProduct: "Organic Tomatoes",
      storageUnit: "A-1",
    },
    {
      id: 2,
      type: "offer_accepted",
      title: "Offer Accepted - Fresh Lettuce",
      message: "Your offer for 200kg of Fresh Lettuce has been accepted by Metro Storage House.",
      timestamp: "2024-01-20T09:15:00Z",
      priority: "medium",
      read: false,
      actionRequired: false,
      relatedProduct: "Fresh Lettuce",
      buyer: "Metro Storage House",
    },
    {
      id: 3,
      type: "payment_received",
      title: "Payment Received",
      message: "Payment of ₱1,200 has been received for your Bell Peppers order.",
      timestamp: "2024-01-20T08:45:00Z",
      priority: "low",
      read: true,
      actionRequired: false,
      amount: 1200,
    },
    {
      id: 4,
      type: "delivery_scheduled",
      title: "Delivery Scheduled",
      message: "Pickup for your Organic Cabbage (400kg) has been scheduled for tomorrow at 10:00 AM.",
      timestamp: "2024-01-19T16:20:00Z",
      priority: "medium",
      read: true,
      actionRequired: false,
      relatedProduct: "Organic Cabbage",
      deliveryTime: "2024-01-21T10:00:00Z",
    },
    {
      id: 5,
      type: "temperature_normal",
      title: "Temperature Normalized - Baby Carrots",
      message: "Temperature in storage unit B-2 has returned to normal range (2.1°C).",
      timestamp: "2024-01-19T14:30:00Z",
      priority: "low",
      read: true,
      actionRequired: false,
      relatedProduct: "Baby Carrots",
      storageUnit: "B-2",
    },
    {
      id: 6,
      type: "offer_expired",
      title: "Offer Expired - Sweet Corn",
      message: "Your offer for Sweet Corn has expired without acceptance. Consider resubmitting with updated pricing.",
      timestamp: "2024-01-19T12:00:00Z",
      priority: "medium",
      read: true,
      actionRequired: true,
      relatedProduct: "Sweet Corn",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "temperature_alert":
        return <Thermometer className="h-4 w-4 text-red-600" />
      case "temperature_normal":
        return <Thermometer className="h-4 w-4 text-green-600" />
      case "offer_accepted":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "offer_expired":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "payment_received":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "delivery_scheduled":
        return <Package className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const highPriorityCount = notifications.filter((n) => n.priority === "high" && !n.read).length

  return (
    <DashboardLayout userRole="farmer" title="Notifications">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Notifications</p>
                  <p className="text-2xl font-bold text-primary">{notifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Unread</p>
                  <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Clear Read Notifications
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.read ? "border-l-4 border-l-primary bg-card/50" : ""
              } ${notification.priority === "high" ? "border-destructive/20" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-muted">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <CardDescription className="text-sm">{notification.message}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                  </div>
                </div>
              </CardHeader>

              {/* Additional Details */}
              {(notification.relatedProduct || notification.amount || notification.deliveryTime) && (
                <CardContent className="pt-0">
                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    {notification.relatedProduct && (
                      <div>
                        <p className="text-muted-foreground">Product</p>
                        <p className="font-medium">{notification.relatedProduct}</p>
                      </div>
                    )}
                    {notification.storageUnit && (
                      <div>
                        <p className="text-muted-foreground">Storage Unit</p>
                        <p className="font-medium">{notification.storageUnit}</p>
                      </div>
                    )}
                    {notification.amount && (
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-green-600">₱{notification.amount}</p>
                      </div>
                    )}
                    {notification.buyer && (
                      <div>
                        <p className="text-muted-foreground">Buyer</p>
                        <p className="font-medium">{notification.buyer}</p>
                      </div>
                    )}
                    {notification.deliveryTime && (
                      <div>
                        <p className="text-muted-foreground">Delivery Time</p>
                        <p className="font-medium">{new Date(notification.deliveryTime).toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {!notification.read && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Mark as Read
                      </Button>
                    )}
                    {notification.actionRequired && <Button size="sm">Take Action</Button>}
                    {notification.type === "temperature_alert" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Temperature Data
                      </Button>
                    )}
                    {notification.type === "offer_accepted" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Order Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
