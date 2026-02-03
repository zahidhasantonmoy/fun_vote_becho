// Basic synth for sound effects without external files
export const playSound = (type: "click" | "success" | "error" | "cash" | "siren" | "stamp") => {
    if (typeof window === 'undefined') return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
        case "click":
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;

        case "success":
            osc.type = "triangle";
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(880, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
            break;

        case "error":
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(100, now + 0.2);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
            break;

        case "cash":
            osc.type = "square";
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(2000, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
            // Double ding
            setTimeout(() => {
                const ctx2 = new AudioContext();
                const osc2 = ctx2.createOscillator();
                const gain2 = ctx2.createGain();
                osc2.connect(gain2);
                gain2.connect(ctx2.destination);
                osc2.type = "square";
                osc2.frequency.setValueAtTime(2000, ctx2.currentTime);
                gain2.gain.setValueAtTime(0.1, ctx2.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, ctx2.currentTime + 0.2);
                osc2.start(ctx2.currentTime);
                osc2.stop(ctx2.currentTime + 0.2);
            }, 100);
            break;

        case "siren":
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.linearRampToValueAtTime(900, now + 0.3);
            osc.frequency.linearRampToValueAtTime(600, now + 0.6);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 1.2);
            osc.start(now);
            osc.stop(now + 1.2);
            break;

        case "stamp":
            osc.type = "square"; // Thud sound
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
            break;
    }
};
