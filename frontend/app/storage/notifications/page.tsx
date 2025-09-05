"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Thermometer, AlertTriangle, Package, Truck, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function StorageNotifications() {
  // Mock data - in real app this would come from real-time API
  type Notification = {
    id: string,
    type: string,
    title: string,
    message: string,
    timestamp: string,
    priority: string,
    read: boolean,
    actionRequired: boolean,
    storageUnit: string,
    currentTemp: string,
    targetTemp: string,
    product: string,
    currentCapacity: number;
    price: number;
    farmer: string;
    quantity: number;
  }

  const [notifications, setNotification] = useState<Notification[]>([]);

  const fetchData = async <T,>(url:string): Promise<T> => {
    const response = await axios.get<T>(url);
    return response.data;
  }; 

  useEffect(() => {
    (async () =>{
      try{
        const [notData] = await Promise.all([
          fetchData<Notification[]>("http://127.0.0.1:8000/storage/notification/notifications"),
        ]);
        setNotification(notData);
      }catch(error){
        console.error("Error fetching temperature data", error);
      }
    })();
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "temperature_critical":
        return <Thermometer className="h-4 w-4 text-red-600" />
      case "temperature_normalized":
        return <Thermometer className="h-4 w-4 text-green-600" />
      case "new_offer":
        return <Package className="h-4 w-4 text-blue-600" />
      case "capacity_warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "delivery_completed":
        return <Truck className="h-4 w-4 text-green-600" />
      case "maintenance_due":
        return <Settings className="h-4 w-4 text-orange-600" />
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
  const criticalCount = notifications.filter((n) => n.priority === "high" && !n.read).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.read).length

  return (
    <DashboardLayout userRole="storage" title="Notifications">
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
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Critical</p>
                  <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-yellow-600" />
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
            Filter by Priority
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Notification Settings
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.read ? "border-l-4 border-l-primary bg-card/50" : ""
              } ${notification.priority === "high" ? "border-destructive/20 bg-destructive/5" : ""}`}
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
                  {notification.storageUnit && (
                    <div>
                      <p className="text-muted-foreground">Storage Unit</p>
                      <p className="font-medium">{notification.storageUnit}</p>
                    </div>
                  )}
                  {notification.product && (
                    <div>
                      <p className="text-muted-foreground">Product</p>
                      <p className="font-medium">{notification.product}</p>
                    </div>
                  )}
                  {notification.currentTemp && (
                    <div>
                      <p className="text-muted-foreground">Current Temp</p>
                      <p className="font-medium text-red-600">{notification.currentTemp}°C</p>
                    </div>
                  )}
                  {notification.targetTemp && (
                    <div>
                      <p className="text-muted-foreground">Target Temp</p>
                      <p className="font-medium">{notification.targetTemp}°C</p>
                    </div>
                  )}
                  {notification.farmer && (
                    <div>
                      <p className="text-muted-foreground">Farmer</p>
                      <p className="font-medium">{notification.farmer}</p>
                    </div>
                  )}
                  {notification.quantity && (
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{notification.quantity} kg</p>
                    </div>
                  )}
                  {notification.price && (
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium">₱{notification.price}</p>
                    </div>
                  )}
                  {notification.currentCapacity && (
                    <div>
                      <p className="text-muted-foreground">Capacity</p>
                      <p className="font-medium">{notification.currentCapacity}%</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {!notification.read && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Mark as Read
                    </Button>
                  )}
                  {notification.type === "temperature_critical" && (
                    <>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Emergency Response
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Temperature Control
                      </Button>
                    </>
                  )}
                  {notification.type === "new_offer" && (
                    <>
                      <Button size="sm">Accept Offer</Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        Decline
                      </Button>
                    </>
                  )}
                  {notification.type === "maintenance_due" && <Button size="sm">Schedule Maintenance</Button>}
                  {notification.type === "capacity_warning" && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Inventory
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
