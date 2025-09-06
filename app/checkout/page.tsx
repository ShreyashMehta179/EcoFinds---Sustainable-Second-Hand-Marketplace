"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      <p className="mb-4 text-gray-600">Scan this QR to simulate payment:</p>

      {/* ✅ Replace with your own QR image */}
      <Image
        src="images/Qr.jpg"
        alt="Payment QR"
        width={250}
        height={250}
        className="border rounded-lg shadow-md"
      />

      <p className="mt-4 text-sm text-gray-500">UPI / Google Pay Demo</p>

      <Button
        onClick={() => router.push("/payment/success")}
        className="mt-6 bg-green-600 hover:bg-green-700"
      >
        I have paid
      </Button>
    </div>
  )
}
