import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Settings, AlertTriangle, TrendingUp, TrendingDown, RefreshCw, Power } from "lucide-react"

export default function TemperatureControl() {
  // Mock data - in real app this would come from real-time sensors and controls
  // TODO: Subscribe to WebSocket/Server-Sent Events for real-time telemetry (e.g., ws://.../storage/units)
  // TODO: On control updates, call POST /api/storage/units/:id/target { targetTemp, targetHumidity }
  const temperatureUnits = [
    {
      id: "A-1",
      name: "Cold Storage Unit A-1",
      product: "Organic Tomatoes",
      currentTemp: 4.1,
      targetTemp: 4.0,
      targetRange: "2-4°C",
      status: "optimal",
      powerStatus: "on",
      humidity: 85,
      targetHumidity: 90,
      lastMaintenance: "2024-01-10",
      trend: "stable",
      alerts: [],
    },
    {
      id: "A-2",
      name: "Cold Storage Unit A-2",
      product: "Fresh Lettuce",
      currentTemp: 6.2,
      targetTemp: 3.5,
      targetRange: "1-3°C",
      status: "warning",
      powerStatus: "on",
      humidity: 78,
      targetHumidity: 95,
      lastMaintenance: "2024-01-08",
      trend: "rising",
      alerts: ["Temperature above target", "Humidity below optimal"],
    },
    {
      id: "B-1",
      name: "Cold Storage Unit B-1",
      product: "Bell Peppers",
      currentTemp: 4.5,
      targetTemp: 4.0,
      targetRange: "3-5°C",
      status: "optimal",
      powerStatus: "on",
      humidity: 88,
      targetHumidity: 85,
      lastMaintenance: "2024-01-12",
      trend: "falling",
      alerts: [],
    },
    {
      id: "B-2",
      name: "Cold Storage Unit B-2",
      product: "Baby Carrots",
      currentTemp: 8.1,
      targetTemp: 2.0,
      targetRange: "0-2°C",
      status: "critical",
      powerStatus: "on",
      humidity: 65,
      targetHumidity: 98,
      lastMaintenance: "2024-01-05",
      trend: "rising",
      alerts: ["Critical temperature deviation", "Cooling system malfunction", "Humidity critically low"],
    },
  ]

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "rising":
        return <TrendingUp className="h-3 w-3 text-red-500" />
      case "falling":
        return <TrendingDown className="h-3 w-3 text-blue-500" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }

  const getTemperatureProgress = (current: number, target: number) => {
    const deviation = Math.abs(current - target)
    const maxDeviation = 3
    return Math.max(0, Math.min(100, ((maxDeviation - deviation) / maxDeviation) * 100))
  }

  return (
    <DashboardLayout userRole="storage" title="Temperature Control">
      <div className="space-y-6">
        {/* Header with Controls */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Temperature Control Center</h2>
            <p className="text-sm text-muted-foreground">Monitor and control storage unit temperatures</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh All
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Global Settings
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <Thermometer className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Optimal</p>
                  <p className="text-2xl font-bold text-green-600">
                    {temperatureUnits.filter((unit) => unit.status === "optimal").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Warning</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {temperatureUnits.filter((unit) => unit.status === "warning").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Critical</p>
                  <p className="text-2xl font-bold text-red-600">
                    {temperatureUnits.filter((unit) => unit.status === "critical").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Power className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Active Units</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {temperatureUnits.filter((unit) => unit.powerStatus === "on").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Temperature Control Units */}
        <div className="grid gap-6 lg:grid-cols-2">
          {temperatureUnits.map((unit) => (
            <Card
              key={unit.id}
              className={`${unit.status === "critical" ? "border-destructive" : unit.status === "warning" ? "border-yellow-500" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Thermometer className="h-5 w-5" />
                      {unit.name}
                    </CardTitle>
                    <CardDescription>{unit.product}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(unit.status)}>{unit.status}</Badge>
                    {getTrendIcon(unit.trend)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Temperature Display and Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Temperature</p>
                    <p className="text-3xl font-bold text-primary">{unit.currentTemp}°C</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target Range</p>
                    <p className="text-lg font-semibold">{unit.targetRange}</p>
                  </div>
                </div>

                {/* Temperature Control */}
                <div className="space-y-2">
                  <Label htmlFor={`target-temp-${unit.id}`}>Target Temperature</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`target-temp-${unit.id}`}
                      type="number"
                      step="0.1"
                      value={unit.targetTemp}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Update
                    </Button>
                  </div>
                  {/* TODO: Wire the Update button to call backend and optimistically update UI; disable while saving */}
                </div>

                {/* Temperature Status Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Temperature Status</span>
                    <span className="font-medium">
                      {unit.currentTemp > unit.targetTemp + 1
                        ? "Above target"
                        : unit.currentTemp < unit.targetTemp - 1
                          ? "Below target"
                          : "Within range"}
                    </span>
                  </div>
                  <Progress value={getTemperatureProgress(unit.currentTemp, unit.targetTemp)} className="h-2" />
                </div>

                {/* Humidity Control */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Humidity</p>
                    <p className="font-medium">{unit.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target Humidity</p>
                    <p className="font-medium">{unit.targetHumidity}%</p>
                  </div>
                </div>

                {/* System Status */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Power className={`h-3 w-3 ${unit.powerStatus === "on" ? "text-green-600" : "text-red-600"}`} />
                    <span className="text-muted-foreground">
                      Power: <span className="font-medium capitalize">{unit.powerStatus}</span>
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Last maintenance: {new Date(unit.lastMaintenance).toLocaleDateString()}
                  </span>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      unit.powerStatus === "on"
                        ? "text-red-600 hover:text-red-700"
                        : "text-green-600 hover:text-green-700"
                    }
                  >
                    <Power className="h-3 w-3" />
                  </Button>
                </div>
                {/* TODO: Implement Power toggle via POST /api/storage/units/:id/power { powerStatus } with confirmation dialog */}

                {/* Alerts */}
                {unit.alerts.length > 0 && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-card-foreground mb-2">Active Alerts</p>
                    <div className="space-y-1">
                      {unit.alerts.map((alert, index) => (
                        <p key={index} className="text-sm text-muted-foreground flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-2 text-red-500" />
                          {alert}
                        </p>
                      ))}
                    </div>
                    {/* TODO: Add actions to acknowledge/resolve alerts and create maintenance tickets */}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
