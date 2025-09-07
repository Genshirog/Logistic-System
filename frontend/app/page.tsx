"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSwitcher } from "@/components/language/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Thermometer, Warehouse, ShoppingCart } from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Cold Chain Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect farmers, optimize storage, and build sustainable agricultural partnerships
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2" role="list">
          <Card role="listitem" className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Thermometer className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl font-bold">Farmer Portal</CardTitle>
              <CardDescription className="text-base">Connect with other farmers and manage your produce offers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link 
                href="/farmer/dashboard" 
                className="block w-full p-3 rounded-lg bg-primary text-primary-foreground text-center font-medium hover:bg-primary/90 transition-colors" 
                aria-label="Go to Farmer Dashboard"
              >
                Go to Dashboard
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  href="/farmer/offers" 
                  className="p-2 rounded-lg bg-secondary text-secondary-foreground text-center text-sm hover:bg-secondary/80 transition-colors" 
                  aria-label="View Farmer Offers"
                >
                  My Offers
                </Link>
                <Link 
                  href="/farmer/matching" 
                  className="p-2 rounded-lg bg-secondary text-secondary-foreground text-center text-sm hover:bg-secondary/80 transition-colors" 
                  aria-label="Storage Marketplace"
                >
                  Find Partners
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card role="listitem" className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Warehouse className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl font-bold">Storage Portal</CardTitle>
              <CardDescription className="text-base">Manage inventory and monitor storage conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link 
                href="/storage/dashboard" 
                className="block w-full p-3 rounded-lg bg-primary text-primary-foreground text-center font-medium hover:bg-primary/90 transition-colors" 
                aria-label="Go to Storage Dashboard"
              >
                Go to Dashboard
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  href="/storage/inventory" 
                  className="p-2 rounded-lg bg-secondary text-secondary-foreground text-center text-sm hover:bg-secondary/80 transition-colors" 
                  aria-label="View Storage Inventory"
                >
                  Inventory
                </Link>
                <Link 
                  href="/storage/temperature" 
                  className="p-2 rounded-lg bg-secondary text-secondary-foreground text-center text-sm hover:bg-secondary/80 transition-colors" 
                  aria-label="Open Temperature Control"
                >
                  Temperature
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
