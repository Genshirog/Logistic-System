import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, ShoppingCart, Truck, CheckCircle, AlertCircle, Package, TrendingUp, Star } from "lucide-react"

export default function BuyerNotifications() {
  // Mock data - in real app this would come from real-time API
  const notifications = [
    {
      id: 1,
      type: "order_shipped",
      title: "Order Shipped - Fresh Lettuce",
      message: "Your order of 150kg Fresh Lettuce has been shipped and is on the way.",
      timestamp: "2024-01-20T11:00:00Z",
      priority: "medium",
      read: false,
      actionRequired: false,
      orderId: "ORD-002",
      product: "Fresh Lettuce",
      quantity: 150,
      estimatedDelivery: "2024-01-20T14:00:00Z",
      trackingNumber: "TRK-002-2024",
    },
    {
      id: 2,
      type: "new_product",
      title: "New Product Available - Organic Cabbage",
      message: "Fresh Organic Cabbage (400kg) is now available from Carlos Santos at ₱3.5/kg.",
      timestamp: "2024-01-20T10:30:00Z",
      priority: "low",
      read: false,
      actionRequired: false,
      product: "Organic Cabbage",
      farmer: "Carlos Santos",
      quantity: 400,
      pricePerKg: 3.5,
      totalPrice: 1400,
    },
    {
      id: 3,
      type: "delivery_delayed",
      title: "Delivery Delayed - Bell Peppers",
      message: "Your Bell Peppers delivery has been delayed due to traffic. New ETA: 4:30 PM.",
      timestamp: "2024-01-20T09:45:00Z",
      priority: "medium",
      read: false,
      actionRequired: false,
      orderId: "ORD-003",
      product: "Bell Peppers",
      originalETA: "2024-01-20T15:00:00Z",
      newETA: "2024-01-20T16:30:00Z",
    },
    {
      id: 4,
      type: "order_delivered",
      title: "Order Delivered - Organic Tomatoes",
      message: "Your order of 200kg Organic Tomatoes has been successfully delivered.",
      timestamp: "2024-01-19T16:30:00Z",
      priority: "low",
      read: true,
      actionRequired: true,
      orderId: "ORD-001",
      product: "Organic Tomatoes",
      quantity: 200,
      deliveryTime: "2024-01-19T16:30:00Z",
    },
    {
      id: 5,
      type: "price_drop",
      title: "Price Drop Alert - Sweet Corn",
      message: "Sweet Corn price has dropped to ₱4.0/kg (was ₱5.0/kg). Limited quantity available.",
      timestamp: "2024-01-19T14:20:00Z",
      priority: "medium",
      read: true,
      actionRequired: false,
      product: "Sweet Corn",
      oldPrice: 5.0,
      newPrice: 4.0,
      quantity: 600,
      farmer: "Lisa Garcia",
    },
    {
      id: 6,
      type: "payment_reminder",
      title: "Payment Reminder",
      message: "Payment for order ORD-004 (Baby Carrots) is due in 2 days.",
      timestamp: "2024-01-19T12:00:00Z",
      priority: "medium",
      read: true,
      actionRequired: true,
      orderId: "ORD-004",
      product: "Baby Carrots",
      amount: 337.5,
      dueDate: "2024-01-22T00:00:00Z",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order_shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "order_delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "new_product":
        return <Package className="h-4 w-4 text-green-600" />
      case "delivery_delayed":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "price_drop":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "payment_reminder":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
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
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.read).length
  const deliveryUpdates = notifications.filter(
    (n) => (n.type === "order_shipped" || n.type === "delivery_delayed" || n.type === "order_delivered") && !n.read,
  ).length

  return (
    <DashboardLayout userRole="buyer" title="Notifications">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total</p>
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
                <Truck className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Delivery Updates</p>
                  <p className="text-2xl font-bold text-green-600">{deliveryUpdates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Action Required</p>
                  <p className="text-2xl font-bold text-yellow-600">{actionRequiredCount}</p>
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
            Filter by Type
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Notification Preferences
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.read ? "border-l-4 border-l-primary bg-card/50" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-muted">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                        {notification.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
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
              <CardContent className="pt-0">
                <div className="grid gap-2 md:grid-cols-4 text-sm mb-4">
                  {notification.orderId && (
                    <div>
                      <p className="text-muted-foreground">Order ID</p>
                      <p className="font-medium">{notification.orderId}</p>
                    </div>
                  )}
                  {notification.product && (
                    <div>
                      <p className="text-muted-foreground">Product</p>
                      <p className="font-medium">{notification.product}</p>
                    </div>
                  )}
                  {notification.quantity && (
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{notification.quantity} kg</p>
                    </div>
                  )}
                  {notification.trackingNumber && (
                    <div>
                      <p className="text-muted-foreground">Tracking</p>
                      <p className="font-medium text-xs">{notification.trackingNumber}</p>
                    </div>
                  )}
                  {notification.farmer && (
                    <div>
                      <p className="text-muted-foreground">Farmer</p>
                      <p className="font-medium">{notification.farmer}</p>
                    </div>
                  )}
                  {notification.pricePerKg && (
                    <div>
                      <p className="text-muted-foreground">Price/kg</p>
                      <p className="font-medium">₱{notification.pricePerKg}</p>
                    </div>
                  )}
                  {notification.totalPrice && (
                    <div>
                      <p className="text-muted-foreground">Total Price</p>
                      <p className="font-medium text-green-600">₱{notification.totalPrice}</p>
                    </div>
                  )}
                  {notification.estimatedDelivery && (
                    <div>
                      <p className="text-muted-foreground">ETA</p>
                      <p className="font-medium">{new Date(notification.estimatedDelivery).toLocaleTimeString()}</p>
                    </div>
                  )}
                </div>

                {/* Special Info Boxes */}
                {notification.type === "price_drop" && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <p className="text-sm font-medium text-green-800">Price Drop Details</p>
                    <p className="text-sm text-green-600">
                      Was ₱{notification.oldPrice}/kg, now ₱{notification.newPrice}/kg - Save ₱
                      {((notification.oldPrice! - notification.newPrice!) * notification.quantity!).toFixed(2)}!
                    </p>
                  </div>
                )}

                {notification.type === "delivery_delayed" && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                    <p className="text-sm font-medium text-yellow-800">Delivery Update</p>
                    <p className="text-sm text-yellow-600">
                      Original ETA: {new Date(notification.originalETA!).toLocaleTimeString()} → New ETA:{" "}
                      {new Date(notification.newETA!).toLocaleTimeString()}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {!notification.read && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Mark as Read
                    </Button>
                  )}
                  {notification.type === "order_delivered" && notification.actionRequired && (
                    <>
                      <Button size="sm">
                        <Star className="h-3 w-3 mr-1" />
                        Rate Order
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Receipt
                      </Button>
                    </>
                  )}
                  {notification.type === "new_product" && (
                    <>
                      <Button size="sm">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Reserve Now
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Details
                      </Button>
                    </>
                  )}
                  {notification.type === "order_shipped" && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Track Order
                    </Button>
                  )}
                  {notification.type === "payment_reminder" && <Button size="sm">Pay Now</Button>}
                  {notification.type === "price_drop" && (
                    <Button size="sm">
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Buy at New Price
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
