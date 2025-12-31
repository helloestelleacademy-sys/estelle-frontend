"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Lock, Sparkles } from "lucide-react";
import { useInitializePaymentMutation } from "@/redux/api/paymentApi";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface UnlockCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    coursePrice?: number;
    requiredPlan: string; // "Basic" | "Premium"
}

const PLAN_PRICES: Record<string, number> = {
    Basic: 35000,
    Premium: 210000,
};

const PLAN_FEATURES: Record<string, string[]> = {
    Basic: ["Lifetime Access to 6 courses", "Certificate of Completion", "Practical Quizzes"],
    Premium: ["Access to AI Tools", "1-on-1 Mentorship", "All 10+ Courses", "Downloadable Resources"],
};

export default function UnlockCourseModal({
    isOpen,
    onClose,
    courseTitle,
    requiredPlan,
}: UnlockCourseModalProps) {
    const [initializePayment, { isLoading }] = useInitializePaymentMutation();
    const price = PLAN_PRICES[requiredPlan] || 210000;
    const features = PLAN_FEATURES[requiredPlan] || PLAN_FEATURES["Premium"];

    const handleUnlock = async () => {
        try {
            toast.loading("Initializing secure payment...");
            const response = await initializePayment({
                amount: price,
                currency: "NGN",
                metadata: { planType: requiredPlan }
            }).unwrap();

            if (response.success && response.authorization_url) {
                window.location.href = response.authorization_url;
            } else {
                toast.dismiss();
                toast.error("Failed to initialize payment. Please try again.");
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Payment initialization failed.");
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
                {/* Header Section with Gradient */}
                <div className="bg-gradient-to-br from-[#7851A9] to-[#5e3e87] p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/noise.png')]"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm shadow-inner">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <DialogTitle className="text-xl font-bold mb-1">Unlock This Course</DialogTitle>
                        <DialogDescription className="text-purple-100 text-sm max-w-xs mx-auto">
                            Get instant access to <br />
                            <span className="font-semibold italic">"{courseTitle}"</span>
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-6 bg-white">
                    <div className="flex justify-between items-center mb-6 bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Upgrade to</span>
                            <span className="font-bold text-[#7851A9] flex items-center gap-2">
                                {requiredPlan} Plan
                                <Badge className="bg-[#FE401C] text-[10px] h-5 px-1.5">Best Value</Badge>
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold block text-gray-900">₦{(price / 1000).toFixed(0)}k</span>
                            <span className="text-xs text-gray-400 line-through">₦{((price * 1.5) / 1000).toFixed(0)}k</span>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <p className="text-sm font-medium text-gray-700">What's included:</p>
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Button
                        onClick={handleUnlock}
                        disabled={isLoading}
                        className="w-full bg-[#7851A9] hover:bg-black text-white h-12 text-base shadow-lg shadow-purple-200 transition-all hover:scale-[1.02]"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin mr-2" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                <span>Unlock Now</span>
                            </div>
                        )}
                    </Button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        Secure payment powered by Paystack
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
