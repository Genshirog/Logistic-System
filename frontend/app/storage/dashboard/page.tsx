"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Warehouse, Users, Package, TrendingUp, AlertTriangle, Clock, CheckCircle, MapPin, DollarSign, Thermometer } from "lucide-react"

export default function StorageDashboard() {
  // Mock data for group storage archetype
  type GroupStats = {
    activeGroups: number;
    totalFarmers: number;
    totalCapacity: number;
    currentOccupancy: number;
    avgTemperature: number;
    alertsCount: number;
  };

  type StorageGroup = {
    id: string;
    name: string;
    farmers: Array<{
      id: string;
      name: string;
      location: string;
      produceTypes: string[];
    }>;
    combinedProduce: string[];
    facility: string;
    location: string;
    totalCapacity: number;
    occupied: number;
    costPerCubicMeter: number;
    costSplit: Array<{
      farmerId: string;
      farmerName: string;
      share: number;
      amount: number;
    }>;
    temperature: {
      current: number;
      target: number;
      status: string;
    };
    status: string;
    createdAt: string;
  };

  type GroupOffer = {
    id: string;
    groupName: string;
    farmers: string[];
    combinedProduce: string[];
    totalQuantity: number;
    unit: string;
    groupPrice: number;
    submitted: string;
    status: string;
  };

  const groupStats: GroupStats = {
    activeGroups: 8,
    totalFarmers: 24,
    totalCapacity: 1200,
    currentOccupancy: 850,
    avgTemperature: 3.2,
    alertsCount: 1,
  };

  const storageGroups: StorageGroup[] = [
    {
      id: "SG-001",
      name: "Vegetable Storage Group A",
      farmers: [
        { id: "F001", name: "Maria Santos", location: "Laguna", produceTypes: ["Tomatoes", "Lettuce"] },
        { id: "F002", name: "Carlos Mendoza", location: "Quezon", produceTypes: ["Carrots", "Broccoli"] },
        { id: "F003", name: "Elena Garcia", location: "Rizal", produceTypes: ["Bell Peppers", "Cabbage"] },
      ],
      combinedProduce: ["Tomatoes", "Lettuce", "Carrots", "Broccoli", "Bell Peppers", "Cabbage"],
      facility: "Cold Storage Facility North",
      location: "Quezon City",
      totalCapacity: 200,
      occupied: 180,
      costPerCubicMeter: 45.00,
      costSplit: [
        { farmerId: "F001", farmerName: "Maria Santos", share: 40, amount: 360 },
        { farmerId: "F002", farmerName: "Carlos Mendoza", share: 35, amount: 315 },
        { farmerId: "F003", farmerName: "Elena Garcia", share: 25, amount: 225 },
      ],
      temperature: { current: 3.8, target: 4.0, status: "optimal" },
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "SG-002",
      name: "Fruit Storage Group B",
      farmers: [
        { id: "F004", name: "Juan Dela Cruz", location: "Cavite", produceTypes: ["Mangoes", "Bananas"] },
        { id: "F005", name: "Ana Rodriguez", location: "Batangas", produceTypes: ["Papayas", "Pineapples"] },
      ],
      combinedProduce: ["Mangoes", "Bananas", "Papayas", "Pineapples"],
      facility: "Premium Cold Storage South",
      location: "Makati City",
      totalCapacity: 150,
      occupied: 120,
      costPerCubicMeter: 50.00,
      costSplit: [
        { farmerId: "F004", farmerName: "Juan Dela Cruz", share: 60, amount: 360 },
        { farmerId: "F005", farmerName: "Ana Rodriguez", share: 40, amount: 240 },
      ],
      temperature: { current: 4.2, target: 5.0, status: "optimal" },
      status: "active",
      createdAt: "2024-01-12",
    },
    {
      id: "SG-003",
      name: "Herb Storage Group C",
      farmers: [
        { id: "F006", name: "Michael Torres", location: "Bulacan", produceTypes: ["Basil", "Oregano"] },
      ],
      combinedProduce: ["Basil", "Oregano", "Thyme", "Rosemary"],
      facility: "Specialized Storage East",
      location: "Pasig City",
      totalCapacity: 80,
      occupied: 65,
      costPerCubicMeter: 55.00,
      costSplit: [
        { farmerId: "F006", farmerName: "Michael Torres", share: 100, amount: 275 },
      ],
      temperature: { current: 2.1, target: 2.0, status: "optimal" },
      status: "active",
      createdAt: "2024-01-10",
    },
  ];

  const groupOffers: GroupOffer[] = [
    {
      id: "GO-001",
      groupName: "Mixed Vegetable Group",
      farmers: ["Maria Santos", "Carlos Mendoza"],
      combinedProduce: ["Tomatoes", "Lettuce", "Carrots"],
      totalQuantity: 500,
      unit: "kg",
      groupPrice: 2500,
      submitted: "2024-01-20",
      status: "pending",
    },
    {
      id: "GO-002",
      groupName: "Tropical Fruits Group",
      farmers: ["Juan Dela Cruz", "Ana Rodriguez"],
      combinedProduce: ["Mangoes", "Papayas"],
      totalQuantity: 300,
      unit: "kg",
      groupPrice: 1800,
      submitted: "2024-01-19",
      status: "pending",
    },
  ];

  const occupancyPercentage = (groupStats.currentOccupancy / groupStats.totalCapacity) * 100;

  return (
    <DashboardLayout userRole="storage" title="Group Storage Dashboard">
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
              <div className="text-3xl font-bold text-foreground mb-1">{groupStats.activeGroups}</div>
              <p className="text-sm text-muted-foreground">Storage groups</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Total Farmers</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{groupStats.totalFarmers}</div>
              <p className="text-sm text-muted-foreground">Collaborating farmers</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Storage Capacity</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Warehouse className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{occupancyPercentage.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">
                {groupStats.currentOccupancy}/{groupStats.totalCapacity} kg
              </p>
              <Progress value={occupancyPercentage} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Avg Temperature</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Thermometer className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{groupStats.avgTemperature}°C</div>
              <p className="text-sm text-muted-foreground">Across all groups</p>
            </CardContent>
          </Card>
        </div>

        {/* Storage Groups Overview */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Active Storage Groups</CardTitle>
            <CardDescription className="text-base">Collaborative storage groups and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {storageGroups.map((group) => (
                <div key={group.id} className="group p-6 border border-border rounded-xl hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-card/50 to-card/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-card-foreground mb-2">{group.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4" />
                        {group.facility} • {group.location}
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="rounded-full">
                          {group.farmers.length} farmers
                        </Badge>
                        <Badge variant={group.status === "active" ? "default" : "outline"} className="rounded-full">
                          {group.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          ₱{group.costPerCubicMeter}/m³
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        {((group.occupied / group.totalCapacity) * 100).toFixed(0)}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {group.occupied}/{group.totalCapacity} kg
                      </p>
                      <Progress value={(group.occupied / group.totalCapacity) * 100} className="w-24 h-2 mt-2" />
                    </div>
                  </div>

                  {/* Farmers in Group */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Farmers in Group:</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.farmers.map((farmer) => (
                        <div key={farmer.id} className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{farmer.name.charAt(0)}</span>
                          </div>
                          <span className="text-sm font-medium">{farmer.name}</span>
                          <span className="text-xs text-muted-foreground">({farmer.location})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Combined Produce */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Combined Produce:</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.combinedProduce.map((produce, index) => (
                        <Badge key={index} variant="outline" className="rounded-full">
                          {produce}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Cost Split */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Cost Split:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {group.costSplit.map((split) => (
                        <div key={split.farmerId} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                          <span className="text-sm font-medium">{split.farmerName}</span>
                          <div className="text-right">
                            <div className="text-sm font-bold text-foreground">₱{split.amount}</div>
                            <div className="text-xs text-muted-foreground">{split.share}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Temperature Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Temperature:</span>
                      <span className="text-sm font-medium">{group.temperature.current}°C</span>
                      <span className="text-xs text-muted-foreground">(target: {group.temperature.target}°C)</span>
                    </div>
                    <Badge variant={group.temperature.status === "optimal" ? "secondary" : "destructive"} className="rounded-full">
                      {group.temperature.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Group Offers */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Group Offers</CardTitle>
            <CardDescription className="text-base">Collaborative offers from farmer groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupOffers.map((offer) => (
                <div key={offer.id} className="group p-4 border border-border rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-r from-card/50 to-card/30">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-bold text-card-foreground">{offer.groupName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Farmers: {offer.farmers.join(", ")}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {offer.combinedProduce.map((produce, index) => (
                          <Badge key={index} variant="outline" className="rounded-full">
                            {produce}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-muted-foreground">
                          Quantity: {offer.totalQuantity} {offer.unit}
                        </span>
                        <span className="text-primary font-bold text-lg">
                          ₱{offer.groupPrice}
                        </span>
                        <span className="text-muted-foreground">
                          Submitted: {new Date(offer.submitted).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Badge variant={offer.status === "pending" ? "outline" : "default"} className="rounded-full">
                        {offer.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          Accept Group
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white">
                          Decline
                        </Button>
                      </div>
                    </div>
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
