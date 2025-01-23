"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { createPaymentOrder, verifyPayment } from "@/actions/payment";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  userId: string;
}

export function PaymentButton({ userId }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create order
      const { success, order, error } = await createPaymentOrder();

      if (!success || !order) {
        throw new Error(error || "Failed to create order");
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "WaiGenie Pro",
        description: "Pro Tier Subscription",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const result = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              userId
            );

            if (result.success) {
              toast({
                title: "Payment successful!",
                description: "Your subscription has been activated.",
              });
              router.refresh();
            } else {
              throw new Error(result.error || "Payment verification failed");
            }
          } catch (error: unknown) {
            toast({
              title: "Error",
              description: error instanceof Error ? error.message : "Something went wrong",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#0A2540",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full sm:w-auto"
    >
      {loading ? "Processing..." : "Upgrade to Pro"}
    </Button>
  );
}
