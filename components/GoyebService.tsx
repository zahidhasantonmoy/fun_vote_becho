"use client";

import { useState } from "react";
import { FileWarning, Ghost, XCircle } from "lucide-react";

export default function GoyebService() {
    const [items, setItems] = useState([
        { id: 1, title: "দুর্নীতির ফাইল", icon: <FileWarning className="w-8 h-8 text-red-500" /> },
        { id: 2, title: "বিরোধী নেতা", icon: <XCircle className="w-8 h-8 text-orange-500" /> },
        { id: 3, title: "সড়কের খানাখন্দ", icon: <FileWarning className="w-8 h-8 text-yellow-500" /> },
        { id: 4, title: "শেয়ার বাজার স্ক্যাম", icon: <XCircle className="w-8 h-8 text-purple-500" /> },
    ]);

    const handleVanish = (id: number) => {
        setItems(items.filter(item => item.id !== id));
        alert("গায়েব সাকসেসফুল! 👻 (404 Not Found)");
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                    <Ghost className="animate-bounce" />
                    গায়েব সার্ভিস
                </h2>
                <p className="text-gray-500 mb-12">যেকোনো সমস্যা চুটকিতে গায়েব করে দিন।</p>

                {items.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleVanish(item.id)}
                                className="cursor-pointer bg-background p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:scale-105 transition-all group"
                            >
                                <div className="mb-4 flex justify-center group-hover:animate-ping">{item.icon}</div>
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100">ক্লিক করে গায়েব করুন</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 bg-green-100 dark:bg-green-900/20 rounded-xl animate-fade-in">
                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">সব ক্লিয়ার! ✅</h3>
                        <p>দেশে আর কোনো সমস্যা নেই। আপনি সফল!</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-sm text-green-700 underline"
                        >
                            আবার সমস্যা আনুন
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
