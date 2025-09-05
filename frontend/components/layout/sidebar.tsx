"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { LanguageSwitcher } from "@/components/language/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { Home, Thermometer, Package, FileText, Truck, ShoppingCart, Bell, Settings, LogOut } from "lucide-react"
import Link from "next/link"

interface SidebarProps {
  userRole: "farmer" | "storage" | "buyer"
  className?: string
}

export function Sidebar({ userRole, className }: SidebarProps) {
  const { t } = useLanguage()

  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: t.common.dashboard, href: `/${userRole}/dashboard` },
      { icon: Bell, label: t.common.notifications, href: `/${userRole}/notifications` },
      { icon: Settings, label: t.common.settings, href: `/${userRole}/settings` },
    ]

    const roleSpecificItems = {
      farmer: [
        { icon: Package, label: t.nav.myOffers, href: "/farmer/offers" },
        { icon: Thermometer, label: t.nav.temperatureMonitor, href: "/farmer/temperature" },
        { icon: FileText, label: t.nav.transactionHistory, href: "/farmer/transactions" },
      ],
      storage: [
        { icon: Package, label: t.nav.inventory, href: "/storage/inventory" },
        { icon: Thermometer, label: t.nav.temperatureControl, href: "/storage/temperature" },
        { icon: Truck, label: t.nav.deliveries, href: "/storage/deliveries" },
        { icon: FileText, label: t.nav.transactionLogs, href: "/storage/transactions" },
      ],
      buyer: [
        { icon: ShoppingCart, label: t.nav.marketplace, href: "/buyer/marketplace" },
        { icon: Package, label: t.nav.myOrders, href: "/buyer/orders" },
        { icon: Truck, label: t.nav.deliverySchedule, href: "/buyer/deliveries" },
        { icon: FileText, label: t.nav.purchaseHistory, href: "/buyer/history" },
      ],
    }

    return [
      ...commonItems.slice(0, 1), // Dashboard first
      ...roleSpecificItems[userRole],
      ...commonItems.slice(1), // Notifications and Settings at the end
    ]
  }

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2 px-4">
            <h2 className="text-lg font-semibold text-sidebar-foreground">{t.nav.coldChainManagement}</h2>
            <NotificationBell userRole={userRole} />
          </div>

          <div className="px-4 mb-4">
            <LanguageSwitcher />
          </div>

          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              {getMenuItems().map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    asChild
                  >
                    <Link href={item.href} aria-label={item.label} role="link">
                      <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
              <div className="pt-4 mt-4 border-t border-sidebar-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => (window.location.href = "/")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.common.signOut}
                </Button>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
