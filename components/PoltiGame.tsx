"use client";

import { useState } from "react";
import { User, DollarSign } from "lucide-react";

export default function PoltiGame() {
    const [party, setParty] = useState<"team-a" | "team-b" | "neutral">("neutral");
    const [score, setScore] = useState(0);

    const handleOffer = () => {
        // Randomly flip side
        const newParty = Math.random() > 0.5 ? "team-a" : "team-b";
        setParty(newParty);
        setScore(s => s + 1);
    };

    return (
        <section className="py-20 bg-background">
            <div className="max-w-xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">ডিজিটাল পল্টিবাজি</h2>
                <p className="text-gray-500 mb-8">যার টাকা বেশি, আমি তার। অফার করুন আর দেখুন ম্যাজিক!</p>

                <div className="bg-gray-100 dark:bg-zinc-800 p-8 rounded-2xl flex flex-col items-center gap-8 relative overflow-hidden">

                    <div className="absolute top-4 right-4 bg-black/20 px-3 py-1 rounded-full text-xs font-mono">
                        পল্টি কাউন্ট: {score}
                    </div>

                    <div className={`transition-all duration-300 transform ${party === 'team-a' ? '-translate-x-12' : party === 'team-b' ? 'translate-x-12' : ''}`}>
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 shadow-xl transition-colors duration-300 ${party === 'team-a' ? 'bg-green-500 border-green-700' : party === 'team-b' ? 'bg-red-500 border-red-700' : 'bg-gray-400 border-gray-600'}`}>
                            <User className="h-20 w-20 text-white" />
                        </div>
                        <div className="mt-2 font-bold text-lg">
                            {party === 'team-a' ? "দলে আছি ✅" : party === 'team-b' ? "বিদ্রোহী 😡" : "নিরপেক্ষ 🤔"}
                        </div>
                    </div>

                    <button
                        onClick={handleOffer}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all w-full justify-center"
                    >
                        <DollarSign className="h-5 w-5" />
                        বড় অফার দিন
                    </button>
                </div>
            </div>
        </section>
    );
}
