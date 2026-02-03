"use client";

import { useState } from "react";
import { Trash2, Send } from "lucide-react";

export default function ComplaintBox() {
    const [complaint, setComplaint] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!complaint.trim()) return;

        setIsDeleting(true);

        // Simulate shredding/deleting
        setTimeout(() => {
            setComplaint("");
            setIsDeleting(false);
            alert("আপনার অভিযোগটি সফলভাবে ডাস্টবিনে ফেলা হয়েছে!");
        }, 1500);
    };

    return (
        <section className="py-20 bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/20">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">অভিযোগ বাক্স</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    টাকা পাননি? ভোট চুরি হয়েছে? মন খুলে লিখুন, আমরা পড়বো না।
                </p>

                <div className="relative">
                    <form
                        onSubmit={handleSubmit}
                        className={`transition-all duration-1000 ${isDeleting ? 'scale-0 rotate-180 opacity-0' : 'scale-100 opacity-100'}`}
                    >
                        <textarea
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                            placeholder="আপনার অভিযোগ এখানে লিখুন..."
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-background focus:ring-2 focus:ring-red-500 outline-none h-32 resize-none mb-4"
                        />

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                        >
                            <Send className="h-5 w-5" />
                            জমা দিন
                        </button>
                    </form>

                    {/* Trash Can Animation */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isDeleting ? 'opacity-100 scale-150' : 'opacity-0 scale-50 pointer-events-none'}`}>
                        <Trash2 className="h-24 w-24 text-red-600 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}
