"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Thermometer, Package, Truck } from "lucide-react"

interface NotificationBellProps {
  userRole: "farmer" | "storage" | "buyer"
}

export function NotificationBell({ userRole }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Mock recent notifications - in real app this would come from API
  // TODO: Fetch notifications via GET /api/notifications?role={userRole} and show unread state
  // TODO: Mark-as-read PATCH /api/notifications/:id/read when clicked
  const getRecentNotifications = () => {
    const baseNotifications = {
      farmer: [
        {
          id: 1,
          type: "temperature_alert",
          title: "Temperature Alert",
          message: "Unit A-1 temperature above safe range",
          timestamp: "5 min ago",
          priority: "high",
        },
        {
          id: 2,
          type: "offer_accepted",
          title: "Offer Accepted",
          message: "Fresh Lettuce offer accepted by Metro Storage",
          timestamp: "1 hour ago",
          priority: "medium",
        },
      ],
      storage: [
        {
          id: 1,
          type: "temperature_critical",
          title: "Critical Alert",
          message: "Unit B-2 requires immediate attention",
          timestamp: "2 min ago",
          priority: "high",
        },
        {
          id: 2,
          type: "new_offer",
          title: "New Offer",
          message: "Juan Dela Cruz submitted cabbage offer",
          timestamp: "30 min ago",
          priority: "medium",
        },
      ],
      buyer: [
        {
          id: 1,
          type: "order_shipped",
          title: "Order Shipped",
          message: "Fresh Lettuce order is on the way",
          timestamp: "15 min ago",
          priority: "medium",
        },
        {
          id: 2,
          type: "new_product",
          title: "New Product",
          message: "Organic Cabbage now available",
          timestamp: "45 min ago",
          priority: "low",
        },
      ],
    }
    return baseNotifications[userRole] || []
  }

  const notifications = getRecentNotifications()
  const unreadCount = notifications.length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "temperature_alert":
      case "temperature_critical":
        return <Thermometer className="h-3 w-3 text-red-500" />
      case "offer_accepted":
      case "new_offer":
        return <Package className="h-3 w-3 text-blue-500" />
      case "order_shipped":
        return <Truck className="h-3 w-3 text-green-500" />
      case "new_product":
        return <Package className="h-3 w-3 text-green-500" />
      default:
        return <Bell className="h-3 w-3 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notifications</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <a href={`/${userRole}/notifications`}>View All</a>
              </Button>
            </div>
            <CardDescription>
              {unreadCount > 0 ? `${unreadCount} new notifications` : "No new notifications"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.length > 0 ? (
              <ScrollArea className="h-64">
                <div className="space-y-1 p-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-l-2 ${getPriorityColor(notification.priority)} bg-muted/30 rounded-r-lg cursor-pointer hover:bg-muted/50 transition-colors`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-start gap-2">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-card-foreground truncate">{notification.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="p-6 text-center">
                <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
