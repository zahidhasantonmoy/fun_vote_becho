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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <VoteTicker />
      </div>
      <Hero />
      <Features />
      <Products />
      <SpinWheel />
      <CandidateCompare />
      <Calculator />
      <Testimonials />
      <ComplaintBox />
      <Footer />
    </main>
  );
}
