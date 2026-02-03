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
// Phase 3 Features
import BhashonGenerator from "@/components/BhashonGenerator";
import MoneyWhitener from "@/components/MoneyWhitener";
import ChadaGoals from "@/components/ChadaGoals";
import PoltiGame from "@/components/PoltiGame";
import GoyebService from "@/components/GoyebService";
import IDCardGenerator from "@/components/IDCardGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <VoteTicker />
      </div>
      <Hero />
      <Features />
      <div className="space-y-0 divide-y divide-gray-200 dark:divide-gray-800">
        <Products />
        <BhashonGenerator />
        <SpinWheel />
        <MoneyWhitener />
        <CandidateCompare />
        <ChadaGoals />
        <Calculator />
        <PoltiGame />
        <Testimonials />
        <GoyebService />
        <IDCardGenerator />
        <ComplaintBox />
      </div>
      <Footer />
    </main>
  );
}
