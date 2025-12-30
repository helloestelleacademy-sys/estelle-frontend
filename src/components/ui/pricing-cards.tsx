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
        <div id="pricing" className="w-full py-20 lg:py-40">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <Badge>Pricing</Badge>
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
                        <Card className="w-full rounded-md flex flex-col">
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
                                    <p className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl">₦35,000</span>
                                        <span className="text-sm text-muted-foreground line-through">
                                            ₦50,000
                                        </span>
                                    </p>
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
                                        <Button variant="outline" className="w-full gap-4">
                                            Buy Now <MoveRight className="w-4 h-4" />
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* PREMIUM PLAN */}
                        <Card className="w-full shadow-2xl rounded-md border-[#7852A9] border-2 flex flex-col scale-105">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-normal">
                                        Premium
                                    </span>
                                </CardTitle>
                                <CardDescription>
                                    Detailed Access for serious learners.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1 justify-between">
                                <div className="flex flex-col gap-8 justify-start">
                                    <p className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl">₦210,000</span>
                                        <span className="text-sm text-muted-foreground">
                                            / one-time
                                        </span>
                                    </p>
                                    <div className="flex flex-col gap-4 justify-start">
                                        {[
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
                                        <Button className="w-full gap-4 bg-[#7852A9] hover:bg-[#5e3e87]">
                                            Buy Now <MoveRight className="w-4 h-4" />
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* ORGANIZATIONS PLAN */}
                        <Card className="w-full rounded-md flex flex-col">
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
                                    <p className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl">₦300,000</span>
                                        <span className="text-sm text-muted-foreground">
                                            / one-time
                                        </span>
                                    </p>
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
                                        <Button variant="outline" className="w-full gap-4">
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
