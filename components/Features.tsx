
import { Wallet, ShieldCheck, Megaphone } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: <Wallet className="h-8 w-8 text-primary" />,
            title: "তাৎক্ষণিক পেমেন্ট",
            desc: "বিকাশ, নগদ বা সরাসরি বিরিয়ানির প্যাকেটে পেমেন্ট।",
        },
        {
            icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
            title: "১০০% গোপনীয়তা",
            desc: "কেউ জানবে না, শুধু আপনি আর আমি জানবো।",
        },
        {
            icon: <Megaphone className="h-8 w-8 text-primary" />,
            title: "মিছিল বোনাস",
            desc: "মিছিলে গিয়ে চিল্লালে ৫০০ টাকা এক্সট্রা বোনাস।",
        },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-zinc-900 border-y border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">কেন আমাদের বিশ্বাস করবেন?</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-background p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="mb-6 p-4 rounded-full bg-gray-100 dark:bg-gray-800 w-fit">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
