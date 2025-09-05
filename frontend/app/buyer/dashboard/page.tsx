import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, TrendingUp, Clock, CheckCircle, Truck } from "lucide-react"

export default function BuyerDashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    activeOrders: 8,
    totalSpent: 125400,
    pendingDeliveries: 3,
    completedOrders: 45,
  }

  const recentOrders = [
    {
      id: 1,
      product: "Organic Tomatoes",
      farmer: "Juan Dela Cruz",
      quantity: 200,
      unit: "kg",
      price: 1000,
      status: "delivered",
      orderDate: "2024-01-18",
      deliveryDate: "2024-01-19",
    },
    {
      id: 2,
      product: "Fresh Lettuce",
      farmer: "Maria Santos",
      quantity: 150,
      unit: "kg",
      price: 900,
      status: "in-transit",
      orderDate: "2024-01-17",
      deliveryDate: "2024-01-20",
    },
    {
      id: 3,
      product: "Bell Peppers",
      farmer: "Pedro Garcia",
      quantity: 100,
      unit: "kg",
      price: 600,
      status: "processing",
      orderDate: "2024-01-19",
      deliveryDate: "2024-01-21",
    },
  ]

  const availableProducts = [
    {
      id: 1,
      product: "Organic Cabbage",
      farmer: "Ana Rodriguez",
      quantity: 400,
      unit: "kg",
      pricePerKg: 6.0,
      totalPrice: 2400,
      quality: "excellent",
      temperature: 3.8,
      expiryDays: 8,
    },
    {
      id: 2,
      product: "Sweet Corn",
      farmer: "Carlos Santos",
      quantity: 600,
      unit: "kg",
      pricePerKg: 5.0,
      totalPrice: 3000,
      quality: "good",
      temperature: 4.2,
      expiryDays: 12,
    },
    {
      id: 3,
      product: "Green Beans",
      farmer: "Lisa Garcia",
      quantity: 250,
      unit: "kg",
      pricePerKg: 7.0,
      totalPrice: 1750,
      quality: "excellent",
      temperature: 4.0,
      expiryDays: 6,
    },
  ]

  const upcomingDeliveries = [
    { id: 1, product: "Fresh Lettuce", quantity: 150, time: "10:30 AM", date: "Today", status: "on-time" },
    { id: 2, product: "Bell Peppers", quantity: 100, time: "2:00 PM", date: "Tomorrow", status: "scheduled" },
    { id: 3, product: "Sweet Corn", quantity: 200, time: "11:00 AM", date: "Jan 22", status: "scheduled" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "secondary"
      case "in-transit":
        return "default"
      case "processing":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "secondary"
      case "good":
        return "default"
      case "fair":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout userRole="buyer" title="Buyer Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₱{stats.totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.pendingDeliveries}</div>
              <p className="text-xs text-muted-foreground">Next 3 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.completedOrders}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest purchase activity</CardDescription>
              </div>
              <Button size="sm" asChild>
                <a href="/buyer/orders">View All</a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{order.product}</p>
                      <p className="text-sm text-muted-foreground">by {order.farmer}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {order.quantity} {order.unit} • ₱{order.price}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Ordered: {new Date(order.orderDate).toLocaleDateString()}</p>
                      <p>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Fresh Products Available</CardTitle>
                <CardDescription>New arrivals from local farmers</CardDescription>
              </div>
              <Button size="sm" asChild>
                <a href="/buyer/marketplace">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Browse All
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{product.product}</p>
                      <p className="text-sm text-muted-foreground">by {product.farmer}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getQualityColor(product.quality)}>{product.quality}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {product.quantity} {product.unit} • ₱{product.pricePerKg}/kg
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">₱{product.totalPrice}</p>
                      <Button size="sm" className="mt-1">
                        Reserve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deliveries</CardTitle>
            <CardDescription>Scheduled deliveries for your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      {delivery.status === "on-time" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{delivery.product}</p>
                      <p className="text-sm text-muted-foreground">{delivery.quantity} kg</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-card-foreground">{delivery.time}</p>
                    <p className="text-sm text-muted-foreground">{delivery.date}</p>
                    <Badge variant={delivery.status === "on-time" ? "secondary" : "outline"} className="mt-1">
                      {delivery.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
