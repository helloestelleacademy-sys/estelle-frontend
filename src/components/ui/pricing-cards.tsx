import { Check, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Pricing() {
    return (
        <div id="pricing" className="w-full py-20 lg:py-24">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <Badge className="bg-[#7852A9] hover:bg-[#5e3e87] px-4 py-1 text-sm">Pricing</Badge>
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                            Prices that make sense!
                        </h2>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                            Turn your story Into a Legacy-brand. Pay once, life time access.
                        </p>
                    </div>
                    <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8 pl-5 pr-5">
                        {/* BASIC PLAN */}
                        <Card className="w-full rounded-2xl flex flex-col border-gray-200">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-normal">
                                        Basic
                                    </span>
                                </CardTitle>
                                <CardDescription>
                                    Perfect for individuals starting their journey.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1 justify-between">
                                <div className="flex flex-col gap-8 justify-start">
                                    <div className="flex flex-col">
                                        <div className="flex flex-row items-center gap-2">
                                            <span className="text-4xl font-bold">₦35,000</span>
                                            <span className="bg-[#FE401C] text-white text-xs px-2 py-1 rounded-full font-bold">-30%</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground line-through mt-1">
                                            ₦50,000
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4 justify-start">
                                        {[
                                            "Lifetime Access to 6 courses",
                                            "Earn a certificate upon completion",
                                            "Tailored quizzes for practical learning"
                                        ].map((feature, i) => (
                                            <div key={i} className="flex flex-row gap-4">
                                                <Check className="w-4 h-4 mt-2 text-[#7852A9] shrink-0" />
                                                <div className="flex flex-col">
                                                    <p className="text-sm">{feature}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <a href="https://mainstack.store/stellanwosu/O7XDUpkdLOhk" target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full gap-4 rounded-md py-6 border-[#7852A9] text-[#7852A9] hover:bg-black hover:text-white hover:border-black transition-colors duration-300">
                                            Buy Now <MoveRight className="w-4 h-4" />
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* PREMIUM PLAN */}
                        <div className="relative flex flex-col w-full">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <span className="bg-[#7852A9] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">Most Popular</span>
                            </div>
                            <Card className="w-full shadow-2xl rounded-2xl border-[#7852A9] border-2 flex flex-col scale-105 z-0 relative">
                                <CardHeader>
                                    <CardTitle>
                                        <span className="flex flex-row gap-4 items-center font-normal text-[#7852A9]">
                                            Premium
                                        </span>
                                    </CardTitle>
                                    <CardDescription>
                                        Detailed Access for serious learners.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col flex-1 justify-between">
                                    <div className="flex flex-col gap-8 justify-start">
                                        <div className="flex flex-col">
                                            <div className="flex flex-row items-center gap-2">
                                                <span className="text-4xl font-bold">₦210,000</span>
                                                <span className="bg-[#FE401C] text-white text-xs px-2 py-1 rounded-full font-bold">-30%</span>
                                            </div>
                                            <div className="flex flex-row gap-2 items-center mt-1">
                                                <span className="text-sm text-muted-foreground line-through">
                                                    ₦300,000
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    / one-time
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 justify-start">
                                            {[
                                                "Access to AI tools",
                                                "Lifetime Access to 10 courses",
                                                "Earn a certificate upon completion",
                                                "Tailored quizzes for practical learning",
                                                "1-1 hands-on mentorship access with tutors",
                                                "Save 30% when you pay",
                                                "Enjoy maximum flexible learning at your own pace"
                                            ].map((feature, i) => (
                                                <div key={i} className="flex flex-row gap-4">
                                                    <Check className="w-4 h-4 mt-2 text-[#7852A9] shrink-0" />
                                                    <div className="flex flex-col">
                                                        <p className="text-sm">{feature}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-8">
                                        <a href="https://mainstack.store/stellanwosu/premium-plan" target="_blank" rel="noopener noreferrer">
                                            <Button className="w-full gap-4 bg-[#7852A9] hover:bg-black rounded-md py-6 text-lg shadow-xl shadow-[#7852A9]/20 transition-colors duration-300">
                                                Buy Now <MoveRight className="w-4 h-4" />
                                            </Button>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* ORGANIZATIONS PLAN */}
                        <Card className="w-full rounded-2xl flex flex-col border-gray-200">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-normal">
                                        Organizations
                                    </span>
                                </CardTitle>
                                <CardDescription>
                                    Comprehensive solution for teams and companies.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1 justify-between">
                                <div className="flex flex-col gap-8 justify-start">
                                    <div className="flex flex-col">
                                        <div className="flex flex-row items-center gap-2">
                                            <span className="text-4xl font-bold">₦300,000</span>
                                            <span className="bg-[#FE401C] text-white text-xs px-2 py-1 rounded-full font-bold">-30%</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            <span className="text-sm text-muted-foreground line-through">
                                                ₦430,000
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                / one-time
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 justify-start">
                                        {[
                                            "AI powered training",
                                            "Lifetime Access to 9 courses",
                                            "Earn a certificate upon completion",
                                            "Tailored quizzes for practical learning",
                                            "Goal focused coaching & access to tutors",
                                            "Free personal branding resources, templates",
                                            "Dedicated customer success team"
                                        ].map((feature, i) => (
                                            <div key={i} className="flex flex-row gap-4">
                                                <Check className="w-4 h-4 mt-2 text-[#7852A9] shrink-0" />
                                                <div className="flex flex-col">
                                                    <p className="text-sm">{feature}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <a href="https://mainstack.store/stellanwosu/Y31l1e4NVIhj" target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full gap-4 rounded-md py-6 border-[#7852A9] text-[#7852A9] hover:bg-black hover:text-white hover:border-black transition-colors duration-300">
                                            Book a meeting <MoveRight className="w-4 h-4" />
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
