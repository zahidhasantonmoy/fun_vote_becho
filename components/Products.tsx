"use client";

import { ShoppingCart } from "lucide-react";

export default function Products() {
    const products = [
        {
            id: 1,
            title: "সাধারণ পাবলিক ভোট",
            price: "৫০০ টাকা",
            desc: "কোনো ভেজাল নাই, ফ্রেশ ভোট।",
            color: "bg-blue-100 dark:bg-blue-900/20",
        },
        {
            id: 2,
            title: "এলাকার বড় ভাই",
            price: "৫০০০ টাকা",
            desc: "উনার কথায় ১০টা ভোট নিশ্চিত।",
            color: "bg-purple-100 dark:bg-purple-900/20",
        },
        {
            id: 3,
            title: "মিছিল পার্টি কম্বো",
            price: "১ প্লেট কাচ্চি + ২০০ টাকা",
            desc: "স্লোগান দিবে, ভোট দিবে, প্রয়োজনে মারামারি করবে।",
            color: "bg-orange-100 dark:bg-orange-900/20",
        },
        {
            id: 4,
            title: "পুরো ফ্যামিলি প্যাক",
            price: "একটি সরকারি চাকরি",
            desc: "চাচা, মামা, খালাসহ ২০টি ভোট একরেটে।",
            color: "bg-green-100 dark:bg-green-900/20",
        },
    ];

    return (
        <section id="packages" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">আজকের হট ডিল</h2>
                    <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-background border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                        >
                            {/* Image Placeholder */}
                            <div className={`h-40 ${product.color} w-full flex items-center justify-center`}>
                                <span className="text-4xl">📦</span>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                                <div className="text-primary font-bold text-xl mb-3">
                                    {product.price}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow">
                                    {product.desc}
                                </p>

                                <button
                                    onClick={() => alert(`"${product.title}" কার্টে যোগ করা হয়েছে! (কিন্তু টাকা ছাড়া চেকআউট হবে না ভাই) 🤣`)}
                                    className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black py-3 rounded-lg font-bold hover:opacity-90 transition-opacity active:scale-95"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    কার্টে যোগ করুন
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
