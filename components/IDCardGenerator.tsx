"use client";

import { useState, useRef, useEffect } from "react";
import { Download, Upload } from "lucide-react";

export default function IDCardGenerator() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("ভোট চোর");
    const [image, setImage] = useState<string | null>(null);
    const [randomId, setRandomId] = useState<string>("Loading...");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setRandomId(Math.floor(Math.random() * 10000000).toString());
    }, []);

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

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Load Background
        const bgImg = new Image();
        bgImg.src = "/id_card_bg_v2.png";
        bgImg.onload = () => {
            // Draw Background
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

            // Header Border
            ctx.beginPath();
            ctx.moveTo(20, 90);
            ctx.lineTo(canvas.width - 20, 90);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#F42A41"; // Red Divider
            ctx.stroke();

            // Header Text
            ctx.font = "bold 22px 'Courier New'";
            ctx.fillStyle = "#006A4E";
            ctx.textAlign = "center";
            ctx.shadowColor = "rgba(0,0,0,0.1)";
            ctx.shadowBlur = 2;
            ctx.fillText("VOTE BECHO AUTHORITY", canvas.width / 2, 50);

            ctx.font = "italic 14px sans-serif";
            ctx.fillStyle = "#333";
            ctx.shadowBlur = 0;
            ctx.fillText("Ministry of Fraud & Fun", canvas.width / 2, 75);

            // Draw User Image OR Placeholder
            if (image) {
                const userImg = new Image();
                userImg.src = image;
                userImg.onload = () => {
                    drawUserImage(ctx, userImg);
                    drawTextContent(ctx);
                    downloadCanvas(canvas);
                };
            } else {
                drawPlaceholderImage(ctx);
                drawTextContent(ctx);
                downloadCanvas(canvas);
            }
        };
    };

    const drawUserImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
        ctx.save();
        // Round rect clipping for image
        roundedRect(ctx, 100, 110, 150, 150, 10);
        ctx.clip();
        ctx.drawImage(img, 100, 110, 150, 150);
        ctx.restore();

        // Border
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 4;
        roundedRect(ctx, 100, 110, 150, 150, 10);
        ctx.stroke();
    };

    const drawPlaceholderImage = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#e5e7eb";
        roundedRect(ctx, 100, 110, 150, 150, 10);
        ctx.fill();
        ctx.strokeStyle = "#9ca3af";
        ctx.lineWidth = 2;
        roundedRect(ctx, 100, 110, 150, 150, 10);
        ctx.stroke();

        ctx.fillStyle = "#9ca3af";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("NO PHOTO", 175, 190);
    };

    const drawTextContent = (ctx: CanvasRenderingContext2D) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Name
        ctx.font = "bold 26px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(name || "নাম লিখুন", canvas.width / 2, 300);

        // Title Badge
        const titleText = title;
        ctx.font = "bold 18px sans-serif";

        // Badge Background
        const textMetrics = ctx.measureText(titleText);
        const badgeWidth = textMetrics.width + 40;
        const badgeHeight = 36;
        const badgeX = (canvas.width / 2) - (badgeWidth / 2);
        const badgeY = 320;

        ctx.fillStyle = "#F42A41"; // Primary Red
        roundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 20);
        ctx.fill();

        // Badge Text
        ctx.fillStyle = "#fff";
        ctx.textBaseline = "middle";
        ctx.fillText(titleText, canvas.width / 2, badgeY + (badgeHeight / 2) + 2); // Center vertically
        ctx.textBaseline = "alphabetic"; // Reset

        // Details
        ctx.fillStyle = "#000";
        ctx.font = "bold 18px Courier New";
        ctx.fillText(`ID: ${randomId}`, canvas.width / 2, 390);
        ctx.fillText("Exp: আজীবন", canvas.width / 2, 415);

        // Bottom Barcode Stripe
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 460, canvas.width, 40);

        // Fake Barcode Lines
        ctx.fillStyle = "#fff";
        for (let i = 0; i < canvas.width; i += Math.random() * 10 + 2) {
            ctx.fillRect(i, 460, Math.random() * 4, 40);
        }
    };

    const downloadCanvas = (canvas: HTMLCanvasElement) => {
        // Small delay to ensure everything painted
        setTimeout(() => {
            const link = document.createElement('a');
            link.download = `vote-becho-id-${randomId}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }, 100);
    };

    // Helper for rounded rect
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
                <h2 className="text-3xl font-bold mb-4">অফিসিয়াল কার্ড জেনারেটর</h2>
                <p className="text-gray-500 mb-12">নতুন ডিজাইন! আরো প্রফেশনাল, আরো ভুয়া।</p>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">

                    {/* Form */}
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
                    </div>

                    {/* ID Card Preview (DOM) - Must align VISUALLY with Canvas logic above */}
                    <div className="w-full max-w-sm">
                        <div className="relative w-[350px] h-[500px] mx-auto bg-[url('/id_card_bg_v2.png')] bg-cover bg-center rounded-none shadow-2xl overflow-hidden text-center select-none"
                            style={{ boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)' }}
                        >
                            {/* Header */}
                            <div className="mt-[50px]">
                                <h3 className="font-[Courier_New] font-bold text-[22px] text-[#006A4E] drop-shadow-sm">VOTE BECHO AUTHORITY</h3>
                                <p className="text-[14px] italic text-[#333]">Ministry of Fraud & Fun</p>
                                <div className="h-[3px] bg-[#F42A41] w-[310px] mx-auto mt-2"></div>
                            </div>

                            {/* Photo */}
                            <div className="mt-[20px] mx-auto w-[150px] h-[150px] relative">
                                {image ? (
                                    <div className="w-full h-full rounded-[10px] border-[4px] border-[#333] overflow-hidden">
                                        <img src={image} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full rounded-[10px] border-[2px] border-[#9ca3af] bg-gray-200 flex items-center justify-center text-gray-400 font-bold">
                                        NO PHOTO
                                    </div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="mt-[30px] px-4">
                                {/* Name */}
                                <h2 className="text-[26px] font-bold text-black leading-tight mb-2 truncate">
                                    {name || "নাম লিখুন"}
                                </h2>

                                {/* Title Badge */}
                                <span className="inline-block bg-[#F42A41] text-white px-5 py-2 rounded-full font-bold text-[18px] shadow-sm mb-4">
                                    {title}
                                </span>

                                {/* Details */}
                                <div className="font-[Courier_New] font-bold text-[18px] text-black space-y-1">
                                    <p>ID: {randomId}</p>
                                    <p>Exp: আজীবন</p>
                                </div>
                            </div>

                            {/* Footer Barcode Stripe */}
                            <div className="absolute bottom-0 left-0 w-full h-[40px] bg-black/80 flex items-center justify-center gap-1 overflow-hidden">
                                {[...Array(40)].map((_, i) => (
                                    <div key={i} className="bg-white h-full" style={{ width: Math.random() * 4 + 1 }}></div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            className="mt-6 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
                        >
                            <Download className="h-5 w-5" />
                            ফাইনাল ডাউনলোড করুন
                        </button>

                        {/* Hidden Canvas - Exactly verified dimensions */}
                        <canvas ref={canvasRef} width={350} height={500} className="hidden" />
                    </div>

                </div>
            </div>
        </section>
    );
}
