"use client";

import { useGetAllEventsQuery, useRegisterForEventMutation } from "@/redux/api/eventApi";
import React, { useState, useEffect, Suspense } from "react";
import EventCard from "@/components/main/EventCard";
import { Loader2, Calendar, MapPin, Users, CheckCircle, CheckCircle2, ArrowRight, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

const EventsContent = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const searchParams = useSearchParams();
    const initialId = searchParams.get('id');

    const { data, isLoading, error } = useGetAllEventsQuery();
    const [selectedEventId, setSelectedEventId] = useState<string | null>(initialId);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const [regForm, setRegForm] = useState({
        name: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "",
        email: user?.email || "",
        country: "",
        phone: ""
    });

    const [registerForEvent, { isLoading: isRegistering }] = useRegisterForEventMutation();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.origin + window.location.pathname);
        }
    }, [selectedEventId]);

    useEffect(() => {
        if (data?.events && data.events.length > 0 && !selectedEventId) {
            setSelectedEventId(data.events[0]._id);
        }
    }, [data, selectedEventId]);

    useEffect(() => {
        if (initialId) {
            setSelectedEventId(initialId);
        }
    }, [initialId]);

    const selectedEvent = data?.events.find(e => e._id === selectedEventId);

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEvent) return;

        if (!regForm.name || !regForm.email || !regForm.country || !regForm.phone) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            await registerForEvent({
                eventId: selectedEvent._id,
                ...regForm
            }).unwrap();

            toast.success("Successfully registered for the event!");
            setIsRegisterModalOpen(false);
            // Close the registration dialog, then open the Telegram modal.
            // Using a microtask avoids both dialogs competing for focus.
            setTimeout(() => setIsTelegramModalOpen(true), 0);
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to register. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex bg-white h-screen items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#7852A9]" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
            <header className="mb-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge className="bg-[#EEE0FF]/30 text-[#7852A9] hover:bg-[#EEE0FF] border-[#7852A9]/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
                        Experience Estelle
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7852A9] to-[#37296D]">Events</span>
                    </h1>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Master Column: Event List */}
                <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-4 h-[calc(100vh-300px)] overflow-y-auto pr-3 custom-scrollbar space-y-3"
                >
                    {error && (
                        <div className="p-6 text-center bg-red-50 text-red-500 rounded-2xl border border-red-100">
                            Failed to load events.
                        </div>
                    )}
                    {!error && data?.events.length === 0 && (
                        <div className="p-10 text-center bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 text-gray-400 font-bold">
                            No events planned yet.
                        </div>
                    )}
                    {data?.events.map((event) => (
                        <EventCard
                            key={event._id}
                            id={event._id}
                            title={event.title}
                            date={event.date}
                            location={event.location}
                            price={event.price}
                            isSelected={selectedEventId === event._id}
                            onClick={() => setSelectedEventId(event._id)}
                        />
                    ))}
                </motion.div>

                {/* Detail Column: Event Details */}
                <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-8"
                >
                    <AnimatePresence mode="wait">
                        {selectedEvent ? (
                            <motion.div
                                key={selectedEvent._id}
                                initial={{ opacity: 0, scale: 0.99, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.99, y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-12 gap-0 bg-white/70 backdrop-blur-3xl rounded-[40px] overflow-hidden shadow-2xl shadow-purple-900/5 border border-white"
                            >
                                {/* Details Section */}
                                <div className="md:col-span-7 p-8 md:p-10 lg:p-12 space-y-8">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[#7852A9]" />
                                            <span className="text-[#7852A9] text-[10px] font-black uppercase tracking-[0.2em]">{selectedEvent.subText || 'Masterclass'}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                                            {selectedEvent.title}
                                        </h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white shadow-sm font-bold text-xs text-gray-600">
                                            <Calendar className="w-3.5 h-3.5 text-[#7852A9]" />
                                            <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white shadow-sm font-bold text-xs text-gray-600">
                                            <MapPin className="w-3.5 h-3.5 text-[#7852A9]" />
                                            <span>{selectedEvent.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#7852A9]/10 px-4 py-2 rounded-xl border border-[#7852A9]/5 text-xs font-black text-[#7852A9]">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{selectedEvent.registeredCount} SECURED</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            About
                                        </h3>
                                        <p className="text-gray-500 text-base leading-relaxed font-medium">
                                            {selectedEvent.description}
                                        </p>
                                    </div>

                                    {selectedEvent.learningPoints && selectedEvent.learningPoints.length > 0 && (
                                        <div className="space-y-4 pt-6 border-t border-gray-50">
                                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Takeaways</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {selectedEvent.learningPoints.map((point, idx) => (
                                                    <motion.div
                                                        key={point}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 + idx * 0.05 }}
                                                        className="flex items-center gap-3 bg-white/20 p-3 rounded-xl border border-white/40 group transition-all hover:bg-white"
                                                    >
                                                        <div className="bg-[#7852A9] rounded-lg p-1.5 shrink-0 shadow-lg shadow-purple-900/10">
                                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                                        </div>
                                                        <p className="text-gray-700 font-bold text-[13px] leading-tight group-hover:text-[#7852A9] transition-colors">{point}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar/Action Section */}
                                <div className="md:col-span-5 bg-gradient-to-br from-[#7852A9] to-[#37296D] p-8 md:p-10 lg:p-12 flex flex-col justify-between text-white relative">
                                    <div className="space-y-6 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-purple-200 uppercase tracking-widest">Investment</p>
                                                <p className="text-5xl font-black">
                                                    {selectedEvent.price === 0 ? 'FREE' : `₦${selectedEvent.price.toLocaleString()}`}
                                                </p>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                                                <Users className="w-5 h-5 text-purple-100" />
                                            </div>
                                        </div>

                                        <div className="bg-white/15 backdrop-blur-xl rounded-[32px] p-5 border border-white/20 space-y-4 shadow-2xl">
                                            <div className="flex items-center justify-between px-1">
                                                <p className="text-[9px] font-black text-purple-100 uppercase tracking-widest italic">Digital Pass</p>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-green-400" />)}
                                                </div>
                                            </div>
                                            <div className="flex justify-center p-3 bg-white rounded-2xl shadow-inner relative group cursor-pointer">
                                                {currentUrl && (
                                                    <QRCodeSVG
                                                        value={`${currentUrl}?id=${selectedEvent._id}`}
                                                        size={130}
                                                        level="H"
                                                        includeMargin={false}
                                                        imageSettings={{
                                                            src: "/assets/Estellelogonew2.png",
                                                            x: undefined,
                                                            y: undefined,
                                                            height: 28,
                                                            width: 28,
                                                            excavate: true,
                                                        }}
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors rounded-2xl" />
                                            </div>
                                            <p className="text-[9px] text-center text-purple-200 font-bold uppercase tracking-tight">Scan for mobile Access</p>
                                        </div>
                                    </div>

                                    <div className="pt-8 relative z-10">
                                        <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    disabled={isRegistering || selectedEvent.status === 'cancelled' || new Date(selectedEvent.date) < new Date()}
                                                    className="w-full bg-white hover:bg-purple-50 text-[#7852A9] h-16 rounded-2xl text-xl font-black shadow-2xl transition-all active:scale-[0.97] group border-none"
                                                >
                                                    Get Started
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[440px] rounded-[40px] border-none shadow-3xl p-0 overflow-hidden">
                                                <div className="bg-[#7852A9] p-8 text-white">
                                                    <DialogTitle className="text-2xl font-black italic">Final Step</DialogTitle>
                                                    <DialogDescription className="text-purple-100/70 text-sm font-bold">
                                                        Secure your attendance for "{selectedEvent.title}"
                                                    </DialogDescription>
                                                </div>
                                                <form onSubmit={handleRegisterSubmit} className="p-8 space-y-5 bg-white">
                                                    <div className="space-y-4">
                                                        <div className="space-y-1.5">
                                                            <Label htmlFor="name" className="text-[10px] font-black text-gray-400 uppercase ml-1">Full Identity</Label>
                                                            <Input
                                                                id="name"
                                                                placeholder="John Doe"
                                                                value={regForm.name}
                                                                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                                                                required
                                                                className="rounded-xl border-stone-100 bg-stone-50 h-12 px-4 font-bold placeholder:font-medium text-sm"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase ml-1">Email Node</Label>
                                                            <Input
                                                                id="email"
                                                                type="email"
                                                                placeholder="john@example.com"
                                                                value={regForm.email}
                                                                onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                                                                required
                                                                className="rounded-xl border-stone-100 bg-stone-50 h-12 px-4"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-1.5">
                                                                <Label htmlFor="country" className="text-[10px] font-black text-gray-400 uppercase ml-1">Region</Label>
                                                                <Input
                                                                    id="country"
                                                                    placeholder="Country"
                                                                    value={regForm.country}
                                                                    onChange={(e) => setRegForm({ ...regForm, country: e.target.value })}
                                                                    required
                                                                    className="rounded-xl border-stone-100 bg-stone-50 h-12 px-4"
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label htmlFor="phone" className="text-[10px] font-black text-gray-400 uppercase ml-1">Contact</Label>
                                                                <Input
                                                                    id="phone"
                                                                    placeholder="Phone"
                                                                    value={regForm.phone}
                                                                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                                                                    required
                                                                    className="rounded-xl border-stone-100 bg-stone-50 h-12 px-4"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="submit"
                                                        disabled={isRegistering}
                                                        className="w-full bg-[#7852A9] hover:bg-[#603e8a] h-14 text-base font-black rounded-xl mt-2 tracking-wide"
                                                    >
                                                        {isRegistering ? <Loader2 className="animate-spin" /> : "Confirm My Spot"}
                                                    </Button>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    <Dialog open={isTelegramModalOpen} onOpenChange={setIsTelegramModalOpen}>
                                        <DialogContent className="sm:max-w-[440px] rounded-[40px] border-none shadow-3xl p-0 overflow-hidden">
                                            <div className="bg-[#7852A9] p-8 text-white">
                                                <DialogTitle className="text-2xl font-black italic">Join Telegram</DialogTitle>
                                                <DialogDescription className="text-purple-100/70 text-sm font-bold mt-2">
                                                    Stay updated about the event and community.
                                                </DialogDescription>
                                            </div>
                                            <div className="p-8 space-y-6 bg-white">
                                                <p className="text-sm text-gray-600 font-semibold">
                                                    Click below to join our Telegram channel.
                                                </p>
                                                <Button asChild className="w-full bg-[#7852A9] hover:bg-[#603e8a] h-14 text-base font-black rounded-xl tracking-wide">
                                                    <a
                                                        href="https://t.me/+P_SDXIY3evk1YmNk"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Join Telegram
                                                        <ArrowRight className="w-5 h-5 ml-2" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-[40px] border-2 border-dashed border-gray-200 min-h-[500px] text-center p-12">
                                <p className="text-gray-400 font-black text-lg uppercase tracking-widest italic">Selection Required</p>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

const EventsPage = () => {
    return (
        <main className="min-h-screen relative bg-white overflow-hidden pb-12">
            {/* Premium Background */}
            <HeroGeometric className="absolute inset-0 z-0 bg-white" />

            <div className="relative pt-24 lg:pt-28">
                <Suspense fallback={
                    <div className="flex h-screen items-center justify-center">
                        <Loader2 className="w-10 h-10 animate-spin text-[#7852A9]" />
                    </div>
                }>
                    <EventsContent />
                </Suspense>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #EEE0FF;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #7852A9;
                }
            `}</style>
        </main>
    )
}

export default EventsPage;
