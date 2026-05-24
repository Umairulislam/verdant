import { CreditCardIcon } from "lucide-react"

type CreditCardPreviewProps = {
  cardName: string
  cardNumber: string
  expiry: string
  cvv: string
  isFlipped: boolean
}

const getCardType = (number: string) => {
  const cleaned = number.replace(/\s/g, "")
  if (cleaned.startsWith("4")) return "VISA"
  if (cleaned.startsWith("5")) return "MASTERCARD"
  if (cleaned.startsWith("3")) return "AMEX"
  if (cleaned.startsWith("6")) return "DISCOVER"
  return null
}

const CreditCard = ({ cardName, cardNumber, expiry, cvv, isFlipped }: CreditCardPreviewProps) => {
  const cardType = getCardType(cardNumber)

  return (
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
              {cardNumber || "**** **** **** ****"}
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/60 text-xs uppercase">Cardholder</p>
                <p className="text-white font-medium text-sm uppercase tracking-wide truncate max-w-45">
                  {cardName || "Full Name"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs uppercase">Expires</p>
                <p className="text-white font-medium text-sm">{expiry || "MM/YY"}</p>
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
                {cvv || "CVV"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditCard
