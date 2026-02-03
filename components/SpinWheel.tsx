"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SpinWheel() {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const prizes = [
        "হাফ প্লেট কাচ্চি",
        "নির্বাচনী প্রতিশ্রুতি (ফাঁকা)",
        "নেতার সাথে সেলফি",
        "ভোট কেন্দ্রে যাওয়ার রিকশা ভাড়া",
        "পরের বার চেষ্টা করুন",
        "১ প্যাকেট বিড়ি",
    ];

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setResult(null);

        // Simulate spin duration
        setTimeout(() => {
            const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
            setResult(randomPrize);
            setSpinning(false);
        }, 2000);
    };

    return (
        <section className="py-20 bg-background border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">ভাগ্য পরীক্ষা করুন (Spin & Win)</h2>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-10 rounded-3xl border border-gray-200 dark:border-gray-800 inline-block w-full max-w-md">

                    <div className={`text-6xl mb-8 transition-transform duration-1000 ${spinning ? 'animate-spin' : ''}`}>
                        🎡
                    </div>

                    {result && !spinning && (
                        <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-xl animate-in zoom-in font-bold text-xl border border-yellow-200 dark:border-yellow-800">
                            অভিনন্দন! আপনি জিতেছেন: <br /> <span className="text-2xl mt-2 block">{result}</span>
                        </div>
                    )}

                    <button
                        onClick={spin}
                        disabled={spinning}
                        className="bg-gradient-to-r from-primary to-rose-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                        {spinning ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                ঘুরছে...
                            </>
                        ) : (
                            "চাকা ঘুরান"
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
