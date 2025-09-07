"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"
import { Users, MapPin, Thermometer, DollarSign, Calendar, MessageCircle, ExternalLink, Plus, TrendingUp, Package, Clock } from "lucide-react"

export default function GroupStoragePage() {
  const { t } = useLanguage()

  // Mock data - in real app this would come from API
  const groupStats = {
    activeGroups: 3,
    totalSavings: 12500,
    storagePartners: 8,
    sharedCosts: 4500,
  }

  const storageGroups = [
    {
      id: 1,
      name: "Vegetable Storage Group A",
      facility: "Cold Storage Facility North",
      location: "Quezon City, Metro Manila",
      temperature: "2-4°C",
      currentTemp: 3.2,
      status: "active",
      totalCapacity: 1000,
      usedCapacity: 750,
      partners: [
        { id: 1, name: "Maria Santos", produce: "Tomatoes", quantity: "200 kg", contribution: 25 },
        { id: 2, name: "Juan Dela Cruz", produce: "Lettuce", quantity: "150 kg", contribution: 20 },
        { id: 3, name: "Ana Garcia", produce: "Bell Peppers", quantity: "180 kg", contribution: 22 },
        { id: 4, name: "Pedro Reyes", produce: "Carrots", quantity: "220 kg", contribution: 28 },
      ],
      monthlyCost: 1500,
      yourShare: 375,
      savings: 125,
      nextPayment: "2024-02-15",
      establishedDate: "2024-01-01",
    },
    {
      id: 2,
      name: "Fruit Storage Group B",
      facility: "Premium Cold Storage South",
      location: "Makati City, Metro Manila",
      temperature: "4-6°C",
      currentTemp: 5.1,
      status: "active",
      totalCapacity: 800,
      usedCapacity: 600,
      partners: [
        { id: 5, name: "Luis Mendoza", produce: "Mangoes", quantity: "300 kg", contribution: 35 },
        { id: 6, name: "Carmen Lopez", produce: "Bananas", quantity: "250 kg", contribution: 30 },
        { id: 7, name: "Roberto Silva", produce: "Papayas", quantity: "200 kg", contribution: 25 },
      ],
      monthlyCost: 1200,
      yourShare: 300,
      savings: 100,
      nextPayment: "2024-02-20",
      establishedDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Herb Storage Group C",
      facility: "Specialized Storage East",
      location: "Pasig City, Metro Manila",
      temperature: "1-3°C",
      currentTemp: 2.8,
      status: "pending",
      totalCapacity: 500,
      usedCapacity: 0,
      partners: [
        { id: 8, name: "Elena Rodriguez", produce: "Basil", quantity: "50 kg", contribution: 40 },
        { id: 9, name: "Miguel Torres", produce: "Parsley", quantity: "30 kg", contribution: 35 },
      ],
      monthlyCost: 800,
      yourShare: 200,
      savings: 50,
      nextPayment: "2024-02-25",
      establishedDate: "2024-01-20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "outline"
      case "inactive":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getTemperatureStatus = (current: number, target: string) => {
    const [min, max] = target.split("-").map(t => parseFloat(t.replace("°C", "")))
    if (current < min || current > max) return "critical"
    if (current < min + 0.5 || current > max - 0.5) return "warning"
    return "optimal"
  }

  return (
    <DashboardLayout userRole="farmer" title={t.dashboard.groupStorage}>
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.activeGroups}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{groupStats.activeGroups}</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.totalSavings}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱{groupStats.totalSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.storagePartners}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{groupStats.storagePartners}</div>
              <p className="text-xs text-muted-foreground">Across all groups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.dashboard.sharedCosts}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱{groupStats.sharedCosts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Storage Groups</h2>
            <p className="text-muted-foreground">
              Manage your shared storage partnerships and monitor group activities
            </p>
          </div>
          <Button asChild>
            <a href="/farmer/matching">
              <Plus className="h-4 w-4 mr-2" />
              Find New Partners
            </a>
          </Button>
        </div>

        {/* Storage Groups */}
        <div className="grid gap-6">
          {storageGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{group.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {group.facility} • {group.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(group.status)}>
                      {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Storage Details */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Temperature</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{group.currentTemp}°C</span>
                      <Badge 
                        variant={getTemperatureStatus(group.currentTemp, group.temperature) === "optimal" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {group.temperature}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Capacity</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{group.usedCapacity} / {group.totalCapacity} kg</span>
                        <span>{Math.round((group.usedCapacity / group.totalCapacity) * 100)}%</span>
                      </div>
                      <Progress value={(group.usedCapacity / group.totalCapacity) * 100} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Your Share</span>
                    </div>
                    <div className="text-2xl font-bold">₱{group.yourShare}</div>
                    <p className="text-xs text-green-600">Saves ₱{group.savings}/month</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Next Payment</span>
                    </div>
                    <div className="text-sm font-medium">{group.nextPayment}</div>
                    <p className="text-xs text-muted-foreground">Est. {group.establishedDate}</p>
                  </div>
                </div>

                {/* Partners */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Storage Partners ({group.partners.length})
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {group.partners.map((partner) => (
                      <div key={partner.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{partner.name}</p>
                          <p className="text-sm text-muted-foreground">{partner.produce} • {partner.quantity}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {partner.contribution}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Group Chat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for New Users */}
        {storageGroups.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Storage Groups Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by finding farmers with compatible storage needs to form your first group.
              </p>
              <Button asChild>
                <a href="/farmer/matching">
                  <Plus className="h-4 w-4 mr-2" />
                  Find Storage Partners
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
