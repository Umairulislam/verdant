import { z } from "zod"

export const checkoutSchema = z.object({
  // Shipping
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  country: z.string().min(1, "Country is required"),
  // Payment
  cardName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine((val) => val.replace(/\s/g, "").length === 16, "Card number must be 16 digits"),
  expiry: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^\d{2}\/\d{2}$/, "Invalid format — use MM/YY")
    .refine((val) => {
      const [month, year] = val.split("/").map(Number)
      if (month < 1 || month > 12) return false
      const now = new Date()
      const currentYear = now.getFullYear() % 100
      const currentMonth = now.getMonth() + 1
      if (year < currentYear) return false
      if (year === currentYear && month < currentMonth) return false
      return true
    }, "Card has expired"),
  cvv: z.string().min(3, "CVV must be at least 3 digits").max(4, "CVV must be at most 4 digits"),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
