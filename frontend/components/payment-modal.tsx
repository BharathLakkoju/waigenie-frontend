"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PlanDetails {
  name: string;
  basePrice: number;
  price?: number | 'Custom';
  features: string[];
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: "pro" | "enterprise";
  planDetails: PlanDetails;
  onSuccess: (newUserType: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  plan,
  planDetails,
  onSuccess,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setLoading(true);
      console.log("Starting payment process for plan:", plan);

      // Create order
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Order creation failed:", errorData);
        throw new Error(`Failed to create order: ${errorData}`);
      }

      const data = await response.json();
      console.log("Order created successfully:", data);

      // Check if Razorpay is loaded
      if (typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay SDK not loaded");
      }

      // Initialize Razorpay
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Waigenie",
        description: `${planDetails.name} Subscription`,
        order_id: data.orderId,
        handler: async function (response: any) {
          console.log("Payment successful, verifying payment:", response);
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                plan,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.text();
              console.error("Payment verification failed:", errorData);
              throw new Error(`Payment verification failed: ${errorData}`);
            }

            const verifyData = await verifyResponse.json();
            console.log("Payment verified successfully:", verifyData);

            toast({
              title: "Payment Successful!",
              description: `You have successfully upgraded to ${planDetails.name}!`,
              variant: "default",
            });

            // Call onSuccess with the new user type
            if (onSuccess) {
              onSuccess(verifyData.userType);
            }

            onClose();
            router.refresh();
          } catch (error) {
            console.error("Payment verification error:", error);
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if payment was deducted.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#4F46E5",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      console.log("Initializing Razorpay with options:", options);
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        console.error("Payment failed:", response.error);
        toast({
          title: "Payment Failed",
          description: response.error.description,
          variant: "destructive",
        });
        setLoading(false);
      });
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to {planDetails.name}</DialogTitle>
          <DialogDescription>
            Get access to advanced features and more credits
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-2xl font-bold">
            {typeof planDetails.price === 'number' 
              ? `₹${planDetails.price.toLocaleString('en-IN')}/month`
              : 'Custom Pricing'}
          </div>
          <div className="space-y-2">
            {planDetails.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePayment}>
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 