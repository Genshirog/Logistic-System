import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"

export default function FarmerOffers() {
  // Mock data - in real app this would come from API
  const offers = [
    {
      id: 1,
      product: "Organic Tomatoes",
      variety: "Roma",
      quantity: 500,
      unit: "kg",
      pricePerUnit: 5.0,
      totalValue: 2500,
      status: "active",
      dateCreated: "2024-01-15",
      expiryDate: "2024-01-25",
      storageTemp: "2-4°C",
      currentTemp: 4.1,
      description: "Fresh organic tomatoes, pesticide-free",
    },
    {
      id: 2,
      product: "Fresh Lettuce",
      variety: "Iceberg",
      quantity: 200,
      unit: "kg",
      pricePerUnit: 6.0,
      totalValue: 1200,
      status: "accepted",
      dateCreated: "2024-01-12",
      expiryDate: "2024-01-20",
      storageTemp: "1-3°C",
      currentTemp: 3.8,
      description: "Crisp iceberg lettuce, locally grown",
    },
    {
      id: 3,
      product: "Bell Peppers",
      variety: "Mixed Colors",
      quantity: 300,
      unit: "kg",
      pricePerUnit: 6.0,
      totalValue: 1800,
      status: "pending",
      dateCreated: "2024-01-18",
      expiryDate: "2024-01-28",
      storageTemp: "3-5°C",
      currentTemp: 4.5,
      description: "Colorful bell peppers - red, yellow, green",
    },
    {
      id: 4,
      product: "Carrots",
      variety: "Baby Carrots",
      quantity: 150,
      unit: "kg",
      pricePerUnit: 4.5,
      totalValue: 675,
      status: "expired",
      dateCreated: "2024-01-05",
      expiryDate: "2024-01-15",
      storageTemp: "0-2°C",
      currentTemp: 2.1,
      description: "Sweet baby carrots, perfect for snacking",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "accepted":
        return "secondary"
      case "pending":
        return "outline"
      case "expired":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout userRole="farmer" title="My Offers">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search offers..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button asChild>
            <a href="/farmer/offers/new">
              <Plus className="h-4 w-4 mr-2" />
              New Offer
            </a>
          </Button>
        </div>

        {/* Offers Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{offer.product}</CardTitle>
                    <CardDescription>{offer.variety}</CardDescription>
                  </div>
                  <Badge variant={getStatusColor(offer.status)}>{offer.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-medium">
                      {offer.quantity} {offer.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price/Unit</p>
                    <p className="font-medium">₱{offer.pricePerUnit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Value</p>
                    <p className="font-medium text-primary">₱{offer.totalValue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Temp</p>
                    <p className="font-medium">{offer.currentTemp}°C</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">Storage Requirement</p>
                  <p className="font-medium">{offer.storageTemp}</p>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">Expires</p>
                  <p className="font-medium">{new Date(offer.expiryDate).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
