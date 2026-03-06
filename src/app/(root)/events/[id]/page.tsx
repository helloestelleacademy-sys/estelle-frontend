"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * Redirection page to ensure users land on the unified Master-Detail layout
 */
const EventDetailRedirect = () => {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        if (id) {
            // Using replace to avoid back-button loops
            router.replace(`/events?id=${id}`);
        }
    }, [id, router]);

    return (
        <div className="flex bg-[#F7F0FF] h-screen items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#7852A9]" />
        </div>
    );
}

export default EventDetailRedirect;
