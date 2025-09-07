"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { format, addDays, isAfter, isBefore, differenceInDays } from "date-fns"
import { useToast } from "@/hooks/use-toast"

const offerSchema = z.object({
	productName: z.string().min(2, "Product name is required"),
	variety: z.string().optional(),
	category: z.string({ required_error: "Select a category" }),
	description: z.string().max(500).optional(),
	quantity: z.coerce.number().positive("Quantity must be greater than 0"),
	unit: z.enum(["kg", "lbs", "pieces", "boxes"], { required_error: "Select a unit" }),
	pricePerUnit: z.coerce.number().positive("Price must be greater than 0"),
	storageTemp: z.string({ required_error: "Select a temperature range" }),
	expiryDate: z.date({ 
		required_error: "Select an expiry date" 
	}).refine((date) => {
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		return isAfter(date, today) || date.toDateString() === today.toDateString()
	}, {
		message: "Expiry date must be today or in the future"
	}),
	specialRequirements: z.string().max(300).optional(),
})

export default function NewOffer() {
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Calculate minimum date (today) and maximum date (1 year from now)
  const today = new Date()
  const maxDate = addDays(today, 365) // 1 year from today

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      productName: "",
      variety: "",
      category: "",
      description: "",
      quantity: undefined,
      unit: undefined as unknown as "kg",
      pricePerUnit: undefined,
      storageTemp: "",
      expiryDate: undefined,
      specialRequirements: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof offerSchema>) => {
    setIsSubmitting(true)
    try {
      // TODO: POST to Laravel backend /api/farmer/offers with payload `values`
      await new Promise((r) => setTimeout(r, 1000))
      toast({ title: "Offer submitted", description: values.productName })
      window.location.href = "/farmer/offers"
    } catch (err) {
      toast({ variant: "destructive", title: "Submission failed", description: "Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const productCategories = ["Vegetables", "Fruits", "Herbs", "Grains", "Legumes"]

  const storageRequirements = [
    "0-2°C (Frozen)",
    "2-4°C (Cold)",
    "4-8°C (Cool)",
    "8-15°C (Moderate)",
    "Room Temperature",
  ]

  // Quick date selection options
  const quickDateOptions = [
    { label: "1 week", days: 7 },
    { label: "2 weeks", days: 14 },
    { label: "1 month", days: 30 },
    { label: "3 months", days: 90 },
    { label: "6 months", days: 180 },
  ]

  const setQuickDate = (days: number) => {
    const newDate = addDays(today, days)
    setExpiryDate(newDate)
    setValue("expiryDate", newDate, { shouldValidate: true })
  }

  // Calculate days until expiry
  const getDaysUntilExpiry = () => {
    if (!expiryDate) return null
    return differenceInDays(expiryDate, today)
  }

  const daysUntilExpiry = getDaysUntilExpiry()

  // Get expiry status color
  const getExpiryStatusColor = () => {
    if (daysUntilExpiry === null) return ""
    if (daysUntilExpiry <= 7) return "text-red-600" // Critical - expires within a week
    if (daysUntilExpiry <= 30) return "text-orange-600" // Warning - expires within a month
    return "text-green-600" // Good - expires in more than a month
  }

  return (
    <DashboardLayout userRole="farmer" title="Submit New Offer">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <a href="/farmer/offers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Offers
            </a>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Offer Details</CardTitle>
            <CardDescription>Submit your agricultural products for storage and sale</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Product Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Product Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="e.g., Organic Tomatoes" aria-invalid={!!errors.productName} aria-describedby={errors.productName ? "product-name-error" : undefined} {...register("productName")} />
                    {errors.productName && (
                      <p id="product-name-error" role="alert" className="text-xs text-destructive">{errors.productName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="variety">Variety/Type</Label>
                    <Input id="variety" placeholder="e.g., Roma, Cherry" {...register("variety")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(v) => setValue("category", v, { shouldValidate: true })}>
                    <SelectTrigger aria-invalid={!!errors.category} aria-describedby={errors.category ? "category-error" : undefined}>
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p id="category-error" role="alert" className="text-xs text-destructive">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product quality, growing methods, etc."
                    rows={3}
                    {...register("description")}
                  />
                </div>
              </div>

              {/* Quantity and Pricing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Quantity & Pricing</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="500" aria-invalid={!!errors.quantity} aria-describedby={errors.quantity ? "quantity-error" : undefined} {...register("quantity", { valueAsNumber: true })} />
                    {errors.quantity && (
                      <p id="quantity-error" role="alert" className="text-xs text-destructive">{errors.quantity.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select onValueChange={(v) => setValue("unit", v as any, { shouldValidate: true })}>
                      <SelectTrigger aria-invalid={!!errors.unit} aria-describedby={errors.unit ? "unit-error" : undefined}>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.unit && (
                      <p id="unit-error" role="alert" className="text-xs text-destructive">{errors.unit.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price-per-unit">Price per Unit (₱)</Label>
                    <Input id="price-per-unit" type="number" step="0.01" placeholder="5.00" aria-invalid={!!errors.pricePerUnit} aria-describedby={errors.pricePerUnit ? "price-error" : undefined} {...register("pricePerUnit", { valueAsNumber: true })} />
                    {errors.pricePerUnit && (
                      <p id="price-error" role="alert" className="text-xs text-destructive">{errors.pricePerUnit.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Storage Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Storage Requirements</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storage-temp">Required Temperature</Label>
                    <Select onValueChange={(v) => setValue("storageTemp", v, { shouldValidate: true })}>
                      <SelectTrigger aria-invalid={!!errors.storageTemp} aria-describedby={errors.storageTemp ? "temp-error" : undefined}>
                        <SelectValue placeholder="Select temperature range" />
                      </SelectTrigger>
                      <SelectContent>
                        {storageRequirements.map((temp) => (
                          <SelectItem key={temp} value={temp.toLowerCase()}>
                            {temp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.storageTemp && (
                      <p id="temp-error" role="alert" className="text-xs text-destructive">{errors.storageTemp.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          type="button"
                          variant="outline" 
                          className="w-full justify-start text-left font-normal bg-transparent"
                          aria-invalid={!!errors.expiryDate}
                          aria-describedby={errors.expiryDate ? "expiry-date-error" : undefined}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <div className="flex flex-col items-start">
                            <span>{expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}</span>
                            {expiryDate && daysUntilExpiry !== null && (
                              <span className={`text-xs ${getExpiryStatusColor()}`}>
                                {daysUntilExpiry === 0 ? "Expires today" : 
                                 daysUntilExpiry === 1 ? "Expires tomorrow" :
                                 `${daysUntilExpiry} days from now`}
                              </span>
                            )}
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar 
                          mode="single" 
                          selected={expiryDate} 
                          onSelect={(d) => { 
                            setExpiryDate(d)
                            if (d) setValue("expiryDate", d, { shouldValidate: true })
                          }}
                          disabled={(date) => isBefore(date, today)}
                          initialFocus 
                        />
                        <div className="p-3 border-t">
                          <p className="text-xs text-muted-foreground">
                            Select a date from today onwards
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                    {errors.expiryDate && (
                      <p id="expiry-date-error" role="alert" className="text-xs text-destructive">
                        {errors.expiryDate.message as string}
                      </p>
                    )}
                    
                    {/* Quick Date Selection */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Quick select:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickDateOptions.map((option) => (
                          <Button
                            key={option.label}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setQuickDate(option.days)}
                            className="text-xs h-7 px-2"
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        💡 Tip: Set expiry date based on your product's shelf life and storage conditions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-requirements">Special Storage Requirements</Label>
                  <Textarea
                    id="special-requirements"
                    placeholder="Any special handling or storage instructions..."
                    rows={2}
                    {...register("specialRequirements")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href="/farmer/offers">Cancel</a>
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Offer"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
