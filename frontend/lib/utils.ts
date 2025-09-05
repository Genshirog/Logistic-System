import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Notification service scaffold for future integration
// TODO: Replace mocks with real API/WebSocket integrations
export type AppNotification = {
	id: string
	title: string
	description?: string
	createdAt: Date
	priority?: "low" | "medium" | "high"
}

export async function fetchNotifications(role: "farmer" | "storage" | "buyer"): Promise<AppNotification[]> {
	// TODO: GET /api/notifications?role=...
	await new Promise((r) => setTimeout(r, 200))
	return [
		{
			id: "1",
			title: "Welcome",
			description: `You are signed in as ${role}`,
			createdAt: new Date(),
			priority: "low",
		},
	]
}
