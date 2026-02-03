"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function VisitCounter() {
    const [visits, setVisits] = useState<number | null>(null);

    useEffect(() => {
        // Using countapi.xyz for a simple serverless counter
        // Namespace: vote-becho-prod (unique enough), Key: visits
        fetch("https://api.countapi.xyz/hit/vote-becho-prod/visits")
            .then((res) => res.json())
            .then((data) => setVisits(data.value))
            .catch((err) => console.error("Counter error:", err));
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
