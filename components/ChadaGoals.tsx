"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

export default function ChadaGoals() {
    const [progress, setProgress] = useState(15);

    useEffect(() => {
        // Simulate live donations
        const interval = setInterval(() => {
            setProgress(p => Math.min(p + 0.5, 100));
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp className="text-green-500" />
                        আজকের 'চাঁদা' কালেকশন
                    </h2>
                    <span className="font-mono font-bold text-primary animate-pulse">
                        {(progress * 12345).toLocaleString('bn-BD')} টাকা
                    </span>
                </div>

                <div className="relative w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 relative transition-all duration-300 flex items-center justify-end pr-4 text-white font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                        style={{ width: `${progress}%` }}
                    >
                        <span className="drop-shadow-md">নেতার নতুন গাড়ি 🚗</span>
                    </div>

                    {/* Milestones markers pattern */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
                </div>

                <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                    <span>০ টাকা</span>
                    <span>৫০% (ফ্ল্যাট বুকিং)</span>
                    <span>১০০% (সুইজারল্যান্ড টিপ)</span>
                </div>
            </div>
        </section>
    );
}
