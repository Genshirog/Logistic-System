"use client"

import type React from "react"
import { Sidebar } from "./sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "farmer" | "storage" | "buyer"
  title: string
}

export function DashboardLayout({ children, userRole, title }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} className="border-r border-sidebar-border bg-sidebar" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-6 py-4">
          <h1 className="text-2xl font-bold text-card-foreground">{title}</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
