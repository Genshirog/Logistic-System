"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Thermometer, Warehouse, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type UserRole = "farmer" | "storage" | "buyer"

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(128, "Password is too long"),
	role: z.enum(["farmer", "storage", "buyer"], {
		required_error: "Please select a role",
	}),
})

export function LoginForm() {
	const { t } = useLanguage()
	const router = useRouter()
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "", role: undefined as unknown as UserRole },
	})

	const selectedRole = watch("role")

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		setIsLoading(true)
		try {
			// TODO: Integrate with Laravel auth API (issue JWT/session) and set cookie
			// POST /api/login { email, password, role }
			await new Promise((r) => setTimeout(r, 800))
			toast({ title: t.common.signedIn || "Signed in", description: `${values.email}` })
			router.push(`/${values.role}/dashboard`)
		} catch (err) {
			toast({
				variant: "destructive",
				title: t.common.error || "Login failed",
				description: t.common.tryAgain || "Please check your credentials and try again.",
			})
		} finally {
			setIsLoading(false)
		}
	}

  const roleOptions = [
		{ value: "farmer", label: t.roles.farmer, icon: Thermometer, description: t.roles.farmerDesc },
		{ value: "storage", label: t.roles.storage, icon: Warehouse, description: t.roles.storageDesc },
		{ value: "buyer", label: t.roles.buyer, icon: ShoppingCart, description: t.roles.buyerDesc },
	]

  return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-labelledby="login-title">
			<h2 id="login-title" className="sr-only">{t.common.signIn}</h2>
			<div className="space-y-2">
				<Label htmlFor="email">{t.common.email}</Label>
				<Input
					id="email"
					type="email"
					placeholder={`${t.common.email.toLowerCase()}...`}
					aria-invalid={!!errors.email}
					aria-describedby={errors.email ? "email-error" : undefined}
					{...register("email")}
				/>
				{errors.email && (
					<p id="email-error" role="alert" className="text-xs text-destructive">
						{errors.email.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">{t.common.password}</Label>
				<Input
					id="password"
					type="password"
					placeholder={`${t.common.password.toLowerCase()}...`}
					aria-invalid={!!errors.password}
					aria-describedby={errors.password ? "password-error" : undefined}
					{...register("password")}
				/>
				{errors.password && (
					<p id="password-error" role="alert" className="text-xs text-destructive">
						{errors.password.message}
					</p>
				)}
			</div>

			<div className="space-y-3">
				<Label>{t.common.selectRole}</Label>
				<RadioGroup
					value={selectedRole}
					onValueChange={(v) => setValue("role", v as UserRole, { shouldValidate: true })}
					aria-invalid={!!errors.role}
					aria-describedby={errors.role ? "role-error" : undefined}
				>
					<div className="grid gap-3">
						{roleOptions.map((option) => {
							const Icon = option.icon
							return (
								<Card key={option.value} className={`transition-all hover:shadow-md ${selectedRole === option.value ? "ring-2 ring-primary bg-card" : "hover:bg-muted/50"}`}>
									<CardContent className="p-4">
										<div className="flex items-center gap-3">
											<RadioGroupItem value={option.value} id={`role-${option.value}`} aria-label={option.label} />
											<Icon className="h-5 w-5 text-primary" />
											<div className="flex-1">
												<div className="font-medium text-card-foreground">{option.label}</div>
												<div className="text-sm text-muted-foreground">{option.description}</div>
											</div>
										</div>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</RadioGroup>
				{errors.role && (
					<p id="role-error" role="alert" className="text-xs text-destructive">
						{errors.role.message}
					</p>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading} aria-live="polite">
				{isLoading ? `${t.common.loading}...` : t.common.signIn}
			</Button>
		</form>
	)
}
