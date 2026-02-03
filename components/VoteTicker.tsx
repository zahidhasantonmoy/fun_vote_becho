"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function VoteTicker() {
    const [stocks, setStocks] = useState([
        { name: "ঢাকা উত্তর", price: 500, change: 0 },
        { name: "বরিশাল", price: 200, change: 0 },
        { name: "নোয়াখালী", price: 350, change: 0 },
        { name: "সিলেট", price: 450, change: 0 },
        { name: "চট্টগ্রাম", price: 600, change: 0 },
        { name: "গোপালগঞ্জ", price: 5000, change: 0 }, // Joke: High value
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStocks((prevStocks) =>
                prevStocks.map((stock) => {
                    const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
                    return {
                        ...stock,
                        price: Math.max(10, stock.price + change), // Min price 10
                        change,
                    };
                })
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gray-900 text-white overflow-hidden py-2 border-b border-gray-800">
            <div className="flex animate-marquee gap-8 whitespace-nowrap">
                {[...stocks, ...stocks].map((stock, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm font-mono">
                        <span className="font-bold text-gray-300">{stock.name}:</span>
                        <span>৳{stock.price}</span>
                        {stock.change > 0 ? (
                            <span className="text-green-500 flex items-center text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" /> {stock.change}%
                            </span>
                        ) : (
                            <span className="text-red-500 flex items-center text-xs">
                                <TrendingDown className="h-3 w-3 mr-1" /> {Math.abs(stock.change)}%
                            </span>
                        )}
                    </div>
                ))}
            </div>
            {/* Helper style for marquee animation if not in Tailwind config yet */}
            <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
}
