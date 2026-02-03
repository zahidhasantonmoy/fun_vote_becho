"use client";

import { useState } from "react";
import { Mic, Volume2 } from "lucide-react";

export default function BhashonGenerator() {
    const [bhashon, setBhashon] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);

    const phrases = [
        "আমার ভাইরা! রক্ত যখন দিয়েছি, রক্ত আরো দেবো!",
        "উন্নয়নের জোয়ারে দেশ ভেসে যাচ্ছে, কিন্তু সাঁতার তো জানি না!",
        "বিরোধী দল শুধু ষড়যন্ত্র করে, আর আমরা শুধু... থাক কিছু বললাম না।",
        "রাস্তাঘাট সব হবে, আগে নিজের বাড়িটা তো শেষ করি!",
        "আপনারা ভোট দিন, বিরিয়ানি আমি খাওয়াবো (যদি জিতি)!",
        "যারা বলে দেশে গণতন্ত্র নেই, তাদের আমরা... দেখে নেবো!",
        "পেঁয়াজের দাম বাড়লেও সমস্যা নেই, আমরা তো আর পেঁয়াজ খাই না।",
    ];

    const generateBhashon = () => {
        setIsSpeaking(true);
        // Simulate generation delay for effect
        setTimeout(() => {
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            setBhashon(randomPhrase);
            setIsSpeaking(false);
        }, 800);
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-primary">স্বয়ংক্রিয় ভাষণ জেনারেটর</h2>
                <p className="mb-8 text-gray-500">আপনাকে আর কষ্ট করে মিথ্যা বলতে হবে না, আমরাই বলে দিচ্ছি।</p>

                <div className="bg-background border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center relative">
                    {bhashon ? (
                        <p className="text-2xl font-serif text-gray-800 dark:text-gray-200 italic animate-fade-in">
                            "{bhashon}"
                        </p>
                    ) : (
                        <p className="text-gray-400">মাইকে ফুঁ দিন (বা বাটনে চাপ দিন)...</p>
                    )}

                    <button
                        onClick={generateBhashon}
                        disabled={isSpeaking}
                        className={`mt-8 flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg transition-all ${isSpeaking ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover shadow-lg hover:shadow-xl active:scale-95'}`}
                    >
                        {isSpeaking ? <Volume2 className="animate-pulse" /> : <Mic />}
                        {isSpeaking ? "জেনারেট হচ্ছে..." : "নতুন ভাষণ দিন"}
                    </button>
                </div>
            </div>
        </section>
    );
}
