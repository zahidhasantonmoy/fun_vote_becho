"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, PauseCircle, PlayCircle } from "lucide-react";

export default function TorkoRoom() {
    const [messages, setMessages] = useState<{ id: number, user: string, text: string }[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const insultsA = [
        "উন্নয়ন তো আপনাদের চোখে পড়ে না!",
        "ষড়যন্ত্র বন্ধ করুন!",
        "১০ বছর আগে আপনারা কী করেছিলেন?",
        "বিদেশি প্রভুদের ইশারায় চলবেন না!",
        "জনগণ আমাদের সাথে আছে!",
    ];

    const insultsB = [
        "গণতন্ত্রের হত্যা করেছেন!",
        "ভোট চোর ভোট চোর!",
        "দেশের মানুষ না খেয়ে মরছে!",
        "ব্যাংক তো সব খালি করে দিলেন!",
        "পালানোর পথ পাবেন না!",
    ];

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            const isA = Math.random() > 0.5;
            const text = isA
                ? insultsA[Math.floor(Math.random() * insultsA.length)]
                : insultsB[Math.floor(Math.random() * insultsB.length)];

            const newMessage = {
                id: Date.now(),
                user: isA ? "জনাব অধম (সরকারি)" : "জনাব বদন (বিরোধী)",
                text: text,
            };

            setMessages(prev => [...prev.slice(-4), newMessage]); // Keep last 5 messages
        }, 1500);

        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        // Auto Scroll
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const togglePause = () => {
        setIsPaused(!isPaused);
        if (!isPaused) {
            setMessages(prev => [...prev, { id: Date.now(), user: "System", text: "🚫 জুতা নিক্ষেপ করা হয়েছে! তর্ক ৫ সেকেন্ডের জন্য স্থগিত।" }]);
            setTimeout(() => setIsPaused(false), 5000);
        }
    };

    return (
        <section className="py-20 bg-background">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">টক শো: "ঝগড়া লাইভ"</h2>

                <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-t-2xl border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm font-bold text-red-600 animate-pulse">🔴 LIVE on TV</div>
                </div>

                <div
                    ref={scrollRef}
                    className="bg-white dark:bg-zinc-900 h-[400px] border-x border-b border-gray-300 dark:border-gray-700 p-6 overflow-y-auto space-y-4"
                >
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.user.includes("System") ? "items-center" : msg.user.includes("অধম") ? "items-end" : "items-start"}`}>
                            {!msg.user.includes("System") && (
                                <span className="text-xs text-gray-400 mb-1">{msg.user}</span>
                            )}
                            <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.user.includes("System") ? "bg-red-100 text-red-600 font-bold"
                                    : msg.user.includes("অধম") ? "bg-primary text-white rounded-br-none"
                                        : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none"
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {messages.length === 0 && <div className="text-gray-400 mt-20">তর্ক শুরু হচ্ছে... 🍿</div>}
                </div>

                <button
                    onClick={togglePause}
                    disabled={isPaused}
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    {isPaused ? <PlayCircle /> : <PauseCircle />}
                    {isPaused ? "জুতা মারা হয়েছে (বিরতি চলছে)..." : "জুতা মারুন (বিরতি দিন) 👞"}
                </button>
            </div>
        </section>
    );
}
