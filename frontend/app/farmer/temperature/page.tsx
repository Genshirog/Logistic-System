import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Thermometer, AlertTriangle, TrendingDown, TrendingUp, RefreshCw } from "lucide-react"

export default function TemperatureMonitoring() {
  // Mock data - in real app this would come from real-time sensors
  const temperatureData = [
    {
      id: 1,
      product: "Organic Tomatoes",
      currentTemp: 4.1,
      targetTemp: 4.0,
      targetRange: "2-4°C",
      status: "optimal",
      lastUpdated: "2 minutes ago",
      trend: "stable",
      location: "Storage Unit A-1",
    },
    {
      id: 2,
      product: "Fresh Lettuce",
      currentTemp: 6.2,
      targetTemp: 3.5,
      targetRange: "1-3°C",
      status: "warning",
      lastUpdated: "1 minute ago",
      trend: "rising",
      location: "Storage Unit B-2",
    },
    {
      id: 3,
      product: "Bell Peppers",
      currentTemp: 4.5,
      targetTemp: 4.0,
      targetRange: "3-5°C",
      status: "optimal",
      lastUpdated: "3 minutes ago",
      trend: "falling",
      location: "Storage Unit A-3",
    },
    {
      id: 4,
      product: "Baby Carrots",
      currentTemp: 8.1,
      targetTemp: 2.0,
      targetRange: "0-2°C",
      status: "critical",
      lastUpdated: "30 seconds ago",
      trend: "rising",
      location: "Storage Unit C-1",
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <Thermometer className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Thermometer className="h-4 w-4" />
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
    const maxDeviation = 3 // Maximum acceptable deviation
    return Math.max(0, Math.min(100, ((maxDeviation - deviation) / maxDeviation) * 100))
  }

  return (
    <DashboardLayout userRole="farmer" title="Temperature Monitoring">
      <div className="space-y-6">
        {/* Header with Refresh */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Real-time Temperature Monitoring</h2>
            <p className="text-sm text-muted-foreground">Monitor your products' storage conditions</p>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
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
                  <p className="text-2xl font-bold text-green-600">2</p>
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
                  <p className="text-2xl font-bold text-yellow-600">1</p>
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
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Thermometer className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Temp</p>
                  <p className="text-2xl font-bold text-blue-600">5.7°C</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Temperature Monitoring Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {temperatureData.map((item) => (
            <Card
              key={item.id}
              className={`${item.status === "critical" ? "border-destructive" : item.status === "warning" ? "border-yellow-500" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      {item.product}
                    </CardTitle>
                    <CardDescription>{item.location}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                    {getTrendIcon(item.trend)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Temperature</p>
                    <p className="text-2xl font-bold text-primary">{item.currentTemp}°C</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target Range</p>
                    <p className="text-lg font-semibold">{item.targetRange}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Temperature Status</span>
                    <span className="font-medium">
                      {item.currentTemp > item.targetTemp + 1
                        ? "Above target"
                        : item.currentTemp < item.targetTemp - 1
                          ? "Below target"
                          : "Within range"}
                    </span>
                  </div>
                  <Progress value={getTemperatureProgress(item.currentTemp, item.targetTemp)} className="h-2" />
                </div>

                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Last updated: {item.lastUpdated}</span>
                  <span className="capitalize">Trend: {item.trend}</span>
                </div>

                {item.status !== "optimal" && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-card-foreground">
                      {item.status === "critical" ? "Immediate Action Required" : "Attention Needed"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.status === "critical"
                        ? "Temperature is critically outside safe range. Contact storage facility immediately."
                        : "Temperature is approaching unsafe levels. Monitor closely."}
                    </p>
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
