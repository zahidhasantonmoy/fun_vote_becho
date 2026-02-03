import Link from "next/link";
import VisitCounter from "@/components/VisitCounter";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl font-bold tracking-wider">ভোট-বেচো ডট কম</span>
                    <p className="text-gray-400 text-sm">ডিজিটাল বাংলাদেশের ডিজিটাল ভোট হাট</p>
                </div>

                <div className="max-w-2xl mx-auto p-4 bg-red-900/20 border border-red-900/50 rounded-lg hover:bg-red-900/30 transition-colors cursor-pointer">
                    <Link href="/disclaimer" className="block">
                        <p className="text-red-400 font-bold hover:underline">
                            সতর্কতা: এই ওয়েবসাইটটি শুধুমাত্র বিনোদনের জন্য তৈরি। বিস্তারিত জানতে এখানে ক্লিক করুন (Disclaimer)।
                        </p>
                    </Link>
                </div>

                {/* Real Visit Counter */}
                <VisitCounter />

                <div className="text-gray-500 text-sm pt-4 border-t border-gray-800">
                    © ২০২৬ ভোট-বেচো ডট কম | সর্বস্বত্ব সংরক্ষিত (নাও হতে পারে)।
                </div>
            </div>
        </footer>
    );
}
