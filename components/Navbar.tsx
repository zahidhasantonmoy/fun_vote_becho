"use client";

import { useState, useEffect } from "react";
import { Vote, Menu, X, Lightbulb, LightbulbOff } from "lucide-react";
import Link from "next/link";
import { playSound } from "@/utils/sound";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadShedding, setIsLoadShedding] = useState(false);

    useEffect(() => {
        // Check system preference initially
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsLoadShedding(true);
        }
    }, []);

    const toggleLoadShedding = () => {
        // Fun flicker effect logic could go here, but for now simple toggle
        setIsLoadShedding(!isLoadShedding);
        document.documentElement.classList.toggle("dark");
        playSound("click");
    };

    const navLinks = [
        { title: "হোম", href: "/" },
        { title: "গেমস", href: "/games" }, // New Separated Page
        { title: "প্যাকেজ সমূহ", href: "/#packages" },
        { title: "দাম যাচাই", href: "/#calculator" },
        { title: "আইডি কার্ড", href: "/#id-card" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <Vote className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold tracking-wider text-primary">
                            ভোট-বেচো ডট কম
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors duration-200"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Load Shedding Toggle (Desktop) */}
                    <div className="hidden md:flex items-center ml-4">
                        <button
                            onClick={toggleLoadShedding}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-yellow-500 dark:text-gray-400"
                            title={isLoadShedding ? "লোডশেডিং চলছে (Dark Mode)" : "বিদ্যুৎ আছে (Light Mode)"}
                        >
                            {isLoadShedding ? <LightbulbOff className="h-6 w-6" /> : <Lightbulb className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block ml-4">
                        <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-bold transition-all shadow-md hover:shadow-lg">
                            ভোট বিক্রি করুন
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-background border-b border-gray-200 dark:border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.title}
                            </Link>
                        ))}

                        <button
                            onClick={() => {
                                toggleLoadShedding();
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 flex items-center gap-2 text-base font-medium hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {isLoadShedding ? <LightbulbOff className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />}
                            {isLoadShedding ? "লোডশেডিং অফ করুন" : "লোডশেডিং অন করুন"}
                        </button>
                        <div className="mt-4">
                            <button className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-bold transition-all">
                                ভোট বিক্রি করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
