"use client";

import React from "react";
import Image from "next/image";
import { useUserProfileQuery } from "@/redux/api/userApi";
import Pricing from "@/components/ui/pricing-cards";
import { Loader2, User as UserIcon, Mail, BadgeCheck, MapPin, Phone } from "lucide-react";

export default function ProfilePage() {
    const { data: user, isLoading } = useUserProfileQuery();

    if (isLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#7852A9]" />
            </div>
        );
    }

    if (!user) {
        return <div className="p-8 text-center">User not found.</div>;
    }

    return (
        <section className="w-full pb-20">
            <h1 className="mb-8 text-3xl font-bold">My Account</h1>

            {/* Profile Info Card */}
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="relative h-24 w-24 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-full border-4 border-[#7852A9]/10">
                    <Image
                        src={user.img || "https://i.pravatar.cc/150?img=3"}
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                        {user.plan && user.plan !== 'Free' && (
                            <span className="rounded-full bg-[#7852A9] px-3 py-1 text-xs font-medium text-white shadow-sm">
                                {user.plan} Member
                            </span>
                        )}
                        {user.role === 'admin' && (
                            <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white shadow-sm">
                                Admin
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">{user.email}</span>
                        </div>
                        {/* Placeholder fields if user object has them later */}
                        {/* 
                        <div className="flex items-center gap-2 text-gray-500">
                             <Phone className="h-4 w-4" />
                             <span className="text-sm">{user.phone || "No phone added"}</span>
                        </div> 
                        */}
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="mt-12">
                <h2 className="mb-4 text-2xl font-semibold">Subscription Plans</h2>
                <div className="rounded-3xl bg-gray-50/50 border border-gray-100 p-0 overflow-hidden">
                    <Pricing />
                </div>
            </div>
        </section>
    );
}
