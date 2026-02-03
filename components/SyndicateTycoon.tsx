"use client";

import { useState, useEffect } from "react";
import { TrendingUp, AlertTriangle, BadgeDollarSign } from "lucide-react";

export default function SyndicateTycoon() {
    const [prices, setPrices] = useState({ onion: 50, chili: 100, egg: 12 });
    const [profit, setProfit] = useState(0);
    const [publicAnger, setPublicAnger] = useState(10);
    const [isGameOver, setIsGameOver] = useState(false);

    // Auto-reduce anger slowly (public forgets quickly)
    useEffect(() => {
        if (isGameOver) return;
        const interval = setInterval(() => {
            setPublicAnger(prev => Math.max(0, prev - 2));
        }, 1000);
        return () => clearInterval(interval);
    }, [isGameOver]);

    const handlePriceChange = (item: "onion" | "chili" | "egg", change: number) => {
        if (isGameOver) return;

        setPrices(prev => {
            const newPrice = Math.max(10, prev[item] + change);

            if (change > 0) {
                // Increasing price increases profit AND anger
                setProfit(p => p + (change * 1000));
                setPublicAnger(a => Math.min(100, a + (change * 0.5)));
            }
            return { ...prev, [item]: newPrice };
        });
    };

    useEffect(() => {
        if (publicAnger >= 100) {
            setIsGameOver(true);
        }
    }, [publicAnger]);

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2">মার্কেট সিন্ডিকেট টাইকুন 🤵</h2>
                <p className="text-center text-gray-500 mb-10">দাম বাড়ান, পাবলিক কাঁদুক, পকেট ভরুক। (সাবধানে, পাবলিক ক্ষেপে গেলে গেম ওভার!)</p>

                {isGameOver ? (
                    <div className="bg-red-600 text-white p-10 rounded-2xl text-center animate-bounce">
                        <AlertTriangle className="h-20 w-20 mx-auto mb-4" />
                        <h3 className="text-4xl font-bold mb-4">গণধোলাই! 🩹</h3>
                        <p className="text-xl">পাবলিক অনেক ক্ষেপেছে। আপনাকে দেশ ছেড়ে পালাতে হবে।</p>
                        <p className="mt-4 font-mono bg-black/20 inline-block px-4 py-2 rounded">মোট লাভ: {profit.toLocaleString()} টাকা</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="block mx-auto mt-8 bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            আবার লুটপাট করুন
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Controls */}
                        <div className="space-y-6">
                            {/* Onion */}
                            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-lg">🧅 পেঁয়াজ (কেজি)</span>
                                    <span className="font-mono text-2xl text-primary">{prices.onion} ৳</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handlePriceChange("onion", -10)} className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2 rounded-lg">-১০</button>
                                    <button onClick={() => handlePriceChange("onion", 10)} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 rounded-lg">+১০</button>
                                </div>
                            </div>

                            {/* Chili */}
                            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-lg">🌶️ কাঁচা মরিচ (কেজি)</span>
                                    <span className="font-mono text-2xl text-primary">{prices.chili} ৳</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handlePriceChange("chili", -20)} className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2 rounded-lg">-২০</button>
                                    <button onClick={() => handlePriceChange("chili", 20)} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 rounded-lg">+২০</button>
                                </div>
                            </div>

                            {/* Egg */}
                            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-lg">🥚 ডিম (হালি)</span>
                                    <span className="font-mono text-2xl text-primary">{prices.egg} ৳</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handlePriceChange("egg", -5)} className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2 rounded-lg">-৫</button>
                                    <button onClick={() => handlePriceChange("egg", 5)} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 rounded-lg">+৫</button>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard */}
                        <div className="bg-black text-white p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
                            <div className="z-10">
                                <h3 className="text-gray-400 mb-2 font-bold uppercase tracking-widest">Swiss Bank Account</h3>
                                <div className="text-5xl font-mono text-green-400 mb-8 flex items-center gap-2">
                                    <BadgeDollarSign className="h-10 w-10" />
                                    {profit.toLocaleString()}
                                </div>

                                <h3 className="text-gray-400 mb-2 font-bold uppercase tracking-widest">Public Anger</h3>
                                <div className="w-full bg-gray-700 h-6 rounded-full overflow-hidden mb-2">
                                    <div
                                        className={`h-full transition-all duration-300 ${publicAnger > 70 ? 'bg-red-600 animate-pulse' : 'bg-yellow-500'}`}
                                        style={{ width: `${publicAnger}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-right">{Math.round(publicAnger)}% (Critical: 100%)</p>
                            </div>

                            {/* Background Effect */}
                            <div className="absolute -bottom-10 -right-10 opacity-10">
                                <TrendingUp className="h-64 w-64" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
