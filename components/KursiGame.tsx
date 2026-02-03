"use client";

import { useState, useEffect } from "react";
import { Armchair, Trophy } from "lucide-react";

export default function KursiGame() {
    const [position, setPosition] = useState({ top: 50, left: 50 });
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;

        // Move chair automatically every 800ms to mimic elusive power
        const interval = setInterval(() => {
            moveChair();
            setMisses(m => m + 1); // Passive penalty for not catching
        }, 800);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const moveChair = () => {
        const top = Math.random() * 80 + 10; // 10% to 90%
        const left = Math.random() * 80 + 10;
        setPosition({ top, left });
    };

    const handleCatch = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScore(s => s + 1);
        setMisses(m => Math.max(0, m - 1)); // Catching reduces penalty
        moveChair(); // Move immediately on catch
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">গেম: "চেয়ার বাঁচাও" 🪑</h2>
                <p className="text-gray-500 mb-8">ক্ষমতার চেয়ার বড় পিচ্ছিল। ধরে রাখতে পারলে আপনি রাজা!</p>

                <div className={`relative w-full h-[400px] bg-white dark:bg-black rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden cursor-crosshair ${!isPlaying && 'flex items-center justify-center'}`}>

                    {isPlaying ? (
                        <>
                            {/* Score HUD */}
                            <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg z-10">
                                ক্ষমতা: {score} মাস
                            </div>
                            <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg z-10">
                                হুমকি: {misses}%
                            </div>

                            {/* The Chair */}
                            <div
                                onClick={handleCatch}
                                style={{ top: `${position.top}%`, left: `${position.left}%` }}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 p-4"
                            >
                                <Armchair className="h-16 w-16 text-yellow-500 drop-shadow-xl" />
                            </div>

                            {/* Game Over Condition */}
                            {misses >= 20 && (
                                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-50 animate-in fade-in">
                                    <h3 className="text-4xl font-bold text-red-500 mb-4">গেম ওভার! 😭</h3>
                                    <p className="text-xl mb-4">বিরোধী দল আন্দোলন করে চেয়ার নিয়ে গেছে।</p>
                                    <button
                                        onClick={() => {
                                            setMisses(0);
                                            setScore(0);
                                        }}
                                        className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400"
                                    >
                                        আবার চেষ্টা করুন (কারচুপি করে)
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center">
                            <Trophy className="h-20 w-20 mx-auto text-yellow-500 mb-4" />
                            <button
                                onClick={() => setIsPlaying(true)}
                                className="bg-primary hover:bg-primary-hover text-white text-xl px-10 py-4 rounded-full font-bold shadow-xl transition-transform hover:scale-105"
                            >
                                গেম শুরু করুন
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
