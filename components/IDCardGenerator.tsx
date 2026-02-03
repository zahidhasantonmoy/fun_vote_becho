"use client";

import { useState, useRef, useEffect } from "react";
import { Download, Upload, RefreshCw } from "lucide-react";

export default function IDCardGenerator() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("ভোট চোর");
    const [image, setImage] = useState<string | null>(null);
    const [randomId, setRandomId] = useState<string>("Loading...");
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        generateNewId();
    }, []);

    const generateNewId = () => {
        setRandomId(Math.floor(1000000 + Math.random() * 9000000).toString());
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Improved Image Loader Helper
    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
        });
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        const canvas = canvasRef.current;
        if (!canvas) {
            setIsGenerating(false);
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            setIsGenerating(false);
            return;
        }

        try {
            // 1. Load all assets first
            const bgImg = await loadImage("/id_card_bg_v2.png");
            const qrImg = await loadImage("/mock_qr_code.png"); // Mock QR
            let userImg: HTMLImageElement | null = null;
            if (image) {
                userImg = await loadImage(image);
            }

            // 2. Clear & Draw Background
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

            // 3. Draw Header
            ctx.textAlign = "center";

            // Header Text Shadow
            ctx.shadowColor = "rgba(0,0,0,0.2)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            ctx.font = "900 24px 'Courier New'";
            ctx.fillStyle = "#006A4E";
            ctx.fillText("VOTE BECHO AUTHORITY", canvas.width / 2, 55);

            ctx.shadowBlur = 0; // Reset shadow
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.font = "italic 15px sans-serif";
            ctx.fillStyle = "#444";
            ctx.fillText("Ministry of Fraud & Fun", canvas.width / 2, 80);

            // Divider
            ctx.beginPath();
            ctx.moveTo(30, 95);
            ctx.lineTo(canvas.width - 30, 95);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#F42A41";
            ctx.stroke();

            // 4. Draw User Image
            const imgX = 100;
            const imgY = 120;
            const imgSize = 150;

            ctx.save();
            roundedRect(ctx, imgX, imgY, imgSize, imgSize, 12);
            ctx.clip();

            if (userImg) {
                ctx.drawImage(userImg, imgX, imgY, imgSize, imgSize);
            } else {
                ctx.fillStyle = "#e5e7eb";
                ctx.fillRect(imgX, imgY, imgSize, imgSize);
                ctx.fillStyle = "#9ca3af";
                ctx.font = "bold 20px sans-serif";
                ctx.fillText("NO PHOTO", canvas.width / 2, imgY + imgSize / 2 + 8);
            }
            ctx.restore();

            // Image Border
            ctx.beginPath();
            roundedRect(ctx, imgX, imgY, imgSize, imgSize, 12);
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#333";
            ctx.stroke();

            // 5. Draw Text Details
            ctx.fillStyle = "#000";
            ctx.font = "bold 28px sans-serif";
            ctx.fillText(name || "নাম লিখুন", canvas.width / 2, 310);

            // Badge
            const titleText = title;
            ctx.font = "bold 20px sans-serif";
            const textMetrics = ctx.measureText(titleText);
            const badgeW = textMetrics.width + 50;
            const badgeH = 40;
            const badgeX = (canvas.width - badgeW) / 2;
            const badgeY = 325;

            // Badge Shadow
            ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowBlur = 6;
            ctx.shadowOffsetY = 3;

            ctx.fillStyle = "#D62828"; // Deep Red
            roundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 20);
            ctx.fill();

            // Reset Shadow for text
            ctx.shadowColor = "transparent";
            ctx.fillStyle = "#fff";
            ctx.fillText(titleText, canvas.width / 2, badgeY + 27);

            // ID & Expiry
            ctx.fillStyle = "#000";
            ctx.font = "bold 20px 'Courier New'";
            ctx.fillText(`ID: ${randomId}`, canvas.width / 2, 400);
            ctx.font = "16px sans-serif";
            ctx.fillStyle = "#666";
            ctx.fillText("Expiry: আজীবন (Until Caught)", canvas.width / 2, 425);

            // 6. QR Code Area
            ctx.fillStyle = "#fff";
            ctx.fillRect(canvas.width - 80, canvas.height - 80, 60, 60); // QR BG
            ctx.drawImage(qrImg, canvas.width - 75, canvas.height - 75, 50, 50);

            // Signature area
            ctx.font = "italic 12px serif";
            ctx.fillStyle = "#000";
            ctx.textAlign = "left";
            ctx.fillText("Authorized Signature:", 20, canvas.height - 30);
            ctx.font = "italic bold 16px cursive";
            ctx.fillStyle = "#006A4E";
            ctx.fillText("Sheikh Hasina (Fake)", 20, canvas.height - 15);

            // 7. Trigger Download
            const link = document.createElement('a');
            link.download = `VoteBecho_ID_${randomId}.png`;
            link.href = canvas.toDataURL("image/png", 1.0);
            link.click();

        } catch (err) {
            console.error("ID Generation Failed:", err);
            alert("আইডি কার্ড প্রিন্ট করতে সমস্যা হচ্ছে। আবার চেষ্টা করুন!");
        } finally {
            setIsGenerating(false);
        }
    };

    const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    };

    return (
        <section className="py-20 bg-background border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">অফিসিয়াল কার্ড জেনারেটর (ভি২)</h2>
                <p className="text-gray-500 mb-12">এখন কিউআর কোড (QR Code) সহ! ১০০% ভুয়া কিন্তু দেখতে আসল।</p>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">

                    {/* Controls */}
                    <div className="w-full max-w-sm space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="আপনার নাম"
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                        />

                        <select
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                        >
                            <option value="ভোট চোর">সার্টিফাইড ভোট চোর</option>
                            <option value="চাঁদাবাজ">প্রফেশনাল চাঁদাবাজ</option>
                            <option value="ডিজিটাল ভিখারি">ডিজিটাল ভিখারি</option>
                            <option value="পলিটিকাল ভাই">পলিটিকাল ভাই (উড়তি)</option>
                            <option value="খাদক মন্ত্রী">খাদক মন্ত্রী</option>
                            <option value="রাতের ভোটার">রাতের ভোটার</option>
                        </select>

                        <div
                            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-primary transition-colors">
                                <Upload className="h-8 w-8" />
                                <span>ছবি আপলোড করুন</span>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>

                        <button onClick={generateNewId} className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-primary">
                            <RefreshCw className="h-3 w-3" /> নতুন আইডি নাম্বার
                        </button>
                    </div>

                    {/* Preview View (Visual only) */}
                    <div className="w-full max-w-sm">
                        <div className="relative w-[350px] h-[500px] mx-auto bg-[url('/id_card_bg_v2.png')] bg-cover bg-center rounded-xl shadow-2xl overflow-hidden text-center select-none transform hover:scale-[1.02] transition-transform duration-300">

                            {/* Header */}
                            <div className="mt-[55px] relative z-10">
                                <h3 className="font-[Courier_New] font-black text-[24px] text-[#006A4E] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">VOTE BECHO AUTHORITY</h3>
                                <p className="text-[15px] italic text-[#444] mt-[-5px]">Ministry of Fraud & Fun</p>
                                <div className="h-[4px] bg-[#F42A41] w-[290px] mx-auto mt-3 rounded-full"></div>
                            </div>

                            {/* Photo */}
                            <div className="mt-[20px] mx-auto w-[150px] h-[150px] relative z-10 box-border border-[5px] border-[#333] rounded-[15px] overflow-hidden shadow-lg bg-gray-100">
                                {image ? (
                                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <span className="text-2xl">👤</span>
                                        <span className="text-xs font-bold mt-1">NO PHOTO</span>
                                    </div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="mt-[25px] px-4 relative z-10">
                                <h2 className="text-[28px] font-bold text-black leading-tight mb-3 truncate drop-shadow-sm">
                                    {name || "নাম লিখুন"}
                                </h2>

                                <div className="relative inline-block">
                                    <span className="relative z-10 inline-block bg-[#D62828] text-white px-6 py-2 rounded-full font-bold text-[20px] shadow-lg">
                                        {title}
                                    </span>
                                </div>

                                <div className="font-[Courier_New] font-bold text-[18px] text-black mt-4 space-y-0">
                                    <p>ID: {randomId}</p>
                                    <p className="text-[14px] font-sans text-gray-600">Expiry: আজীবন (Until Caught)</p>
                                </div>
                            </div>

                            {/* Footer Elements */}
                            <div className="absolute bottom-[15px] left-[20px] text-left">
                                <p className="font-serif italic text-[10px]">Authorized Signature:</p>
                                <p className="font-[cursive] text-[#006A4E] text-[14px] font-bold">Sheikh Hasina (Fake)</p>
                            </div>

                            <div className="absolute bottom-[15px] right-[15px] bg-white p-1 rounded">
                                <img src="/mock_qr_code.png" alt="QR" className="w-[50px] h-[50px]" />
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className={`mt-6 w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-bold transition-all shadow-lg text-lg ${isGenerating ? 'bg-gray-500 cursor-wait' : 'bg-primary hover:bg-primary-hover hover:scale-105 active:scale-95'}`}
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" /> : <Download />}
                            {isGenerating ? "প্রিন্ট করা হচ্ছে..." : "ডাউনলোড (HD)"}
                        </button>

                        {/* Hidden Canvas - High Resolution */}
                        <canvas ref={canvasRef} width={350} height={500} className="hidden" />
                    </div>

                </div>
            </div>
        </section>
    );
}
