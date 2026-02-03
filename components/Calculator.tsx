"use client";

import { useState } from "react";
import { Calculator as CalcIcon, X } from "lucide-react";

export default function Calculator() {
    const [voiceLevel, setVoiceLevel] = useState("");
    const [respectLevel, setRespectLevel] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState("");

    const calculatePrice = (e: React.FormEvent) => {
        e.preventDefault();
        const results = [
            "অভিনন্দন! আপনার ভোটের দাম ২ প্যাকেট তেহারি।",
            "দুঃখিত! আপনার ভোটের কোনো দাম নাই।",
            "শাবাস! আপনাকে ৫০০০ টাকা আর এক প্যাকেট বিরিয়ানি দেওয়া হবে।",
            "আপনার ভোট অমূল্য! (মানে কেউ কিনবে না)।",
            "আপনি তো নেতা মানুষ, আপনার ভোট বেচা লাগবে না!",
        ];
        const randomResult = results[Math.floor(Math.random() * results.length)];
        setResult(randomResult);
        setShowModal(true);
    };

    return (
        <section id="calculator" className="py-20 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4">আপনার ভোটের দাম কত?</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        নিচের ফর্মটি পূরণ করে যাচাই করুন আপনার ভোটের বর্তমান বাজার দর।
                    </p>
                </div>

                <div className="bg-background p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                    <form onSubmit={calculatePrice} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                গলার জোর কেমন?
                            </label>
                            <select
                                required
                                value={voiceLevel}
                                onChange={(e) => setVoiceLevel(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="">নির্বাচন করুন</option>
                                <option value="low">খুবই কম</option>
                                <option value="medium">মোটামুটি</option>
                                <option value="high">ফাটাফাটি (মাইক লাগবে না)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                এলাকায় সম্মান?
                            </label>
                            <select
                                required
                                value={respectLevel}
                                onChange={(e) => setRespectLevel(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="">নির্বাচন করুন</option>
                                <option value="unknown">কেউ চেনে না</option>
                                <option value="mastan">পাড়ার মাস্তান</option>
                                <option value="future_member">ভবিষ্যত মেম্বার</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            <CalcIcon className="h-5 w-5" />
                            দাম দেখুন
                        </button>
                    </form>
                </div>
            </div>

            {/* Result Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative bg-background w-full max-w-md p-8 rounded-2xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                <span className="text-3xl">💰</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-secondary">ফলাফল</h3>
                            <p className="text-xl font-medium leading-relaxed">
                                {result}
                            </p>

                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-8 w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-3 rounded-lg font-bold transition-all"
                            >
                                বন্ধ করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
