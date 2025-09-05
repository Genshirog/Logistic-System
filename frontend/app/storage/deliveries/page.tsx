"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, Truck, Clock, CheckCircle, CalendarIcon, MapPin } from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"

export default function DeliveryScheduling() {
  // Mock data - in real app this would come from API
  type Deliveries = {
    id: string;
    buyer: string;
    product: string;
    quantity: number;
    unit: string;
    status: string
    scheduledDate: string;
    scheduledTime: string;
    address: string;
    driver: string;
    vehicle: string;
    estimatedDuration: string;
    priority: string;
  }

  const [deliveries, setDeliveries] = useState<Deliveries[]>([]);

  const fetchData = async <T,>(url: string): Promise<T> => {
    const response = await axios.get<T>(url);
    return response.data;
  };

  useEffect(() => {
    (async () => {
      try {
        const [deliveryData] = await Promise.all([
          fetchData<Deliveries[]>("http://127.0.0.1:8000/storage/delivery/deliveries"),
        ]);
        setDeliveries(deliveryData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    })();
  }, []);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "secondary"
      case "in-transit":
        return "default"
      case "scheduled":
        return "outline"
      case "pending":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-transit":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout userRole="storage" title="Delivery Scheduling">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search deliveries..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Delivery
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Scheduled</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {deliveries.filter((d) => d.status === "scheduled").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">In Transit</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {deliveries.filter((d) => d.status === "in-transit").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {deliveries.filter((d) => d.status === "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-red-600">
                    {deliveries.filter((d) => d.status === "pending").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deliveries List */}
        <div className="grid gap-4">
          {deliveries.map((delivery) => (
            <Card key={delivery.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(delivery.status)}
                    <div>
                      <CardTitle className="text-lg">{delivery.buyer}</CardTitle>
                      <CardDescription>
                        {delivery.product} • {delivery.quantity} {delivery.unit}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(delivery.status)}>{delivery.status}</Badge>
                    <Badge variant={getPriorityColor(delivery.priority)}>{delivery.priority} priority</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Schedule Info */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-card-foreground">Schedule</p>
                    <div className="text-sm text-muted-foreground">
                      <p className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {new Date(delivery.scheduledDate).toLocaleDateString()}
                      </p>
                      <p className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {delivery.scheduledTime}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-card-foreground">Delivery Address</p>
                    <p className="text-sm text-muted-foreground flex items-start">
                      <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                      {delivery.address}
                    </p>
                  </div>

                  {/* Driver & Vehicle */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-card-foreground">Assignment</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Driver: {delivery.driver}</p>
                      <p>Vehicle: {delivery.vehicle}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-card-foreground">Duration</p>
                    <p className="text-sm text-muted-foreground">{delivery.estimatedDuration}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Edit Schedule
                  </Button>
                  {delivery.status === "scheduled" && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Start Delivery
                    </Button>
                  )}
                  {delivery.status === "in-transit" && <Button size="sm">Mark Complete</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
