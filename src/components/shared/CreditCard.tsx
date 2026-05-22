import { useState } from "react"
import type { FC, ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreditCard as CreditCardIcon, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkoutSchema, type CheckoutFormData } from "@/schemas/checkoutSchema"

type CardState = {
  cardName: string
  cardNumber: string
  expiry: string
  cvv: string
}

type CreditCardProps = {
  onSubmit: (data: CheckoutFormData) => void
  isSubmitting?: boolean
}

const getCardType = (number: string) => {
  const cleaned = number.replace(/\s/g, "")
  if (cleaned.startsWith("4")) return "VISA"
  if (cleaned.startsWith("5")) return "MASTERCARD"
  if (cleaned.startsWith("3")) return "AMEX"
  if (cleaned.startsWith("6")) return "DISCOVER"
  return null
}

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim()

const formatExpiry = (value: string) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 4)
  return cleaned.length >= 2 ? cleaned.slice(0, 2) + "/" + cleaned.slice(2) : cleaned
}

const CreditCard: FC<CreditCardProps> = ({ onSubmit, isSubmitting }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [cardState, setCardState] = useState<CardState>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  })

  const cvvRegister = register("cvv")

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardState((prev) => ({ ...prev, cardNumber: formatted }))
    setValue("cardNumber", formatted)
  }

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setCardState((prev) => ({ ...prev, expiry: formatted }))
    setValue("expiry", formatted)
  }

  const cardType = getCardType(cardState.cardNumber)

  return (
    <div className="flex flex-col gap-6">
      {/* Card Preview */}
      <div className="card-3d w-full h-48 relative">
        <div className={`card-inner w-full h-full relative ${isFlipped ? "flipped" : ""}`}>
          {/* Front */}
          <div className="card-face rounded-2xl bg-linear-to-br from-primary/80 via-primary to-primary/60 p-6 flex flex-col justify-between shadow-xl">
            <div className="flex justify-between items-start">
              <CreditCardIcon className="h-8 w-8 text-white/80" />
              {cardType && (
                <span className="text-white font-bold text-sm tracking-widest">{cardType}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white font-mono text-xl tracking-widest">
                {cardState.cardNumber || "**** **** **** ****"}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-xs uppercase">Cardholder</p>
                  <p className="text-white font-medium text-sm uppercase tracking-wide truncate max-w-45">
                    {cardState.cardName || "Full Name"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs uppercase">Expires</p>
                  <p className="text-white font-medium text-sm">{cardState.expiry || "MM/YY"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="card-back card-face rounded-2xl bg-linear-to-br from-primary/60 via-primary to-primary/80 shadow-xl flex flex-col justify-center">
            <div className="h-10 bg-black/40 w-full mb-4" />
            <div className="px-6 flex justify-end items-center gap-3">
              <div className="flex-1 h-8 bg-white/20 rounded" />
              <div className="bg-white rounded px-4 py-1">
                <p className="text-primary font-mono font-bold text-sm tracking-widest">
                  {cardState.cvv || "CVV"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cardName">Cardholder Name</Label>
          <Input
            id="cardName"
            placeholder="John Doe"
            {...register("cardName")}
            onChange={(e) => {
              setCardState((prev) => ({ ...prev, cardName: e.target.value }))
              setValue("cardName", e.target.value)
            }}
          />
          {errors.cardName && <p className="text-sm text-red-500">{errors.cardName.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardState.cardNumber}
            onChange={handleCardNumberChange}
          />
          {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              value={cardState.expiry}
              onChange={handleExpiryChange}
            />
            {errors.expiry && <p className="text-sm text-red-500">{errors.expiry.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              name="cvv"
              placeholder="123"
              maxLength={4}
              onFocus={() => setIsFlipped(true)}
              onBlur={(e) => {
                setIsFlipped(false)
                cvvRegister.onBlur?.(e)
              }}
              onChange={(e) => {
                setCardState((prev) => ({ ...prev, cvv: e.target.value }))
                setValue("cvv", e.target.value)
                cvvRegister.onChange?.(e)
              }}
              ref={cvvRegister.ref}
            />
            {errors.cvv && <p className="text-sm text-red-500">{errors.cvv.message}</p>}
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full gap-2 mt-2" disabled={isSubmitting}>
          <Lock className="h-4 w-4" />
          {isSubmitting ? "Processing payment..." : "Pay Now"}
        </Button>
      </form>
    </div>
  )
}

export default CreditCard
