"use client";

import { useState, useEffect, useRef } from "react";
import { Utensils, Award } from "lucide-react";
import { playSound } from "@/utils/sound";

export default function BiryaniRun() {
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    // Player position (percentage 0-100)
    const [position, setPosition] = useState(50);
    // Falling items: { id, left (0-100), top (0-100), type: 'biryani' | 'brick' }
    const [items, setItems] = useState<any[]>([]);

    // Game Loop
    useEffect(() => {
        if (!gameStarted) return;

        const interval = setInterval(() => {
            if (timeLeft <= 0) {
                setGameStarted(false);
                playSound("success");
                return;
            }
            setTimeLeft(t => t - 1);
        }, 1000);

        const gameLoop = setInterval(() => {
            if (timeLeft <= 0) return;

            // Spawn Items randomly
            if (Math.random() < 0.2) {
                setItems(prev => [
                    ...prev,
                    {
                        id: Math.random(),
                        left: Math.random() * 90,
                        top: 0,
                        type: Math.random() > 0.3 ? 'biryani' : 'brick'
                    }
                ]);
            }

            // Move Items & Check Collision
            setItems(prev => {
                const nextItems: any[] = [];
                prev.forEach(item => {
                    const newTop = item.top + 5; // Fall speed

                    // Collision Check
                    // Player is at bottom (90% top), width approx 10%
                    if (newTop > 80 && newTop < 95 && Math.abs(item.left - position) < 10) {
                        // Collided
                        if (item.type === 'biryani') {
                            setScore(s => s + 1);
                            playSound("cash");
                        } else {
                            setScore(s => Math.max(0, s - 2)); // Penalty
                            playSound("error");
                        }
                    } else if (newTop < 100) {
                        nextItems.push({ ...item, top: newTop });
                    }
                });
                return nextItems;
            });

        }, 50);

        return () => {
            clearInterval(interval);
            clearInterval(gameLoop);
        };
    }, [gameStarted, timeLeft, position]);

    const moveLeft = () => setPosition(p => Math.max(0, p - 10));
    const moveRight = () => setPosition(p => Math.min(90, p + 10));

    // Keyboard support
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!gameStarted) return;
            if (e.key === "ArrowLeft") moveLeft();
            if (e.key === "ArrowRight") moveRight();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [gameStarted]);

    return (
        <section className="py-20 bg-background border-2 border-primary/20 rounded-xl my-8 overflow-hidden">
            <div className="max-w-xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-2 text-primary">বিরিয়ানি হান্টার 🍛</h2>
                <p className="text-gray-500 mb-8">মিছিলে বিরিয়ানি দিচ্ছে! প্যাকেট ধরুন, কিন্তু ইটের পাটকেল থেকে সাবধান।</p>

                <div className="relative h-[300px] w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border-b-4 border-gray-400 select-none">

                    {/* Score Limit */}
                    <div className="absolute top-2 left-2 bg-white/80 px-3 py-1 rounded font-bold text-sm">
                        সময়: {timeLeft}s | প্যাকেট: {score}
                    </div>

                    {/* Start Screen */}
                    {!gameStarted && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm text-white">
                            {timeLeft === 0 ? (
                                <>
                                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">ফলাফল: {score} প্যাকেট!</h3>
                                    <p className="mb-4 text-sm opacity-80">{score > 5 ? "পেট ভরে গেছে!" : "নেতা বিরিয়ানি দেয় নাই?"}</p>
                                    <button
                                        onClick={() => { setTimeLeft(15); setScore(0); setGameStarted(true); setItems([]); playSound("click"); }}
                                        className="bg-primary hover:bg-primary-hover px-6 py-2 rounded-full font-bold"
                                    >
                                        আবার খান
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => { setGameStarted(true); playSound("click"); }}
                                    className="bg-primary hover:bg-primary-hover px-8 py-3 rounded-full font-bold text-xl shadow-lg animate-bounce"
                                >
                                    খেলা শুরু
                                </button>
                            )}
                        </div>
                    )}

                    {/* Falling Items */}
                    {items.map(item => (
                        <div
                            key={item.id}
                            className="absolute text-2xl transition-all duration-75"
                            style={{ left: `${item.left}%`, top: `${item.top}%` }}
                        >
                            {item.type === 'biryani' ? '🍱' : '🧱'}
                        </div>
                    ))}

                    {/* Player */}
                    <div
                        className="absolute bottom-0 text-4xl transition-all duration-100"
                        style={{ left: `${position}%` }}
                    >
                        🏃‍♂️
                    </div>
                </div>

                {/* Touch Controls */}
                <div className="flex gap-4 mt-4 justify-center">
                    <button onClick={moveLeft} className="p-4 bg-gray-200 dark:bg-zinc-700 rounded-full active:scale-90">⬅️</button>
                    <button onClick={moveRight} className="p-4 bg-gray-200 dark:bg-zinc-700 rounded-full active:scale-90">➡️</button>
                </div>
            </div>
        </section>
    );
}
