import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function FarmerTransactionsPage() {
  // TODO: Replace mock data with GET /api/farmer/transactions?page=&status=&dateRange=
  const transactions = [
    { id: "TX-202401-001", product: "Organic Tomatoes", amount: 2500, date: "2024-01-18", status: "completed" },
    { id: "TX-202401-002", product: "Fresh Lettuce", amount: 1200, date: "2024-01-17", status: "pending" },
    { id: "TX-202401-003", product: "Bell Peppers", amount: 1800, date: "2024-01-16", status: "refunded" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "secondary"
      case "pending":
        return "default"
      case "refunded":
        return "outline"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout userRole="farmer" title="Transaction History">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>All sales and payouts related to your offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">{tx.product}</p>
                    <p className="text-sm text-muted-foreground">{tx.id} • {new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-primary">₱{tx.amount.toLocaleString()}</p>
                    <Badge variant={getStatusVariant(tx.status)} className="capitalize">{tx.status}</Badge>
                    <Button variant="outline" size="sm" className="bg-transparent">View</Button>
                  </div>
                </div>
              ))}
            </div>
            {/* TODO: Add pagination controls and filters for date/status */}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}


