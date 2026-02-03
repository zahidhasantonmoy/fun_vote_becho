"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/ui/MotionWrapper";
import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";

// Games
import SyndicateTycoon from "@/components/SyndicateTycoon";
import RaterVote from "@/components/RaterVote";
import VvipProtocol from "@/components/VvipProtocol";
import KursiGame from "@/components/KursiGame";
import PoltiGame from "@/components/PoltiGame";
import BiryaniRun from "@/components/BiryaniRun";
import TableThappor from "@/components/TableThappor";
import RickshawDrift from "@/components/RickshawDrift";
import MoshaKiller from "@/components/MoshaKiller";

export default function GamesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <Link href="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> ব্যাক টু হোম
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-primary mb-4 flex items-center justify-center gap-4">
                        <Gamepad2 size={48} />
                        ভোট-বেচো আর্কেড
                        <Gamepad2 size={48} />
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        সময় কাটছে না? আমাদের প্রিমিয়াম ফালতু গেমগুলো খেলে সময় নষ্ট করুন। দয়া করে সিরিয়াস হবেন না।
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    <MotionWrapper delay={0.1}>
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                            <div className="bg-yellow-500 p-4 text-center font-bold text-black text-xl">NEW RELEASE ⚡</div>
                            <KhambaClimber />
                        </div>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MotionWrapper delay={0.15}>
                            <BiryaniRun />
                        </MotionWrapper>
                        <MotionWrapper delay={0.15}>
                            <TableThappor />
                        </MotionWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MotionWrapper delay={0.18}>
                            <RickshawDrift />
                        </MotionWrapper>
                        <MotionWrapper delay={0.18}>
                            <MoshaKiller />
                        </MotionWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MotionWrapper delay={0.2}>
                            <RaterVote />
                        </MotionWrapper>
                        <MotionWrapper delay={0.3}>
                            <VvipProtocol />
                        </MotionWrapper>
                    </div>

                    <MotionWrapper delay={0.4}>
                        <SyndicateTycoon />
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MotionWrapper delay={0.5}>
                            <KursiGame />
                        </MotionWrapper>
                        <MotionWrapper delay={0.6}>
                            <PoltiGame />
                        </MotionWrapper>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
