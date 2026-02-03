"use client";

import { useState } from "react";
import { Swords } from "lucide-react";

export default function CandidateCompare() {
    const [candidate1] = useState({
        name: "জনাব চাপাবাজ",
        stats: { corruption: 90, muscle: 40, showoff: 100 },
    });

    const [candidate2] = useState({
        name: "মিস্টার মাস্তান",
        stats: { corruption: 60, muscle: 100, showoff: 50 },
    });

    return (
        <section className="py-20 bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">নেতা তুলনা করুন</h2>
                    <p className="text-gray-600 dark:text-gray-400">কার পাল্লা কত ভারী?</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    {/* Candidate 1 */}
                    <div className="flex-1 w-full p-6 border border-gray-200 dark:border-gray-800 rounded-2xl">
                        <h3 className="text-2xl font-bold text-center mb-6 text-primary">{candidate1.name}</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>দুর্নীতি</span>
                                    <span>{candidate1.stats.corruption}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${candidate1.stats.corruption}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>গায়ের জোর</span>
                                    <span>{candidate1.stats.muscle}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${candidate1.stats.muscle}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>ভাব (Show-off)</span>
                                    <span>{candidate1.stats.showoff}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${candidate1.stats.showoff}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-gray-300 dark:text-gray-600">
                        <Swords className="h-16 w-16" />
                    </div>

                    {/* Candidate 2 */}
                    <div className="flex-1 w-full p-6 border border-gray-200 dark:border-gray-800 rounded-2xl">
                        <h3 className="text-2xl font-bold text-center mb-6 text-secondary">{candidate2.name}</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>দুর্নীতি</span>
                                    <span>{candidate2.stats.corruption}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${candidate2.stats.corruption}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>গায়ের জোর</span>
                                    <span>{candidate2.stats.muscle}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${candidate2.stats.muscle}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>ভাব (Show-off)</span>
                                    <span>{candidate2.stats.showoff}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${candidate2.stats.showoff}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
