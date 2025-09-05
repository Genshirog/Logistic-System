import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ShoppingCart, Thermometer, Calendar, Star } from "lucide-react"

export default function BuyerMarketplace() {
  // Mock data - in real app this would come from API
  const products = [
    {
      id: 1,
      product: "Organic Tomatoes",
      variety: "Roma",
      farmer: "Juan Dela Cruz",
      location: "Benguet",
      quantity: 500,
      unit: "kg",
      pricePerKg: 5.0,
      totalPrice: 2500,
      quality: "excellent",
      currentTemp: 4.1,
      targetRange: "2-4°C",
      expiryDays: 10,
      rating: 4.8,
      reviews: 24,
      description: "Fresh organic tomatoes, pesticide-free, perfect for restaurants and markets.",
      certifications: ["Organic", "Pesticide-Free"],
      harvestDate: "2024-01-15",
    },
    {
      id: 2,
      product: "Fresh Lettuce",
      variety: "Iceberg",
      farmer: "Maria Santos",
      location: "La Trinidad",
      quantity: 200,
      unit: "kg",
      pricePerKg: 6.0,
      totalPrice: 1200,
      quality: "good",
      currentTemp: 3.8,
      targetRange: "1-3°C",
      expiryDays: 7,
      rating: 4.5,
      reviews: 18,
      description: "Crisp iceberg lettuce, locally grown with sustainable farming practices.",
      certifications: ["Locally Grown"],
      harvestDate: "2024-01-12",
    },
    {
      id: 3,
      product: "Bell Peppers",
      variety: "Mixed Colors",
      farmer: "Pedro Garcia",
      location: "Baguio",
      quantity: 300,
      unit: "kg",
      pricePerKg: 6.0,
      totalPrice: 1800,
      quality: "excellent",
      currentTemp: 4.5,
      targetRange: "3-5°C",
      expiryDays: 14,
      rating: 4.9,
      reviews: 31,
      description: "Colorful bell peppers - red, yellow, green. High vitamin C content.",
      certifications: ["Premium Quality"],
      harvestDate: "2024-01-18",
    },
    {
      id: 4,
      product: "Baby Carrots",
      variety: "Sweet Baby",
      farmer: "Ana Rodriguez",
      location: "Tublay",
      quantity: 150,
      unit: "kg",
      pricePerKg: 4.5,
      totalPrice: 675,
      quality: "good",
      currentTemp: 2.1,
      targetRange: "0-2°C",
      expiryDays: 21,
      rating: 4.3,
      reviews: 12,
      description: "Sweet baby carrots, perfect for snacking and cooking.",
      certifications: ["Farm Fresh"],
      harvestDate: "2024-01-05",
    },
    {
      id: 5,
      product: "Organic Cabbage",
      variety: "Green Cabbage",
      farmer: "Carlos Santos",
      location: "Atok",
      quantity: 400,
      unit: "kg",
      pricePerKg: 3.5,
      totalPrice: 1400,
      quality: "excellent",
      currentTemp: 3.2,
      targetRange: "1-4°C",
      expiryDays: 18,
      rating: 4.7,
      reviews: 22,
      description: "Fresh organic cabbage, ideal for restaurants and food processing.",
      certifications: ["Organic", "Sustainable"],
      harvestDate: "2024-01-16",
    },
    {
      id: 6,
      product: "Sweet Corn",
      variety: "Yellow Corn",
      farmer: "Lisa Garcia",
      location: "Kapangan",
      quantity: 600,
      unit: "kg",
      pricePerKg: 4.0,
      totalPrice: 2400,
      quality: "good",
      currentTemp: 4.8,
      targetRange: "2-6°C",
      expiryDays: 5,
      rating: 4.4,
      reviews: 16,
      description: "Sweet yellow corn, freshly harvested and ready for immediate use.",
      certifications: ["Fresh Harvest"],
      harvestDate: "2024-01-19",
    },
  ]

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "secondary"
      case "good":
        return "default"
      case "fair":
        return "outline"
      default:
        return "outline"
    }
  }

  const getExpiryColor = (days: number) => {
    if (days <= 3) return "text-red-600"
    if (days <= 7) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <DashboardLayout userRole="buyer" title="Marketplace">
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products, farmers, or locations..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="herbs">Herbs</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="benguet">Benguet</SelectItem>
                <SelectItem value="baguio">Baguio</SelectItem>
                <SelectItem value="la-trinidad">La Trinidad</SelectItem>
                <SelectItem value="tublay">Tublay</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{products.length} products available</p>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="expiry">Expiry Date</SelectItem>
              <SelectItem value="quantity">Quantity Available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.product}</CardTitle>
                    <CardDescription>
                      {product.variety} • by {product.farmer}
                    </CardDescription>
                  </div>
                  <Badge variant={getQualityColor(product.quality)}>{product.quality}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price and Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="font-medium">
                      {product.quantity} {product.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price per kg</p>
                    <p className="font-medium">₱{product.pricePerKg}</p>
                  </div>
                </div>

                {/* Total Price */}
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="text-2xl font-bold text-primary">₱{product.totalPrice.toLocaleString()}</p>
                </div>

                {/* Temperature and Expiry */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Temperature</p>
                    <p className="font-medium flex items-center">
                      <Thermometer className="h-3 w-3 mr-1" />
                      {product.currentTemp}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expires In</p>
                    <p className={`font-medium ${getExpiryColor(product.expiryDays)}`}>{product.expiryDays} days</p>
                  </div>
                </div>

                {/* Location and Harvest Date */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{product.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Harvested</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(product.harvestDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="text-sm">
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-1">
                  {product.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Reserve
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
