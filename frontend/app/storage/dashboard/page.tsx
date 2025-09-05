import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Warehouse, Thermometer, Package, TrendingUp, AlertTriangle, Clock, CheckCircle } from "lucide-react"

export default function StorageDashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    totalCapacity: 10000,
    currentOccupancy: 7500,
    activeUnits: 12,
    pendingOffers: 8,
    avgTemperature: 3.8,
    alertsCount: 3,
  }

  const storageUnits = [
    {
      id: "A-1",
      product: "Organic Tomatoes",
      capacity: 1000,
      occupied: 500,
      temp: 4.1,
      targetTemp: 4.0,
      status: "optimal",
    },
    {
      id: "A-2",
      product: "Fresh Lettuce",
      capacity: 800,
      occupied: 200,
      temp: 6.2,
      targetTemp: 3.5,
      status: "warning",
    },
    {
      id: "B-1",
      product: "Bell Peppers",
      capacity: 1200,
      occupied: 300,
      temp: 4.5,
      targetTemp: 4.0,
      status: "optimal",
    },
    {
      id: "B-2",
      product: "Baby Carrots",
      capacity: 900,
      occupied: 150,
      temp: 8.1,
      targetTemp: 2.0,
      status: "critical",
    },
  ]

  const pendingOffers = [
    {
      id: 1,
      farmer: "Juan Dela Cruz",
      product: "Organic Cabbage",
      quantity: 400,
      unit: "kg",
      price: 2400,
      submitted: "2 hours ago",
    },
    {
      id: 2,
      farmer: "Maria Santos",
      product: "Sweet Corn",
      quantity: 600,
      unit: "kg",
      price: 3000,
      submitted: "4 hours ago",
    },
    {
      id: 3,
      farmer: "Pedro Garcia",
      product: "Green Beans",
      quantity: 250,
      unit: "kg",
      price: 1750,
      submitted: "6 hours ago",
    },
  ]

  const recentDeliveries = [
    { id: 1, buyer: "Metro Market", product: "Organic Tomatoes", quantity: 200, status: "completed", time: "10:30 AM" },
    { id: 2, buyer: "Fresh Mart", product: "Fresh Lettuce", quantity: 150, status: "in-transit", time: "2:00 PM" },
    { id: 3, buyer: "City Grocers", product: "Bell Peppers", quantity: 100, status: "scheduled", time: "4:30 PM" },
  ]

  const occupancyPercentage = (stats.currentOccupancy / stats.totalCapacity) * 100

  return (
    <DashboardLayout userRole="storage" title="Storage House Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Capacity</CardTitle>
              <Warehouse className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{occupancyPercentage.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.currentOccupancy}/{stats.totalCapacity} kg
              </p>
              <Progress value={occupancyPercentage} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Units</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.activeUnits}</div>
              <p className="text-xs text-muted-foreground">Storage units in use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.avgTemperature}°C</div>
              <p className="text-xs text-muted-foreground">Across all units</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.alertsCount}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Storage Units Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Storage Units Status</CardTitle>
              <CardDescription>Current temperature and occupancy levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storageUnits.map((unit) => (
                  <div key={unit.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-card-foreground">Unit {unit.id}</p>
                        <Badge
                          variant={
                            unit.status === "optimal"
                              ? "secondary"
                              : unit.status === "warning"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {unit.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{unit.product}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          {unit.occupied}/{unit.capacity} kg
                        </span>
                        <span className="text-muted-foreground">
                          <Thermometer className="h-3 w-3 inline mr-1" />
                          {unit.temp}°C
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={(unit.occupied / unit.capacity) * 100} className="w-20 h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {((unit.occupied / unit.capacity) * 100).toFixed(0)}% full
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Offers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Offers</CardTitle>
                <CardDescription>Farmer submissions awaiting approval</CardDescription>
              </div>
              <Badge variant="outline">{stats.pendingOffers} pending</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{offer.product}</p>
                      <p className="text-sm text-muted-foreground">by {offer.farmer}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          {offer.quantity} {offer.unit}
                        </span>
                        <span className="text-primary font-medium">₱{offer.price}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="text-xs">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Deliveries</CardTitle>
            <CardDescription>Scheduled and completed deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      {delivery.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : delivery.status === "in-transit" ? (
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{delivery.product}</p>
                      <p className="text-sm text-muted-foreground">
                        {delivery.buyer} • {delivery.quantity} kg
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        delivery.status === "completed"
                          ? "secondary"
                          : delivery.status === "in-transit"
                            ? "default"
                            : "outline"
                      }
                    >
                      {delivery.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{delivery.time}</p>
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
