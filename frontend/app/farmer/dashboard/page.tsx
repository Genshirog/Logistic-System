"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"
import { Thermometer, Package, TrendingUp, AlertTriangle, Plus, Users, DollarSign, MapPin, Calendar } from "lucide-react"

export default function FarmerDashboard() {
  const { t } = useLanguage()

  // Mock data - in real app this would come from API
  const stats = {
    activeGroups: 3,
    totalSavings: 12500,
    storagePartners: 8,
    sharedCosts: 4500,
    avgTemperature: 4.2,
    alertsCount: 2,
  }

  const recentGroups = [
    { 
      id: 1, 
      name: "Vegetable Storage Group A", 
      facility: "Cold Storage Facility North", 
      location: "Quezon City",
      partners: 4,
      yourShare: 375,
      savings: 125,
      status: "active",
      nextPayment: "2024-02-15"
    },
    { 
      id: 2, 
      name: "Fruit Storage Group B", 
      facility: "Premium Cold Storage South", 
      location: "Makati City",
      partners: 3,
      yourShare: 300,
      savings: 100,
      status: "active",
      nextPayment: "2024-02-20"
    },
    { 
      id: 3, 
      name: "Herb Storage Group C", 
      facility: "Specialized Storage East", 
      location: "Pasig City",
      partners: 2,
      yourShare: 200,
      savings: 50,
      status: "pending",
      nextPayment: "2024-02-25"
    },
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
              <CardTitle className="text-sm font-medium">{t.dashboard.activeGroups}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.activeGroups}</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.totalSavings}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₱{stats.totalSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.storagePartners}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.storagePartners}</div>
              <p className="text-xs text-muted-foreground">Across all groups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.sharedCosts}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₱{stats.sharedCosts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access key features quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button asChild className="h-auto p-4 flex flex-col items-center space-y-2">
                <a href="/farmer/group-storage">
                  <Users className="h-6 w-6" />
                  <span>Group Storage</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <a href="/farmer/matching">
                  <Plus className="h-6 w-6" />
                  <span>Find Partners</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <a href="/farmer/offers/new">
                  <Package className="h-6 w-6" />
                  <span>New Offer</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Group Storage Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t.dashboard.groupStorage}</CardTitle>
                <CardDescription>Your storage partnerships and shared costs</CardDescription>
              </div>
              <Button size="sm" asChild>
                <a href="/farmer/group-storage">
                  <Users className="h-4 w-4 mr-2" />
                  View All
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{group.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {group.facility} • {group.location}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            group.status === "active"
                              ? "default"
                              : group.status === "pending"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{group.partners} partners</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">₱{group.yourShare}/month</div>
                      <div className="text-xs text-green-600">Saves ₱{group.savings}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {group.nextPayment}
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
