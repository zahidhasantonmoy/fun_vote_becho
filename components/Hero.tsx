"use client";

import { Wallet, TrendingUp } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[-1] opacity-10 dark:opacity-5">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                    <span className="text-primary">ভোট দিন,</span>{" "}
                    <span className="text-secondary">বিরিয়ানি নিন!</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                    এবারের নির্বাচনে হাত গুটিয়ে বসে থাকবেন না, নিজের মূল্যবান ভোট বেচে বড়লোক হন।
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <Wallet className="h-5 w-5" />
                        ভোট কিনবো
                    </button>

                    <button
                        onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-hover text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <TrendingUp className="h-5 w-5" />
                        ভোট বেচবো
                    </button>
                </div>

                {/* Floating fun element */}
                <div className="mt-12 animate-bounce text-sm font-medium text-gray-500">
                    👇 নিচে আসল মাল দেখুন 👇
                </div>
            </div>
        </section>
    );
}
