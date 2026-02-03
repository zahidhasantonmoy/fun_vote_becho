"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VoteTicker from "@/components/VoteTicker";
import Features from "@/components/Features";
import Products from "@/components/Products";
import SpinWheel from "@/components/SpinWheel";
import CandidateCompare from "@/components/CandidateCompare";
import Calculator from "@/components/Calculator";
import Testimonials from "@/components/Testimonials";
import ComplaintBox from "@/components/ComplaintBox";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/ui/MotionWrapper";

// Phase 3 Features
import BhashonGenerator from "@/components/BhashonGenerator";
import MoneyWhitener from "@/components/MoneyWhitener";
import ChadaGoals from "@/components/ChadaGoals";
import PoltiGame from "@/components/PoltiGame";
import GoyebService from "@/components/GoyebService";
import IDCardGenerator from "@/components/IDCardGenerator";

// Phase 4 Features
import SyndicateTycoon from "@/components/SyndicateTycoon";
import TorkoRoom from "@/components/TorkoRoom";
import KursiGame from "@/components/KursiGame";

// Phase 5 Features
import RaterVote from "@/components/RaterVote";
import ProjectNamkaran from "@/components/ProjectNamkaran";
import VvipProtocol from "@/components/VvipProtocol";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="pt-16">
        <VoteTicker />
      </div>

      <Hero />

      <MotionWrapper delay={0.1}>
        <Features />
      </MotionWrapper>

      <div className="space-y-0 divide-y divide-gray-200 dark:divide-gray-800">
        <MotionWrapper><Products /></MotionWrapper>
        <MotionWrapper><SyndicateTycoon /></MotionWrapper>
        <MotionWrapper><BhashonGenerator /></MotionWrapper>
        <MotionWrapper><RaterVote /></MotionWrapper>
        <MotionWrapper><SpinWheel /></MotionWrapper>
        <MotionWrapper><MoneyWhitener /></MotionWrapper>
        <MotionWrapper><TorkoRoom /></MotionWrapper>
        <MotionWrapper><ProjectNamkaran /></MotionWrapper>
        <MotionWrapper><CandidateCompare /></MotionWrapper>
        <MotionWrapper><ChadaGoals /></MotionWrapper>
        <MotionWrapper><Calculator /></MotionWrapper>
        <MotionWrapper><VvipProtocol /></MotionWrapper>
        <MotionWrapper><KursiGame /></MotionWrapper>
        <MotionWrapper><PoltiGame /></MotionWrapper>
        <MotionWrapper><Testimonials /></MotionWrapper>
        <MotionWrapper><GoyebService /></MotionWrapper>
        <MotionWrapper><IDCardGenerator /></MotionWrapper>
        <MotionWrapper><ComplaintBox /></MotionWrapper>
      </div>

      <Footer />
    </main>
  );
}
