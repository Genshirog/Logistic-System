"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Plus, Thermometer, Calendar, Package, AlertTriangle } from "lucide-react"
import { useEffect,useState } from "react"
import axios from "axios"

export default function StorageInventory() {
  // Mock data - in real app this would come from API
  // TODO: Replace mock with GET /api/storage/inventory?search=&status=&page= using SWR/React Query
  // TODO: Implement server-side filtering, pagination, and sorting
  type Inventory = {
    id: string;
    product: string;
    farmer: string;
    unit: string;
    quantity: number;
    capacity: number;
    pricePerKg: number;
    totalValue: number;
    currentTemp: number;
    targetTemp: number;
    targetRange: string;
    status: string;
    dateReceived: string;
    expiryDate: string;
    condition: string;
  }

  const fetchData = async <T,>(url: string): Promise<T> => {
    const response = await axios.get<T>(url);
    return response.data;
  };

  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [inventoryData] = await Promise.all([
          fetchData<Inventory[]>("http://127.0.0.1:8000/storage/inventory/inventories"),
        ]);
        setInventory(inventoryData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    })();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "secondary"
      case "warning":
        return "default"
      case "critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "secondary"
      case "good":
        return "default"
      case "fair":
        return "outline"
      case "poor":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <DashboardLayout userRole="storage" title="Inventory Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search inventory..." className="pl-10" aria-label="Search inventory" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Manual Entry
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Items</p>
                  <p className="text-2xl font-bold text-primary">{inventory.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Optimal Temp</p>
                  <p className="text-2xl font-bold text-green-600">
                    {inventory.filter((item) => item.status === "optimal").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {inventory.filter((item) => item.status === "warning").length}
                  </p>
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
                  <p className="text-2xl font-bold text-red-600">
                    {inventory.filter((item) => item.status === "critical").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {inventory.map((item) => {
            const occupancyPercentage = (item.quantity / item.capacity) * 100
            const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate)

            return (
              <Card
                key={item.id}
                className={`${item.status === "critical" ? "border-destructive" : item.status === "warning" ? "border-yellow-500" : ""}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.product}</CardTitle>
                      <CardDescription>
                        Unit {item.unit} • by {item.farmer}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                      <Badge variant={getConditionColor(item.condition)} className="text-xs">
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quantity and Capacity */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Storage Capacity</span>
                      <span className="font-medium">
                        {item.quantity}/{item.capacity} kg ({occupancyPercentage.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={occupancyPercentage} className="h-2" />
                  </div>

                  {/* Temperature */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Temp</p>
                      <p className="font-medium flex items-center">
                        <Thermometer className="h-3 w-3 mr-1" />
                        {item.currentTemp}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Target Range</p>
                      <p className="font-medium">{item.targetRange}</p>
                    </div>
                  </div>

                  {/* Dates and Value */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Value</p>
                      <p className="font-medium text-primary">₱{item.totalValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expires In</p>
                      <p
                        className={`font-medium ${daysUntilExpiry <= 3 ? "text-red-600" : daysUntilExpiry <= 7 ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {daysUntilExpiry} days
                      </p>
                    </div>
                  </div>

                  {/* Received Date */}
                  <div className="text-sm">
                    <p className="text-muted-foreground">Received</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.dateReceived).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" aria-label={`View details for ${item.product}`}>
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" aria-label={`Update status for ${item.product}`}>
                      Update Status
                    </Button>
                  </div>

                  {/* Alert Messages */}
                  {item.status !== "optimal" && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium text-card-foreground">
                        {item.status === "critical" ? "Critical Alert" : "Temperature Warning"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.status === "critical"
                          ? "Temperature is critically outside safe range. Immediate action required."
                          : "Temperature is approaching unsafe levels. Monitor closely."}
                      </p>
                      {/* TODO: Integrate actions: acknowledge alert (POST /api/alerts/:id/ack), create work order */}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
