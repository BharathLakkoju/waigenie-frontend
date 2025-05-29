"use client";
import { useState, useEffect } from "react";
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
import { getExchangeRate, getCurrencySymbol, getCurrencyFromCountry } from "@/lib/currency";

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
  onSuccess?: (userType: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  plan,
  planDetails,
  onSuccess,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [localPrice, setLocalPrice] = useState<number | 'Custom'>(planDetails.price || planDetails.basePrice);
  const [currency, setCurrency] = useState<string>("USD");
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function getLocationAndPrice() {
      try {
        // First try to get location from browser
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Use reverse geocoding to get country code
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
        );
        const data = await response.json();
        const countryCode = data.countryCode;

        // Get currency for the country
        const userCurrency = getCurrencyFromCountry(countryCode);
        setCurrency(userCurrency);
        setCurrencySymbol(getCurrencySymbol(userCurrency));

        // Convert price to local currency
        if (typeof planDetails.basePrice === 'number') {
          const localAmount = await getExchangeRate(planDetails.basePrice, userCurrency);
          setLocalPrice(Math.round(localAmount));
        }
      } catch (error) {
        console.error('Error getting location or price:', error);
        // Fallback to IP-based location
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          const countryCode = data.country_code;
          const userCurrency = getCurrencyFromCountry(countryCode);
          setCurrency(userCurrency);
          setCurrencySymbol(getCurrencySymbol(userCurrency));

          if (typeof planDetails.basePrice === 'number') {
            const localAmount = await getExchangeRate(planDetails.basePrice, userCurrency);
            setLocalPrice(Math.round(localAmount));
          }
        } catch (ipError) {
          console.error('Error with IP-based location:', ipError);
          // Final fallback to USD
          setLocalPrice(planDetails.basePrice);
        }
      }
    }

    getLocationAndPrice();
  }, [planDetails.basePrice]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      console.log("Starting payment process for plan:", plan);

      // Create order
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          currency,
          amount: typeof localPrice === 'number' ? localPrice : planDetails.basePrice
        }),
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
              description: "Please contact support if the issue persists.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
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
            {typeof localPrice === 'number'
              ? `${currencySymbol}${localPrice.toLocaleString()}/month`
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
          <Button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Upgrade Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 