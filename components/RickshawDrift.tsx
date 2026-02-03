"use client";

import { useState, useEffect, useRef } from "react";
import { playSound } from "@/utils/sound";
import { AlertTriangle, Bus } from "lucide-react";

export default function RickshawDrift() {
    const [lane, setLane] = useState(1); // 0, 1, 2 (Left, Center, Right)
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(10);
    const [traffic, setTraffic] = useState<any[]>([]);

    // Game Loop
    useEffect(() => {
        if (!isPlaying) return;

        const loop = setInterval(() => {
            setScore(s => s + 1);

            // Spawn Traffic
            if (Math.random() < 0.1) {
                setTraffic(prev => [...prev, {
                    id: Math.random(),
                    lane: Math.floor(Math.random() * 3),
                    y: -20
                }]);
            }

            // Move Traffic
            setTraffic(prev => {
                const nextTraffic: any[] = [];
                let crash = false;

                prev.forEach(car => {
                    const newY = car.y + speed / 5;

                    // Collision Check
                    if (newY > 80 && newY < 100 && car.lane === lane) {
                        crash = true;
                    }

                    if (newY < 120) {
                        nextTraffic.push({ ...car, y: newY });
                    }
                });

                if (crash) {
                    setIsPlaying(false);
                    playSound("siren");
                    return [];
                }

                return nextTraffic;
            });

            // Increase speed
            if (score % 200 === 0) setSpeed(s => s + 1);

        }, 50);

        return () => clearInterval(loop);
    }, [isPlaying, lane, score, speed]);

    const moveLeft = () => setLane(l => Math.max(0, l - 1));
    const moveRight = () => setLane(l => Math.min(2, l + 1));

    // Keyboard controls
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") moveLeft();
            if (e.key === "ArrowRight") moveRight();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900 border-2 border-orange-200 dark:border-orange-900 rounded-xl my-8 overflow-hidden">
            <div className="max-w-md mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-2 text-orange-600">রিকশা ড্রিফট 🛺</h2>
                <p className="text-gray-500 mb-8">রং সাইড দিয়ে চালান! বাস দেখলেই সাইড কাটবেন।</p>

                <div className="relative h-[400px] bg-gray-600 rounded-lg overflow-hidden border-4 border-gray-700 mx-auto shadow-2xl">

                    {/* Lanes */}
                    <div className="absolute inset-0 flex">
                        <div className="flex-1 border-r border-dashed border-white/30"></div>
                        <div className="flex-1 border-r border-dashed border-white/30"></div>
                        <div className="flex-1"></div>
                    </div>

                    {/* Score */}
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded font-mono text-xs">
                        স্কোর: {score}
                    </div>

                    {/* Rickshaw (Player) */}
                    <div
                        className="absolute bottom-4 transition-all duration-100 ease-linear text-4xl"
                        style={{ left: `${lane * 33 + 6}%` }} // Simplified centering
                    >
                        🛺
                    </div>

                    {/* Traffic */}
                    {traffic.map(car => (
                        <div
                            key={car.id}
                            className="absolute text-4xl transition-none"
                            style={{
                                left: `${car.lane * 33 + 6}%`,
                                top: `${car.y}%`
                            }}
                        >
                            🚌
                        </div>
                    ))}

                    {/* Game Over / Start */}
                    {!isPlaying && (
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-20">
                            {score > 0 && <h3 className="text-2xl font-bold text-red-500 mb-2">এক্সসিডেন্ট! 💥</h3>}
                            <p className="mb-4">ফাইনাল স্কোর: {score}</p>
                            <button
                                onClick={() => { setIsPlaying(true); setScore(0); setTraffic([]); setSpeed(10); playSound("click"); }}
                                className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-bold text-xl"
                            >
                                {score > 0 ? "আবার চালান" : "গেম শুরু"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-4 max-w-[200px] mx-auto">
                    <button onClick={moveLeft} className="bg-gray-200 dark:bg-zinc-700 p-4 rounded-full text-2xl active:scale-90">⬅️</button>
                    <button onClick={moveRight} className="bg-gray-200 dark:bg-zinc-700 p-4 rounded-full text-2xl active:scale-90">➡️</button>
                </div>
            </div>
        </section>
    );
}
