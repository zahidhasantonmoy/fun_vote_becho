"use client";

import { useState } from "react";
import { Hammer, Shuffle } from "lucide-react";
import { playSound } from "@/utils/sound";

const WORDS = [
    ["Mega", "Super", "Dream", "Golden", "Digital"],
    ["Elevated", "Underground", "Flying", "Smart", "Nuclear"],
    ["Bamboo", "Plastic", "Rooftop", "Space", "River"],
    ["Bridge", "Tunnel", "Statue", "Park", "Tower"],
    ["Project", "System", "Scheme", "Hub", "Network"]
];

export default function ProjectNamkaran() {
    const [name, setName] = useState("প্রজেক্টের নাম জেনারেট করুন");
    const [budget, setBudget] = useState(0);

    const generate = () => {
        const w1 = WORDS[0][Math.floor(Math.random() * WORDS[0].length)];
        const w2 = WORDS[1][Math.floor(Math.random() * WORDS[1].length)];
        const w3 = WORDS[2][Math.floor(Math.random() * WORDS[2].length)];
        const w4 = WORDS[3][Math.floor(Math.random() * WORDS[3].length)];
        const w5 = WORDS[4][Math.floor(Math.random() * WORDS[4].length)];

        setName(`${w1} ${w2} ${w3} ${w4} ${w5}`);
        setBudget(Math.floor(Math.random() * 50000) + 5000);
        playSound("click");
    };

    const extend = () => {
        setBudget(b => Math.round(b * 1.5));
        playSound("cash");
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">প্রজেক্ট নামকরন টুল 🏗️</h2>
                <p className="text-gray-500 mb-8">বাজেট বাড়ানোর জন্য সুন্দর নাম দরকার? আমরা আছি।</p>

                <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl md:text-3xl font-black text-primary mb-4 min-h-[80px] flex items-center justify-center leading-tight">
                        {name}
                    </h3>

                    <div className="text-gray-500 font-mono mb-8">
                        প্রাথমিক বাজেট: <span className="text-green-600 font-bold text-xl">{budget > 0 ? budget.toLocaleString() : "---"}</span> কোটি টাকা
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={generate}
                            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 active:scale-95 transition-transform"
                        >
                            <Shuffle className="h-4 w-4" /> নতুন নাম
                        </button>

                        {budget > 0 && (
                            <button
                                onClick={extend}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 active:scale-95 transition-transform shadow-lg shadow-green-600/20"
                            >
                                <Hammer className="h-4 w-4" /> মেয়াদ বাড়ান (বাজেট++)
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
