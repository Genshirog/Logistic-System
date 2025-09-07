"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"
import { TrendingUp, Users, DollarSign, MapPin, Calendar, Heart } from "lucide-react"

export default function FarmerDashboard() {
  const { t } = useLanguage()

  // Mock data - in real app this would come from API
  const stats = {
    activeGroups: 3,
    totalSavings: 12500,
    storagePartners: 8,
    sharedCosts: 4500,
    connections: 12,
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

  const recentConnections = [
    { id: 1, name: "Maria Santos", location: "Laguna, Philippines", compatibility: 85, joinedAt: "2024-01-15" },
    { id: 2, name: "Juan Dela Cruz", location: "Cavite, Philippines", compatibility: 72, joinedAt: "2024-01-12" },
    { id: 3, name: "Ana Rodriguez", location: "Batangas, Philippines", compatibility: 68, joinedAt: "2024-01-10" },
  ]

  return (
    <DashboardLayout userRole="farmer" title={`${t.roles.farmer} ${t.common.dashboard}`}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Active Groups</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{stats.activeGroups}</div>
              <p className="text-sm text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Total Savings</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">₱{stats.totalSavings.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Connections</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{stats.connections}</div>
              <p className="text-sm text-muted-foreground">Farmer partners</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Shared Costs</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">₱{stats.sharedCosts.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            <CardDescription className="text-base">Access key features quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Button asChild className="h-20 p-4 flex flex-col items-center space-y-3 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group">
                <a href="/farmer/group-storage">
                  <Users className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">Group Storage</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-20 p-4 flex flex-col items-center space-y-3 border-2 hover:bg-gradient-to-br hover:from-pink-500 hover:to-pink-600 hover:text-white hover:border-pink-500 transition-all duration-300 group">
                <a href="/farmer/matching">
                  <Heart className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">Find Partners</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Group Storage Overview */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-bold">{t.dashboard.groupStorage}</CardTitle>
                <CardDescription className="text-base">Your storage partnerships and shared costs</CardDescription>
              </div>
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                <a href="/farmer/group-storage">
                  <Users className="h-4 w-4 mr-2" />
                  View All
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGroups.map((group) => (
                  <div key={group.id} className="group flex items-center justify-between p-4 border border-border rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-r from-card/50 to-card/30">
                    <div className="space-y-2">
                      <p className="font-semibold text-card-foreground">{group.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
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
                          className="rounded-full"
                        >
                          {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{group.partners} partners</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">₱{group.yourShare}/month</div>
                      <div className="text-sm text-green-600 font-medium">Saves ₱{group.savings}</div>
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

          {/* Recent Connections */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-bold">Recent Connections</CardTitle>
                <CardDescription className="text-base">Your latest farmer partnerships</CardDescription>
              </div>
              <Button size="sm" asChild className="bg-pink-500 hover:bg-pink-600 text-white shadow-lg">
                <a href="/farmer/matching">
                  <Heart className="h-4 w-4 mr-2" />
                  View All
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentConnections.map((connection) => (
                  <div key={connection.id} className="group flex items-center justify-between p-4 border border-border rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-r from-card/50 to-card/30">
                    <div className="space-y-2">
                      <p className="font-semibold text-card-foreground">{connection.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {connection.location}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="rounded-full">
                          {connection.compatibility}% match
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Joined {new Date(connection.joinedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white transition-all duration-300">
                      <Heart className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
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
