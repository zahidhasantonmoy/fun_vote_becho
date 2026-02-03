"use client";

import { useState, useRef } from "react";
import { Download, Upload } from "lucide-react";

export default function IDCardGenerator() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("ভোট চোর");
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="py-20 bg-background border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">অফিসিয়াল কার্ড জেনারেটর</h2>
                <p className="text-gray-500 mb-12">নিজেকে সার্টিফাইড করুন। ফেসবুকে শেয়ার করে ভাব নিন।</p>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">

                    {/* Form */}
                    <div className="w-full max-w-sm space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="আপনার নাম"
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent"
                        />

                        <select
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent"
                        >
                            <option value="ভোট চোর">সার্টিফাইড ভোট চোর</option>
                            <option value="চাঁদাবাজ">প্রফেশনাল চাঁদাবাজ</option>
                            <option value="ডিজিটাল ভিখারি">ডিজিটাল ভিখারি</option>
                            <option value="পলিটিকাল ভাই">পলিটিকাল ভাই (উড়তি)</option>
                        </select>

                        <div
                            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex flex-col items-center gap-2 text-gray-500">
                                <Upload className="h-8 w-8" />
                                <span>ছবি আপলোড করুন</span>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>

                    {/* ID Card Preview */}
                    <div className="w-full max-w-sm">
                        <div className="aspect-[3/4] bg-[url('/id_card_bg.png')] bg-cover bg-center bg-no-repeat rounded-xl shadow-2xl relative overflow-hidden border border-gray-300 p-6 flex flex-col items-center text-center">
                            {/* ID Header */}
                            <div className="w-full border-b-2 border-green-600 pb-2 mb-4">
                                <h3 className="uppercase font-bold text-green-700 tracking-widest text-sm">Vote Becho Authority</h3>
                                <p className="text-[10px] text-gray-500">Ministry of Fraud & Fun</p>
                            </div>

                            {/* Photo */}
                            <div className="w-32 h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden border-2 border-gray-400">
                                {image ? (
                                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">NO PHOTO</div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-1 w-full flex-grow">
                                <h2 className="text-xl font-bold uppercase text-black break-words">{name || "নাম লিখুন"}</h2>
                                <div className="bg-red-600 text-white px-2 py-1 inline-block text-xs font-bold rounded uppercase tracking-wide my-2">
                                    {title}
                                </div>
                                <p className="text-xs text-black mt-2">ID: {Math.floor(Math.random() * 10000000)}</p>
                                <p className="text-xs text-black">Exp: আজীবন</p>
                            </div>

                            {/* Barcode Mock */}
                            <div className="w-full h-8 bg-black mt-auto opacity-80" style={{ maskImage: 'repeating-linear-gradient(90deg, black, black 2px, transparent 2px, transparent 4px)' }}></div>
                        </div>

                        <button className="mt-4 w-full flex items-center justify-center gap-2 text-primary font-bold hover:underline">
                            <Download className="h-4 w-4" />
                            ডাউনলোড করুন (আসলে স্ক্রিনশট নিন)
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
