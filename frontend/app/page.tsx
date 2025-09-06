"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSwitcher } from "@/components/language/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Thermometer, Warehouse, ShoppingCart } from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-end mb-6">
          <LanguageSwitcher />
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-primary">{t.nav.coldChainManagement}</h1>
          <p className="text-muted-foreground mt-1">Access dashboards directly. No sign-in required.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3" role="list">
          <Card role="listitem" className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Thermometer className="h-6 w-6 mx-auto text-primary" aria-hidden="true" />
              <CardTitle>Farmer</CardTitle>
              <CardDescription>Manage offers and temperature</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/farmer/dashboard" className="text-primary hover:underline" aria-label="Go to Farmer Dashboard">
                Go to Dashboard
              </Link>
              <Link href="/farmer/offers" className="text-primary hover:underline" aria-label="View Farmer Offers">
                View Offers
              </Link>
              <Link href="/farmer/matching" className="text-primary hover:underline" aria-label="Storage Marketplace">
                Storage Marketplace
              </Link>
            </CardContent>
          </Card>

          <Card role="listitem" className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Warehouse className="h-6 w-6 mx-auto text-primary" aria-hidden="true" />
              <CardTitle>Storage</CardTitle>
              <CardDescription>Inventory and temperature control</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/storage/dashboard" className="text-primary hover:underline" aria-label="Go to Storage Dashboard">
                Go to Dashboard
              </Link>
              <Link href="/storage/inventory" className="text-primary hover:underline" aria-label="View Storage Inventory">
                Inventory
              </Link>
              <Link href="/storage/temperature" className="text-primary hover:underline" aria-label="Open Temperature Control">
                Temperature Control
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
