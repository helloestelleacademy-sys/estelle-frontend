"use client";

import { useGetEventByIdQuery, useRegisterForEventMutation } from "@/redux/api/eventApi";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Calendar, MapPin, Users, Tag, CheckCircle2, CheckCircle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";

const EventDetail = () => {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { user } = useSelector((state: RootState) => state.auth);

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const [regForm, setRegForm] = useState({
        name: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "",
        email: user?.email || "",
        country: "",
        phone: ""
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    // Fetch Event Data
    const { data, isLoading, error } = useGetEventByIdQuery(id as string, {
        skip: !id
    });

    // Registration Mutation
    const [registerForEvent, { isLoading: isRegistering }] = useRegisterForEventMutation();

    if (isLoading) {
        return (
            <div className="flex bg-[#F7F0FF] h-screen items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#7852A9]" />
            </div>
        );
    }

    if (error || !data || !data.event) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4 bg-[#F7F0FF]">
                <h2 className="text-xl font-bold">Event not found</h2>
                <Link href="/events">
                    <Button className="bg-[#7852A9]">Back to Events</Button>
                </Link>
            </div>
        );
    }

    const { event } = data;
    const isFull = event.capacity > 0 && event.registeredCount >= event.capacity;
    const isPast = new Date(event.date) < new Date();

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!regForm.name || !regForm.email || !regForm.country || !regForm.phone) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            await registerForEvent({
                eventId: event._id,
                ...regForm
            }).unwrap();

            toast.success("Successfully registered for the event!");
            setIsRegisterModalOpen(false);
        } catch (err: any) {
            console.error("Registration failed", err);
            toast.error(err.data?.message || "Failed to register. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-[#F7F0FF] py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <Link href="/events" className="text-sm text-[#7852A9] font-medium hover:underline mb-8 inline-flex items-center gap-2">
                    &larr; Back to Events
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-6">
                    {/* Left Column: Event Image and Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-white/20">
                            <Image
                                src={event.image || '/assets/headerImg.png'}
                                alt={event.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-[#7852A9] text-white px-4 py-1 text-sm uppercase font-bold tracking-wider">
                                    {event.status}
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-stone-100">
                            <div className="mb-6">
                                {event.subText && (
                                    <span className="text-[#7852A9] font-bold uppercase tracking-widest text-sm mb-2 block">
                                        {event.subText}
                                    </span>
                                )}
                                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{event.title}</h1>
                            </div>

                            <div className="flex flex-wrap gap-6 mb-10 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#7852A9]" />
                                    <span>{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-[#7852A9]" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#7852A9]" />
                                    <span>{event.capacity > 0 ? `${event.registeredCount} / ${event.capacity} registered` : `${event.registeredCount} registered`}</span>
                                </div>
                            </div>

                            <div className="prose prose-purple max-w-none mb-12">
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">About this masterclass</h3>
                                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                    {event.description}
                                </p>
                            </div>

                            {event.learningPoints && event.learningPoints.length > 0 && (
                                <div className="bg-[#F7F0FF] rounded-3xl p-8 border border-purple-100">
                                    <h3 className="text-2xl font-bold mb-6 text-gray-900">What you'll learn</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        {event.learningPoints.map((point: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="mt-1 bg-[#7852A9] rounded-full p-1 shrink-0">
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                </div>
                                                <p className="text-gray-700 font-medium">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Registration Card */}
                    <div className="space-y-6">
                        <Card className="rounded-[32px] overflow-hidden border-stone-100 shadow-lg sticky top-32">
                            <CardHeader className="bg-[#7852A9] text-white p-8">
                                <CardTitle className="text-2xl font-bold">Registration</CardTitle>
                                <p className="text-purple-100 opacity-90 mt-1">Secure your spot today</p>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-gray-600 font-medium">Ticket Price:</span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {event.price === 0 ? 'FREE' : `₦${event.price.toLocaleString()}`}
                                    </span>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center space-y-3">
                                    <p className="text-sm font-semibold text-[#7852A9]">Click Link to register Or scan</p>
                                    <div className="flex justify-center p-2 bg-white rounded-xl shadow-sm inline-block">
                                        {currentUrl && (
                                            <QRCodeSVG
                                                value={currentUrl}
                                                size={120}
                                                level="H"
                                                includeMargin={false}
                                                imageSettings={{
                                                    src: "/assets/Estellelogonew2.png",
                                                    x: undefined,
                                                    y: undefined,
                                                    height: 24,
                                                    width: 24,
                                                    excavate: true,
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            disabled={isRegistering || isFull || isPast || event.status === 'cancelled'}
                                            className="w-full bg-[#7852A9] hover:bg-[#603e8a] text-white py-8 rounded-2xl text-xl font-bold shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98]"
                                        >
                                            {isFull ? "Sold Out" : isPast ? "Event Ended" : event.status === 'cancelled' ? "Cancelled" : "Register Now"}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] rounded-[32px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-[#7852A9]">Register for Event</DialogTitle>
                                            <DialogDescription>
                                                Fill in your details to secure your spot for "{event.title}".
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleRegisterSubmit} className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="Enter your full name"
                                                    value={regForm.name}
                                                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={regForm.email}
                                                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country</Label>
                                                <Input
                                                    id="country"
                                                    placeholder="e.g. Nigeria"
                                                    value={regForm.country}
                                                    onChange={(e) => setRegForm({ ...regForm, country: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    placeholder="e.g. +234..."
                                                    value={regForm.phone}
                                                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={isRegistering}
                                                className="w-full bg-[#7852A9] hover:bg-[#603e8a] py-6 text-lg font-bold rounded-xl mt-4"
                                            >
                                                {isRegistering ? <Loader2 className="animate-spin" /> : "Complete Registration"}
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                <p className="text-center text-xs text-gray-400 mt-4">
                                    By registering, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Additional Info Card */}
                        <div className="bg-[#EEE0FF]/50 border border-purple-100 rounded-[32px] p-6 text-center">
                            <Tag className="w-8 h-8 text-[#7852A9] mx-auto mb-3" />
                            <h4 className="font-bold text-[#7852A9]">Got Questions?</h4>
                            <p className="text-sm text-gray-600 mt-1">Contact our support team for any event inquiries.</p>
                            <Link href="#footer" className="text-[#7852A9] text-sm font-semibold mt-2 inline-block hover:underline">
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EventDetail;
