import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Disclaimer() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
                    <h1 className="text-3xl font-bold mb-6 text-red-600 border-b pb-4">আইনি দাবিত্যাগ (Legal Disclaimer)</h1>

                    <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                        <p className="font-bold">
                            সতর্কতা: "ভোট-বেচো ডট কম" (VoteBecho) একটি সম্পূর্ণ কাল্পনিক এবং রম্য (Satirical) ওয়েবসাইট।
                        </p>

                        <section>
                            <h2 className="text-xl font-bold mb-2 text-primary">১. উদ্দেশ্য এবং প্রকৃতি</h2>
                            <p>
                                এই ওয়েবসাইটটি শুধুমাত্র বিনোদন এবং সামাজিক অসঙ্গতিগুলো রম্যরসের মাধ্যমে তুলে ধরার জন্য তৈরি করা হয়েছে।
                                এর কোনো বাস্তব ভিত্তি নেই। এখানকার কোনো পণ্য, পরিষেবা বা অফার বাস্তব নয়।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-2 text-primary">২. নির্বাচনী আইন ও সংবিধানের প্রতি শ্রদ্ধা</h2>
                            <p>
                                আমরা গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান, নির্বাচন কমিশন এবং প্রচলিত আইনের প্রতি শ্রদ্ধাশীল।
                                বাংলাদেশে ভোট কেনা-বেচা একটি দণ্ডনীয় অপরাধ (Representation of the People Order, 1972 অনুযায়ী)।
                                এই ওয়েবসাইটটি কোনোভাবেই ভোট কেনা-বেচা বা কোনো অবৈধ কার্যক্রমকে উৎসাহিত বা সমর্থন করে না।
                                বরং, ব্যঙ্গাত্মক উপস্থাপনার মাধ্যমে আমরা এর বিরুদ্ধে সচেতনতা তৈরির চেষ্টা করছি।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-2 text-primary">৩. ব্যবহারকারীর দায়বদ্ধতা</h2>
                            <p>
                                এই ওয়েবসাইটের কোনো কন্টেন্টকে সিরিয়াসলি নিয়ে কেউ যদি কোনো বেআইনি কাজ করেন, তার জন্য ওয়েবসাইট কর্তৃপক্ষ বা নির্মাতারা কোনোভাবেই দায়ী থাকবেন না।
                                এখানে প্রদর্শিত "টাকা", "বিকাশ", বা "অফার" সবই কাল্পনিক এবং কোনো আর্থিক লেনদেন এখানে সম্ভব নয়।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-2 text-primary">৪. সরকার ও প্রতিষ্ঠানের প্রতি সম্মান</h2>
                            <p>
                                আমরা বাংলাদেশ সরকার, আইন শৃঙ্খলা রক্ষাকারী বাহিনী এবং নির্বাচন প্রক্রিয়ার প্রতি পূর্ণ সম্মান প্রদর্শন করি।
                                ওয়েবসাইটের কোনো অংশ যদি কারো অনুভূতিতে আঘাত দেয় বা আইনবিরোধী মনে হয়, অনুগ্রহ করে আমাদের জানালে আমরা তা সংশোধন বা অপসারণ করতে বাধ্য থাকবো।
                            </p>
                        </section>

                        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-sm font-bold">
                            "আসুন সচেতন হই, সৎ ও যোগ্য প্রার্থীকে ভোট দিই। গণতন্ত্রের মান রক্ষা করি।"
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
