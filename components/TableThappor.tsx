"use client";

import { useState } from "react";
import { Hand, Mic } from "lucide-react";
import { playSound } from "@/utils/sound";

export default function TableThappor() {
    const [anger, setAnger] = useState(0);
    const [journalists, setJournalists] = useState([true, true, true]); // 3 active mics

    const slap = () => {
        setAnger(a => Math.min(100, a + 15));
        playSound("stamp"); // Thud sound

        // Randomly silence a mic
        if (Math.random() > 0.5) {
            setJournalists(prev => {
                const arr = [...prev];
                const idx = Math.floor(Math.random() * arr.length);
                arr[idx] = false; // Silenced
                return arr;
            });
        }

        if (anger > 80) {
            // Shake effect logic could go here
        }
    };

    const reset = () => {
        setAnger(0);
        setJournalists([true, true, true]);
        playSound("click");
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900 border-2 border-red-200 dark:border-red-900 rounded-xl my-8">
            <div className="max-w-md mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-2 text-red-600">টেবিল থাপ্পড় 👋</h2>
                <p className="text-gray-500 mb-8">সাংবাদিকদের প্রশ্ন ভালো লাগছে না? টেবিলে জোরে থাপ্পড় দিন!</p>

                <div className="relative bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">

                    {/* Anger Meter */}
                    <div className="mb-6">
                        <div className="flex justify-between text-xs mb-1 font-bold text-red-500">
                            <span>মেজাজ</span>
                            <span>{anger}% 🔥</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-red-600 h-full transition-all duration-200" style={{ width: `${anger}%` }}></div>
                        </div>
                    </div>

                    {/* Scene */}
                    <div className="flex justify-center gap-4 mb-8">
                        {journalists.map((isActive, i) => (
                            <div key={i} className={`flex flex-col items-center transition-all ${isActive ? 'opacity-100' : 'opacity-30 scale-75 blur-sm'}`}>
                                <Mic className={`h-8 w-8 ${isActive ? 'text-gray-600 animate-pulse' : 'text-gray-300'}`} />
                                <span className="text-xs mt-1">{isActive ? '"প্রশ্ন আছে!"' : "চুপ..."}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onMouseDown={slap}
                        className="w-full h-32 bg-amber-800 hover:bg-amber-700 active:bg-amber-900 text-white font-black text-2xl rounded-lg shadow-b-8 border-b-8 border-amber-950 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center justify-center gap-2"
                    >
                        <Hand size={32} />
                        THAPPOR!
                    </button>

                    {journalists.every(j => !j) && (
                        <div className="mt-4 animate-in fade-in text-green-600 font-bold">
                            সবাই চুপ! প্রেস ব্রিফিং শেষ। 😤
                            <button onClick={reset} className="ml-2 text-xs underline text-gray-500">Reset</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
