import { Sparkles } from "lucide-react";

interface AnalyzingProps {
  tags: string[];
  weather: any;
}

export function Analyzing({ tags, weather }: AnalyzingProps) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-background relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 blur-3xl rounded-full animate-pulse dark:bg-primary/10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full dark:bg-blue-600/10" />

      {/* Pulsing Core */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-primary blur-3xl animate-pulse opacity-30"></div>
        <div className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center animate-spin-slow bg-background/50 backdrop-blur-sm">
          <div className="w-24 h-24 rounded-full border-2 border-primary/50 flex items-center justify-center animate-ping-slow">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8 animate-pulse text-foreground">
        Analyzing Your Vibe
      </h2>

      {/* Steps */}
      <div className="flex flex-col gap-4 w-64">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div
            className={`w-4 h-4 rounded-full ${
              tags.length > 0 ? "bg-emerald-500" : "bg-muted animate-pulse"
            }`}
          ></div>
          <span>Detecting scene elements...</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div
            className={`w-4 h-4 rounded-full ${
              weather ? "bg-emerald-500" : "bg-muted animate-pulse"
            }`}
          ></div>
          <span>Checking weather conditions...</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-muted rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-primary w-1/2 animate-progress-indeterminate"></div>
      </div>
    </div>
  );
}
