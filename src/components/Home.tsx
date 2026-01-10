import { Camera, Sparkles } from "lucide-react";

interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 p-6 text-center relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full" />

      {/* Icon */}
      <div className="relative mb-8 transform hover:scale-105 transition-transform duration-500">
        <Camera className="w-24 h-24 text-white" strokeWidth={1.5} />
        <Sparkles className="absolute -top-2 -right-2 w-10 h-10 text-cyan-300 animate-bounce" />
      </div>

      <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
        VibeSync
      </h1>
      <p className="text-xl text-cyan-100 mb-8 font-light tracking-wide">
        Environment-Aware Music
      </p>

      <p className="text-slate-300 max-w-xs mb-12 leading-relaxed">
        Snap a photo of your surroundings and discover the perfect playlist that
        matches your vibe.
      </p>

      <button
        onClick={onStart}
        className="w-full max-w-xs py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-bold text-lg shadow-xl shadow-cyan-900/30 hover:shadow-cyan-500/50 transition-all active:scale-95 text-white"
      >
        Get Started
      </button>

      <div className="absolute bottom-4 text-xs text-white/30">v1.1.0</div>
    </div>
  );
}
