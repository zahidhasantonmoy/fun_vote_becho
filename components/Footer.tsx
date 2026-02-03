
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl font-bold tracking-wider">ভোট-বেচো ডট কম</span>
                    <p className="text-gray-400 text-sm">ডিজিটাল বাংলাদেশের ডিজিটাল ভোট হাট</p>
                </div>

                <div className="max-w-2xl mx-auto p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
                    <p className="text-red-400 font-bold">
                        সতর্কতা: এই ওয়েবসাইটটি শুধুমাত্র বিনোদনের জন্য তৈরি। ভোট কেনা-বেচা একটি দণ্ডনীয় অপরাধ এবং আমরা একে নিরুৎসাহিত করি।
                    </p>
                </div>

                {/* Visit Counter */}
                <div className="inline-block bg-black/30 px-4 py-2 rounded-full border border-gray-800 backdrop-blur-sm">
                    <span className="text-gray-400 text-sm mr-2">মোট ভিজিটর:</span>
                    <span className="font-mono text-green-400 font-bold tracking-widest animate-pulse">
                        ৯,৯৯,৯৯৯
                    </span>
                </div>

                <div className="text-gray-500 text-sm pt-4 border-t border-gray-800">
                    © ২০২৬ ভোট-বেচো ডট কম | সর্বস্বত্ব সংরক্ষিত (নাও হতে পারে)।
                </div>
            </div>
        </footer>
    );
}
