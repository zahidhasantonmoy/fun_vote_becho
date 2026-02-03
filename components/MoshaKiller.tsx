"use client";

import { useState, useEffect } from "react";
import { Bug, SprayCan } from "lucide-react";
import { playSound } from "@/utils/sound";

type Mosha = {
    id: number;
    x: number;
    y: number;
    dead: boolean;
};

export default function MoshaKiller() {
    const [moshas, setMoshas] = useState<Mosha[]>([]);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);

    // Timer
    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    setIsPlaying(false);
                    playSound("success");
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isPlaying]);

    // Spawner
    useEffect(() => {
        if (!isPlaying) return;
        const spawner = setInterval(() => {
            if (moshas.length < 5) {
                setMoshas(prev => [...prev, {
                    id: Math.random(),
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 80 + 10,
                    dead: false
                }]);
            }
        }, 800);
        return () => clearInterval(spawner);
    }, [isPlaying, moshas.length]);

    const killMosha = (id: number) => {
        setMoshas(prev => prev.map(m => {
            if (m.id === id && !m.dead) {
                playSound("stamp"); // Splat sound
                setScore(s => s + 1);
                return { ...m, dead: true };
            }
            return m;
        }));
        // Remove dead mosha after short delay
        setTimeout(() => {
            setMoshas(prev => prev.filter(m => m.id !== id));
        }, 500);
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900 border-2 border-red-200 dark:border-red-900 rounded-xl my-8">
            <div className="max-w-md mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-2 text-red-600 flex items-center justify-center gap-2">
                    <Bug /> মশা মারার গেম <Bug />
                </h2>
                <p className="text-gray-500 mb-8">মেয়র মশা মারতে ব্যস্ত। আপনিও সাহায্য করুন। ডেঙ্গু থেকে বাঁচুন!</p>

                <div className="relative h-[400px] w-full bg-white dark:bg-zinc-800 rounded-xl overflow-hidden border-2 border-gray-300 shadow-inner cursor-crosshair">

                    <div className="absolute top-2 left-2 font-bold text-gray-500">সময়: {timeLeft}s</div>
                    <div className="absolute top-2 right-2 font-bold text-red-600">কিল: {score}</div>

                    {/* Start Screen */}
                    {!isPlaying && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-4">{score > 0 ? `মেরেছেন: ${score} টি` : "মশা নিধন অভিযান"}</h3>
                            <button
                                onClick={() => { setIsPlaying(true); setScore(0); setTimeLeft(20); setMoshas([]); playSound("click"); }}
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2"
                            >
                                <SprayCan /> শুরু করুন
                            </button>
                        </div>
                    )}

                    {/* Moshas */}
                    {moshas.map(m => (
                        <div
                            key={m.id}
                            onClick={() => killMosha(m.id)}
                            className={`absolute transition-transform duration-100 ${m.dead ? 'scale-150 opacity-50' : 'animate-bounce'}`}
                            style={{ left: `${m.x}%`, top: `${m.y}%` }}
                        >
                            <div className="text-4xl select-none">
                                {m.dead ? "💥" : "🦟"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
