import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Package, Truck, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react"

export default function BuyerOrders() {
  // Mock data - in real app this would come from API
  const orders = [
    {
      id: "ORD-001",
      product: "Organic Tomatoes",
      variety: "Roma",
      farmer: "Juan Dela Cruz",
      quantity: 200,
      unit: "kg",
      pricePerKg: 5.0,
      totalPrice: 1000,
      status: "delivered",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      actualDeliveryDate: "2024-01-18",
      trackingNumber: "TRK-001-2024",
      paymentStatus: "paid",
      rating: 5,
    },
    {
      id: "ORD-002",
      product: "Fresh Lettuce",
      variety: "Iceberg",
      farmer: "Maria Santos",
      quantity: 150,
      unit: "kg",
      pricePerKg: 6.0,
      totalPrice: 900,
      status: "in-transit",
      orderDate: "2024-01-17",
      deliveryDate: "2024-01-20",
      actualDeliveryDate: null,
      trackingNumber: "TRK-002-2024",
      paymentStatus: "paid",
      rating: null,
      estimatedArrival: "2:00 PM",
    },
    {
      id: "ORD-003",
      product: "Bell Peppers",
      variety: "Mixed Colors",
      farmer: "Pedro Garcia",
      quantity: 100,
      unit: "kg",
      pricePerKg: 6.0,
      totalPrice: 600,
      status: "processing",
      orderDate: "2024-01-19",
      deliveryDate: "2024-01-21",
      actualDeliveryDate: null,
      trackingNumber: "TRK-003-2024",
      paymentStatus: "paid",
      rating: null,
    },
    {
      id: "ORD-004",
      product: "Baby Carrots",
      variety: "Sweet Baby",
      farmer: "Ana Rodriguez",
      quantity: 75,
      unit: "kg",
      pricePerKg: 4.5,
      totalPrice: 337.5,
      status: "cancelled",
      orderDate: "2024-01-16",
      deliveryDate: "2024-01-19",
      actualDeliveryDate: null,
      trackingNumber: "TRK-004-2024",
      paymentStatus: "refunded",
      rating: null,
      cancellationReason: "Product quality issues",
    },
    {
      id: "ORD-005",
      product: "Organic Cabbage",
      variety: "Green Cabbage",
      farmer: "Carlos Santos",
      quantity: 200,
      unit: "kg",
      pricePerKg: 3.5,
      totalPrice: 700,
      status: "confirmed",
      orderDate: "2024-01-20",
      deliveryDate: "2024-01-22",
      actualDeliveryDate: null,
      trackingNumber: "TRK-005-2024",
      paymentStatus: "paid",
      rating: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "secondary"
      case "in-transit":
        return "default"
      case "processing":
        return "outline"
      case "confirmed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-transit":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "processing":
        return <Package className="h-4 w-4 text-yellow-600" />
      case "confirmed":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "secondary"
      case "pending":
        return "outline"
      case "refunded":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getDeliveryProgress = (status: string) => {
    switch (status) {
      case "confirmed":
        return 25
      case "processing":
        return 50
      case "in-transit":
        return 75
      case "delivered":
        return 100
      case "cancelled":
        return 0
      default:
        return 0
    }
  }

  return (
    <DashboardLayout userRole="buyer" title="My Orders">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button asChild>
            <a href="/buyer/marketplace">Browse Products</a>
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">
                    {orders.filter((order) => order.status === "delivered").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">In Transit</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {orders.filter((order) => order.status === "in-transit").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Processing</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {orders.filter((order) => order.status === "processing").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">
                    {orders.filter((order) => order.status === "cancelled").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <CardTitle className="text-lg">
                        {order.product} ({order.variety})
                      </CardTitle>
                      <CardDescription>
                        Order #{order.id} • by {order.farmer}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                    <Badge variant={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Details */}
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium">
                      {order.quantity} {order.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price per kg</p>
                    <p className="font-medium">₱{order.pricePerKg}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Price</p>
                    <p className="font-medium text-primary">₱{order.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking</p>
                    <p className="font-medium text-xs">{order.trackingNumber}</p>
                  </div>
                </div>

                {/* Delivery Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Progress</span>
                    <span className="font-medium">{order.status}</span>
                  </div>
                  <Progress value={getDeliveryProgress(order.status)} className="h-2" />
                </div>

                {/* Dates */}
                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Order Date</p>
                    <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expected Delivery</p>
                    <p className="font-medium">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                    {order.estimatedArrival && (
                      <p className="text-xs text-muted-foreground">Est. {order.estimatedArrival}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-muted-foreground">Actual Delivery</p>
                    <p className="font-medium">
                      {order.actualDeliveryDate ? new Date(order.actualDeliveryDate).toLocaleDateString() : "Pending"}
                    </p>
                  </div>
                </div>

                {/* Special Messages */}
                {order.status === "cancelled" && order.cancellationReason && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800">Cancellation Reason</p>
                    <p className="text-sm text-red-600">{order.cancellationReason}</p>
                  </div>
                )}

                {order.status === "in-transit" && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Delivery Update</p>
                    <p className="text-sm text-blue-600">
                      Your order is on the way! Expected arrival: {order.estimatedArrival}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {order.status === "delivered" && !order.rating && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Rate Order
                    </Button>
                  )}
                  {order.status === "in-transit" && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Track Order
                    </Button>
                  )}
                  {(order.status === "confirmed" || order.status === "processing") && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      Cancel Order
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
