"use client";

import { useState } from "react";
import { Calculator as CalcIcon, X } from "lucide-react";
import { playSound } from "@/utils/sound";

export default function Calculator() {
    const [voiceLevel, setVoiceLevel] = useState("");
    const [respectLevel, setRespectLevel] = useState("");
    const [partyLevel, setPartyLevel] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState("");

    const calculatePrice = (e: React.FormEvent) => {
        e.preventDefault();
        playSound("click");

        // Satirical Logic
        let calculatedResult = "";

        if (partyLevel === "government") {
            calculatedResult = "আপনি তো মাফিয়া! আপনার ভোট লাগবে না, আপনিই ৫টা ভোট নিয়ে যান।";
        } else if (partyLevel === "opposition") {
            calculatedResult = "আপনার ভোটের দাম নাই। কেন্দ্রেই ঢুকতে পারবেন না। (জেল ফ্রি)";
        } else {
            // Random funny results for normal people
            const results = [
                "অভিনন্দন! আপনার ভোটের দাম ২ প্যাকেট তেহারি। 🍛",
                "দুঃখিত! আপনার ভোটের কোনো দাম নাই। বাসায় ঘুমান। 😴",
                "শাবাস! আপনাকে ৫০০ টাকা আর এক প্যাকেট বিরিয়ানি দেওয়া হবে। 🍗",
                "আপনার ভোট অমূল্য! (মানে কেউ কিনবে না, ফাও)। 🤡",
                "৫০০ টাকা ফ্লেক্সিলোড পাবেন (শর্ত প্রযোজ্য)। 💸",
                "আপনার ভোট বিক্রীত হয়ে গেছে! দুঃখিত। 🚫",
            ];
            calculatedResult = results[Math.floor(Math.random() * results.length)];
        }

        setResult(calculatedResult);

        setTimeout(() => {
            playSound("cash");
            setShowModal(true);
        }, 500);
    };

    return (
        <section id="calculator" className="py-20 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-500">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4">আপনার ভোটের দাম কত? 🧮</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        সঠিক দাম যাচাই করুন। দালালের খপ্পরে পড়বেন না।
                    </p>
                </div>

                <div className="bg-background p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                    <form onSubmit={calculatePrice} className="space-y-6">

                        {/* Party Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                কোন দলের সাথে লাইন আছে?
                            </label>
                            <select
                                required
                                value={partyLevel}
                                onChange={(e) => setPartyLevel(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="">সত্যি করে বলুন...</option>
                                <option value="none">কারো সাথে নাই (সাধারণ পাবলিক)</option>
                                <option value="government">ক্ষমতাসীন দল (পাওয়ার ফুল)</option>
                                <option value="opposition">বিরোধী দল (দৌড়ের উপর)</option>
                                <option value="student">ছাত্র (ভাই ব্রাদার)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                গলার জোর কেমন? (মিছিলের জন্য)
                            </label>
                            <select
                                required
                                value={voiceLevel}
                                onChange={(e) => setVoiceLevel(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="">নির্বাচন করুন</option>
                                <option value="low">খুবই কম (ভিসভিস করি)</option>
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
                                <option value="uncle">অলাকার মুরুব্বি আংকেল</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            <CalcIcon className="h-5 w-5" />
                            দাম দেখুন (Confirm)
                        </button>
                    </form>
                </div>
            </div>

            {/* Result Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative bg-background w-full max-w-md p-8 rounded-2xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="text-center">
                            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <span className="text-4xl">💰</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-primary">ফলাফল</h3>
                            <p className="text-xl font-medium leading-relaxed mb-6">
                                {result}
                            </p>

                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    playSound("click");
                                }}
                                className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-3 rounded-lg font-bold transition-all text-gray-800 dark:text-gray-200"
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
