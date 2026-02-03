"use client";

import { useState, useEffect } from "react";
import { Moon, MousePointer2 } from "lucide-react";
import { playSound } from "@/utils/sound";

export default function RaterVote() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        if (!isPlaying) return;

        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else {
            // Game Over
            setIsPlaying(false);
            playSound("success");
        }
    }, [isPlaying, timeLeft]);

    const startGame = () => {
        setIsPlaying(true);
        setTimeLeft(10);
        setVotes(0);
        playSound("click");
    };

    const castVote = () => {
        if (isPlaying) {
            setVotes(v => v + 50); // One click = 50 fraudulent votes
            playSound("stamp");
        }
    };

    return (
        <section className="py-20 bg-background relative z-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">গেম: "রাতের ভোট" ট্রেনিং 🌑</h2>
                <p className="text-gray-500 mb-8">কারেন্ট নাই? সমস্যা নাই! অন্ধকারে ভোট দেওয়ার প্র্যাকটিস করুন।</p>

                <div className="relative h-[300px] w-full max-w-lg mx-auto bg-gray-200 dark:bg-zinc-800 rounded-2xl overflow-hidden border-4 border-gray-400">

                    {/* Result Screen */}
                    {!isPlaying && votes > 0 && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 dark:bg-black/90 p-4">
                            <h3 className="text-2xl font-bold text-green-600 mb-2">অভিনন্দন! 🎉</h3>
                            <p className="text-xl">১০ সেকেন্ডে আপনি <span className="font-bold text-primary">{votes}</span> টি ভোট দিয়েছেন!</p>
                            <p className="text-gray-500 italic mt-2">"গণতন্ত্র এখন সম্পূর্ণ নিরাপদ।"</p>
                            <button onClick={startGame} className="mt-4 bg-black text-white px-6 py-2 rounded-full">আবার করুন</button>
                        </div>
                    )}

                    {/* Start Screen */}
                    {!isPlaying && votes === 0 && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <Moon className="h-16 w-16 text-gray-400 mb-4" />
                            <button
                                onClick={startGame}
                                className="bg-black hover:bg-gray-800 text-white text-xl px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
                            >
                                ট্রেনিং শুরু করুন
                            </button>
                        </div>
                    )}

                    {/* Gameplay Overlay (The Dark Mode) */}
                    {isPlaying && (
                        <div
                            onClick={castVote}
                            className="absolute inset-0 bg-black cursor-crosshair z-10 flex items-center justify-center active:bg-gray-900 transition-colors select-none"
                        >
                            <div className="text-gray-800 pointer-events-none text-center">
                                <h2 className="text-6xl font-black opacity-10">{timeLeft}</h2>
                                <p className="opacity-20">ক্লিক করুন!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
