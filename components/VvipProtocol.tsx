"use client";

import { useState, useEffect } from "react";
import { Siren, CarFront, AlertCircle, ShieldAlert } from "lucide-react";
import { playSound } from "@/utils/sound";

export default function VvipProtocol() {
    const [laneA, setLaneA] = useState(0); // Ambulance pos (0-100)
    const [laneB, setLaneB] = useState(0); // VVIP pos (0-100)
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState<string | null>(null);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setLaneA(prev => {
                if (prev > 90) return prev; // Stopped at signal
                return prev + 1; // Ambulance moves steady
            });

            setLaneB(prev => {
                if (prev > 90) return prev;
                return prev + 2; // VVIP moves fast
            });

            // Fail Logic
            if (laneA >= 90) {
                failGame("আপনি অ্যাম্বুলেন্স ছেড়ে দিয়েছেন! ভিআইপি স্যারের দেরি হয়েছে। আপনি বরখাস্ত! 🚫");
            }
        }, 50);

        // Win Logic
        if (laneB >= 90 && laneA < 90) {
            // VVIP crossed, Ambulance stuck behind
            // But need to loop or finish? Let's just finish for simplicity
            setIsPlaying(false);
            setGameOver("সাবাস! অ্যাম্বুলেন্স আটকা রেখে ভিআইপি পার করেছেন। প্রমোশন কনফার্ম! ⭐");
            playSound("success");
        }

        return () => clearInterval(interval);
    }, [isPlaying, laneA, laneB]);

    const startGame = () => {
        setLaneA(0);
        setLaneB(0);
        setIsPlaying(true);
        setGameOver(null);
        playSound("click");
    };

    const stopAmbulance = () => {
        if (!isPlaying) return;
        // Actually, user interactions should likely hold the Ambulance BACK.
        // Simplification: User holds a button to stop Lane A?
        // Let's make it a 'Click to STOP' toggle

        // Actually, checking original satire: Police STOPS ambulance.
        // So if user clicks "Stop Lane A", ambulance progress resets or pauses?
        // Let's make it simpler: clicking "Signal Red" keeps Ambulance at 0.
    };

    // Re-thinking Logic for better interactivity
    // User acts as Traffic Police.
    // Lane A (Ambulance) automatically moves forward.
    // Lane B (VVIP) automatically moves forward.
    // User MUST click "STOP L A" repeatedly to push Ambulance back.
    // If Ambulance reaches 100 before VVIP, Game Over.

    const pushBackAmbulance = () => {
        if (!isPlaying) return;
        setLaneA(prev => Math.max(0, prev - 10)); // Push back
        playSound("siren");
    };

    const failGame = (reason: string) => {
        setIsPlaying(false);
        setGameOver(reason);
        playSound("error");
    };

    return (
        <section className="py-20 bg-background">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">গেম: "ভিআইপি প্রটোকল" 🚔</h2>
                <p className="text-gray-500 mb-8">আপনি ট্রাফিক সার্জেন্ট। ভিআইপি স্যার যাচ্ছেন, খবরদার অ্যাম্বুলেন্স যেন না নড়ে!</p>

                <div className="bg-gray-800 p-8 rounded-2xl relative overflow-hidden h-[400px] border-4 border-yellow-500">

                    {/* Lane A: Ambulance */}
                    <div className="absolute left-1/4 top-0 bottom-0 w-24 border-x-2 border-dashed border-white/20 flex flex-col justify-end pb-4">
                        <div
                            style={{ bottom: `${laneA}%` }}
                            className="absolute left-1/2 -translate-x-1/2 transition-all duration-100"
                        >
                            <div className="bg-white text-red-600 p-2 rounded shadow-lg animate-pulse">
                                <AmbulanceIcon />
                            </div>
                        </div>
                    </div>

                    {/* Lane B: VVIP */}
                    <div className="absolute right-1/4 top-0 bottom-0 w-24 border-x-2 border-dashed border-white/20 flex flex-col justify-end pb-4">
                        <div
                            style={{ bottom: `${laneB}%` }}
                            className="absolute left-1/2 -translate-x-1/2 transition-all duration-100"
                        >
                            <div className="bg-black text-yellow-500 p-2 rounded shadow-lg ring-2 ring-yellow-500">
                                <CarFront size={40} />
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    {isPlaying && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                            <button
                                onMouseDown={pushBackAmbulance}
                                onTouchStart={pushBackAmbulance}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-xl border-4 border-red-800 active:scale-95 select-none"
                            >
                                <ShieldAlert className="inline mr-2" />
                                অ্যাম্বুলেন্স থামান! (ক্লিক করুন)
                            </button>
                            <p className="absolute bottom-[-30px] text-white/50 text-xs">দ্রুত ক্লিক করে অ্যাম্বুলেন্স আটকা রাখুন</p>
                        </div>
                    )}

                    {/* Overlay */}
                    {!isPlaying && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 p-4">
                            {gameOver ? (
                                <>
                                    <div className="text-xl font-bold text-white mb-4 text-center">{gameOver}</div>
                                    <button onClick={startGame} className="bg-white text-black px-6 py-2 rounded-full font-bold">আবার ডিউটি দিন</button>
                                </>
                            ) : (
                                <button onClick={startGame} className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold text-xl hover:scale-110 transition-transform">
                                    ডিউটি শুরু করুন
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function AmbulanceIcon() {
    return (
        <div className="flex flex-col items-center">
            <Siren className="animate-spin text-red-500 mb-1 h-4 w-4" />
            <AlertCircle size={40} />
        </div>
    )
}
