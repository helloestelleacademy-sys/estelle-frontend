"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPaymentQuery } from "@/redux/api/paymentApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function PaymentCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reference = searchParams.get("reference");

    // Skip query if no reference
    const { data, isLoading, isError } = useVerifyPaymentQuery(reference || "", {
        skip: !reference,
    });

    useEffect(() => {
        if (!reference) {
            router.push("/dashboard");
            return;
        }

        if (data && data.success && data.status === "success") {
            toast.success("Payment successful! Plan upgraded.");
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } else if ((data && data.status !== "success") || isError) {
            toast.error("Payment verification failed or was not successful.");
            // Optional: redirect after delay
            setTimeout(() => {
                router.push("/dashboard");
            }, 3000);
        }
    }, [data, isError, reference, router]);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                    {isLoading ? (
                        <Loader2 className="h-10 w-10 animate-spin text-[#7852A9]" />
                    ) : isError || (data && data.status !== "success") ? (
                        <span className="text-3xl">❌</span>
                    ) : (
                        <span className="text-3xl">🎉</span>
                    )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isLoading
                        ? "Verifying Payment..."
                        : isError || (data && data.status !== "success")
                            ? "Verification Failed"
                            : "Payment Successful!"}
                </h1>
                <p className="max-w-xs text-sm text-gray-500">
                    {isLoading
                        ? "Please wait while we confirm your transaction."
                        : isError || (data && data.status !== "success")
                            ? "We couldn't verify your payment. Please contact support if you were debited."
                            : "You have been upgraded. Redirecting you to your dashboard..."}
                </p>
            </div>
        </div>
    );
}

export default function PaymentCallback() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-[#7852A9]" /></div>}>
            <PaymentCallbackContent />
        </Suspense>
    );
}
