import { z } from "zod"

export const checkoutSchema = z.object({
  cardName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine((val) => val.replace(/\s/g, "").length === 16, "Card number must be 16 digits"),
  expiry: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^\d{2}\/\d{2}$/, "Invalid format — use MM/YY"),
  cvv: z.string().min(3, "CVV must be at least 3 digits").max(4, "CVV must be at most 4 digits"),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
