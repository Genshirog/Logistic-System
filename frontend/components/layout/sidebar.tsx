"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { LanguageSwitcher } from "@/components/language/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { Home, Thermometer, Package, FileText, Truck, ShoppingCart, Bell, Settings, LogOut, Users } from "lucide-react"
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
    ]

    const roleSpecificItems = {
      farmer: [
        { icon: Users, label: t.nav.groupStorage, href: "/farmer/group-storage" },
        { icon: Package, label: t.nav.marketplace, href: "/farmer/matching" },
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
    <div className={cn("pb-12 w-72", className)}>
      <div className="space-y-6 py-6">
        <div className="px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CC</span>
              </div>
              <h2 className="text-lg font-bold text-sidebar-foreground">{t.nav.coldChainManagement}</h2>
            </div>
            <NotificationBell userRole={userRole} />
          </div>

          <div className="mb-6">
            <LanguageSwitcher />
          </div>

          <div className="space-y-2">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {getMenuItems().map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xl h-12 px-4 transition-all duration-200 group"
                    asChild
                  >
                    <Link href={item.href} aria-label={item.label} role="link">
                      <Icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
              <div className="pt-6 mt-6 border-t border-sidebar-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground rounded-xl h-12 px-4 transition-all duration-200 group"
                  onClick={() => (window.location.href = "/")}
                >
                  <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{t.common.signOut}</span>
                </Button>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
