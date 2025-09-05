"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Warehouse, Thermometer, Package, TrendingUp, AlertTriangle, Clock, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function StorageDashboard() {
  // Mock data - in real app this would come from API
    type Stats = {
    totalCapacity: number;
    currentOccupancy: number;
    activeUnits: number;
    pendingOffers: number;
    avgTemperature: number;
    alertsCount: number;
  };

  type StorageUnit = {
  id: string;
  product: string;
  capacity: number;
  occupied: number;
  temp: number;
  targetTemp: number;
  status: string;
};

  type PendingOffer = {
    id: string;
    farmer: string;
    product: string;
    quantity: number;
    unit: string;
    price: number;
    submitted: string;
  }

  type RecentDeliveries = {
    id: string;
    buyer: string;
    product: string;
    quantity: number;
    status: string;
    time: string;

  }

  const [stats, setStats] = useState<Stats | null>(null);
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);
  const [pendingOffers, setPendingOffers] = useState<PendingOffer[]>([]);
  const [recentDeliveries, setRecentDeliveries] = useState<RecentDeliveries[]>([]);
  const fetchData = async <T,>(url: string): Promise<T> => {
    const response = await axios.get<T>(url);
    return response.data;
  };

  useEffect(() => {
    (async () => {
      try {
        const [statsData, unitsData, offersData, deliveriesData] = await Promise.all([
          fetchData<Stats>("http://127.0.0.1:8000/storage/dashboard/stats"),
          fetchData<StorageUnit[]>("http://127.0.0.1:8000/storage/dashboard/units"),
          fetchData<PendingOffer[]>("http://127.0.0.1:8000/storage/dashboard/offers"),
          fetchData<RecentDeliveries[]>("http://127.0.0.1:8000/storage/dashboard/deliveries"),
        ]);
        setStats(statsData);
        setStorageUnits(unitsData);
        setPendingOffers(offersData);
        setRecentDeliveries(deliveriesData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    })();
}, []);

  const occupancyPercentage = ((stats?.currentOccupancy ?? 0) / (stats?.totalCapacity ?? 1)) * 100;

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
                {stats?.currentOccupancy}/{stats?.totalCapacity} kg
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
              <div className="text-2xl font-bold text-primary">{stats?.activeUnits}</div>
              <p className="text-xs text-muted-foreground">Storage units in use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats?.avgTemperature}°C</div>
              <p className="text-xs text-muted-foreground">Across all units</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats?.alertsCount}</div>
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
                {storageUnits?.map((unit) => (
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
              <Badge variant="outline">{stats?.pendingOffers} pending</Badge>
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
