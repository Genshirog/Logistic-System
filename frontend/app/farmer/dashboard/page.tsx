"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"
import { Thermometer, Package, TrendingUp, AlertTriangle, Plus } from "lucide-react"

export default function FarmerDashboard() {
  const { t } = useLanguage()

  // Mock data - in real app this would come from API
  const stats = {
    activeOffers: 12,
    totalRevenue: 45600,
    avgTemperature: 4.2,
    alertsCount: 2,
  }

  const recentOffers = [
    { id: 1, product: t.products.organicTomatoes, quantity: "500 kg", status: "active", price: 2500, temperature: 4.1 },
    { id: 2, product: t.products.freshLettuce, quantity: "200 kg", status: "accepted", price: 1200, temperature: 3.8 },
    { id: 3, product: t.products.bellPeppers, quantity: "300 kg", status: "pending", price: 1800, temperature: 4.5 },
  ]

  const temperatureAlerts = [
    { id: 1, product: t.products.organicTomatoes, currentTemp: 6.2, targetTemp: 4.0, severity: "high" },
    { id: 2, product: t.products.freshLettuce, currentTemp: 5.1, targetTemp: 3.5, severity: "medium" },
  ]

  return (
    <DashboardLayout userRole="farmer" title={`${t.roles.farmer} ${t.common.dashboard}`}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.activeOffers}</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.activeOffers}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.totalRevenue}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₱{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.avgTemperature}</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.avgTemperature}°C</div>
              <p className="text-xs text-muted-foreground">{t.temperature.optimal} range</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.temperatureAlerts}</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.alertsCount}</div>
              <p className="text-xs text-muted-foreground">{t.temperature.attentionNeeded}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Offers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t.dashboard.recentOffers}</CardTitle>
                <CardDescription>Your latest produce submissions</CardDescription>
              </div>
              <Button size="sm" asChild>
                <a href="/farmer/offers/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Offer
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{offer.product}</p>
                      <p className="text-sm text-muted-foreground">{offer.quantity}</p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            offer.status === "active"
                              ? "default"
                              : offer.status === "accepted"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {t.orders[offer.status as keyof typeof t.orders]}
                        </Badge>
                        <span className="text-sm text-muted-foreground">₱{offer.price}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Thermometer className="h-3 w-3 mr-1" />
                        {offer.temperature}°C
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Temperature Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>{t.dashboard.temperatureAlerts}</CardTitle>
              <CardDescription>Products requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {temperatureAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-card-foreground">{alert.product}</p>
                      <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                        {alert.severity === "high" ? t.notifications.highPriority : t.notifications.mediumPriority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t.temperature.currentTemp}: {alert.currentTemp}°C
                        </span>
                        <span className="text-muted-foreground">Target: {alert.targetTemp}°C</span>
                      </div>
                      <Progress value={Math.min(100, (alert.currentTemp / alert.targetTemp) * 100)} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
