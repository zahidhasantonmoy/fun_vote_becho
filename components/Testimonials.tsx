
import { Star } from "lucide-react";

export default function Testimonials() {
    const reviews = [
        {
            name: "কুদ্দুস মিয়া",
            role: "সন্তুষ্ট বিক্রেতা",
            review: "ভাইরে ভাই, পুরাই মাখন! আমার ফ্যামিলির ৫টা ভোট বেইচা এখন আমি বাইসাইকেলের মালিক।",
            stars: 5,
        },
        {
            name: "অজ্ঞাতনামা",
            role: "হতাশ কাস্টমার",
            review: "বিরিয়ানির প্যাকেটে মাংস ছিল না, শুধু আলু। তাই ৩ স্টার দিলাম।",
            stars: 3,
        },
        {
            name: "চৌধুরী সাহেব",
            role: "এলিট ভোটার",
            review: "আমার ভ্যালু অনেক হাই, তাই রেট নিয়ে একটু ঝামেলা হইছিল। তবে পেমেন্ট ক্লিয়ার।",
            stars: 4,
        },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">আমাদের সন্তুষ্ট (?) কাস্টমার</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-background p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow max-w-sm"
                        >
                            <div className="flex text-yellow-500 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < review.stars ? "fill-current" : "text-gray-300 dark:text-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{review.review}"</p>
                            <div>
                                <h4 className="font-bold text-lg">{review.name}</h4>
                                <span className="text-sm text-primary">{review.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
