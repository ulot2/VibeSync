import { Camera, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-background p-6 text-center relative overflow-hidden transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 blur-3xl rounded-full animate-pulse dark:bg-primary/10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full dark:bg-blue-600/10" />

      {/* Icon */}
      <div className="relative mb-8 transform hover:scale-105 transition-transform duration-500">
        <Camera className="w-24 h-24 text-foreground" strokeWidth={1.5} />
        <Sparkles className="absolute -top-2 -right-2 w-10 h-10 text-primary animate-bounce" />
      </div>

      <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary/80">
        VibeSync
      </h1>
      <p className="text-xl text-muted-foreground mb-8 font-light tracking-wide">
        Environment-Aware Music
      </p>

      <p className="text-muted-foreground max-w-xs mb-12 leading-relaxed">
        Snap a photo of your surroundings and discover the perfect playlist that
        matches your vibe.
      </p>

      <button
        onClick={onStart}
        className="w-full max-w-xs py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
      >
        Get Started
      </button>

      <div className="absolute bottom-4 text-xs text-muted-foreground/50">
        v1.1.0
      </div>
    </div>
  );
}
