"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function VisitCounter() {
    const [visits, setVisits] = useState<number | null>(null);

    useEffect(() => {
        // Switching to counterapi.dev as countapi.xyz might be unstable/blocked
        const fetchVisits = async () => {
            try {
                const res = await fetch("https://api.counterapi.dev/v1/vote-becho/visits/up");
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setVisits(data.count);
            } catch (err) {
                // Fail silently or show fallback to avoid console spam for user
                console.warn("Visit counter failed to load (likely ad-blocker):", err);
                setVisits(420); // Fallback satire number
            }
        };

        fetchVisits();
    }, []);

    return (
        <div className="inline-block bg-black/30 px-4 py-2 rounded-full border border-gray-800 backdrop-blur-sm mt-4">
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">মোট ভিজিটর:</span>
                <span className="font-mono text-green-400 font-bold tracking-widest min-w-[3ch] text-center">
                    {visits !== null ? visits.toLocaleString("bn-BD") : "..."}
                </span>
            </div>
        </div>
    );
}
