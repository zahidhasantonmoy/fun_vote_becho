"use client";

import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

export default function MoneyWhitener() {
    const [amount, setAmount] = useState("");
    const [isWashing, setIsWashing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleWash = () => {
        if (!amount) return;
        setIsWashing(true);
        setResult(null);

        // Washing cycle
        setTimeout(() => {
            setIsWashing(false);
            const num = parseInt(amount);
            if (isNaN(num)) {
                setResult("ভাই সংখ্যা দেন, আবেগ না! ❌");
            } else {
                const tax = Math.floor(num * 0.05); // 5% token tax
                setResult(`✅ ধবধবে সাদা! (১৫% ভ্যাট কেটে বাকিটা হালাল)`);
            }
        }, 2000);
    };

    return (
        <section className="py-20 bg-background border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">কালো টাকা হোয়াইটনার</h2>
                <p className="text-gray-500 mb-8">কোনো প্রশ্ন করা হবে না। ১০০% গ্যারান্টি।</p>

                <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="কালো টাকার পরিমাণ (কোটিতে)"
                            className="w-full text-center text-2xl font-bold p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-transparent outline-none focus:border-green-500 transition-colors"
                        />

                        <button
                            onClick={handleWash}
                            disabled={isWashing}
                            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all flex items-center justify-center gap-2 ${isWashing ? 'bg-blue-400 animate-pulse cursor-wait' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
                        >
                            {isWashing ? <RefreshCw className="animate-spin" /> : <Sparkles />}
                            {isWashing ? "ধোলাই চলছে..." : "হোয়াইট ওয়াশ করুন"}
                        </button>
                    </div>

                    {result && (
                        <div className="mt-8 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-lg animate-fade-in border border-green-200 dark:border-green-800">
                            {result}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
