import Pricing from "@/components/ui/pricing-cards";

export default function DashboardPricingPage() {
    return (
        <div className="w-full h-full min-h-screen bg-gray-50/50">
            <div className="p-6 md:p-10">
                <div className="max-w-4xl mx-auto space-y-4 text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Upgrade Your Plan</h1>
                    <p className="text-muted-foreground">
                        Unlock more features and take your learning to the next level.
                    </p>
                </div>
                {/* We reuse the existing Pricing component which handles payments */}
                <Pricing />
            </div>
        </div>
    );
}
