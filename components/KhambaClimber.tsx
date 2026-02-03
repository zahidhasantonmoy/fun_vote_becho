"use client";

import { useState, useEffect } from "react";
import { Zap, ArrowUp, AlertTriangle, Trophy } from "lucide-react";
import { playSound } from "@/utils/sound";

export default function KhambaClimber() {
    const [height, setHeight] = useState(0); // 0 to 100
    const [shocked, setShocked] = useState(false);
    const [won, setWon] = useState(false);

    const climb = () => {
        if (shocked || won) return;

        // 20% Chance of Shock
        if (Math.random() < 0.2) {
            triggerShock();
        } else {
            const newHeight = height + 10;
            if (newHeight >= 100) {
                setHeight(100);
                setWon(true);
                playSound("success");
            } else {
                setHeight(newHeight);
                playSound("click");
            }
        }
    };

    const triggerShock = () => {
        setShocked(true);
        playSound("error");
        setTimeout(() => {
            setHeight(0);
            setShocked(false);
        }, 1000);
    };

    const reset = () => {
        setHeight(0);
        setShocked(false);
        setWon(false);
        playSound("click");
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-700 rounded-xl my-8">
            <div className="max-w-md mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                    <Zap className="text-yellow-500" />
                    খাম্বা ক্লাইম্বার
                    <Zap className="text-yellow-500" />
                </h2>
                <p className="text-gray-500 mb-8">অবৈধ লাইন নেওয়ার জন্য খাম্বায় উঠুন। কারেন্ট থেকে সাবধান! ⚡</p>

                <div className="relative h-[400px] w-40 mx-auto bg-gray-300 dark:bg-gray-700 rounded-t-xl mb-4 overflow-hidden border-x-4 border-gray-400">
                    {/* Wires */}
                    <div className="absolute top-0 w-full h-8 bg-black/80 flex justify-between px-2 items-center">
                        <div className="h-[2px] w-full bg-gray-500"></div>
                        <Zap className="text-yellow-400 animate-pulse" size={16} />
                    </div>

                    {/* Progress Bar / Pole Marks */}
                    <div className="absolute inset-0 flex flex-col justify-evenly">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="h-1 w-full bg-black/10"></div>
                        ))}
                    </div>

                    {/* Character */}
                    <div
                        className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${shocked ? 'animate-bounce text-red-600' : 'text-primary'}`}
                        style={{ bottom: `${height}%` }}
                    >
                        {shocked ? <AlertTriangle size={48} /> :
                            won ? <Trophy size={48} className="text-yellow-500" /> :
                                <div className="bg-primary text-white p-2 rounded-full shadow-lg">🏃</div>
                        }
                    </div>
                </div>

                <div className="space-y-4">
                    {won ? (
                        <div className="animate-in zoom-in">
                            <h3 className="text-2xl font-bold text-green-600 mb-2">মিশন সাকসেস! 🎉</h3>
                            <p>অবৈধ লাইন সংযোগ সম্পন্ন।</p>
                            <button onClick={reset} className="mt-4 bg-black text-white px-6 py-2 rounded-full font-bold">আবার চুরির চেষ্টা করুন</button>
                        </div>
                    ) : (
                        <button
                            onClick={climb}
                            disabled={shocked}
                            className={`w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black text-xl py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 ${shocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {shocked ? "শক খাইছি! 😵" : "উপরে উঠুন 🔼"}
                        </button>
                    )}
                    <p className="text-xs text-gray-400">সতর্কতা: এটা শুধুমাত্র গেম। বাস্তবে খাম্বায় উঠবেন না!</p>
                </div>
            </div>
        </section>
    );
}
