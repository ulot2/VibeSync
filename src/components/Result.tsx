import { Sparkles, Play, Music, Heart } from "lucide-react";

interface ResultProps {
  image: string | null;
  tags: string[];
  weather: any;
  onRestart: () => void;
}

export function Result({ image, tags, weather, onRestart }: ResultProps) {
  const getVibeLink = () => {
    const queryParts = [...tags];
    if (weather?.description) {
      queryParts.push(weather.description);
    }
    const query = queryParts.join(" ");
    return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
  };

  return (
    <div className="h-dvh flex flex-col bg-background overflow-y-auto font-sans transition-colors duration-300">
      {/* Hero Image */}
      <div className="h-2/5 relative shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
        <img
          src={image || ""}
          alt="Vibe Source"
          className="w-full h-full object-cover"
        />

        {/* Context Chips */}
        <div className="absolute bottom-4 left-4 z-20 flex gap-2">
          {weather && (
            <div className="px-3 py-1 rounded-full bg-background/60 backdrop-blur-md text-xs font-semibold flex items-center gap-1 text-foreground border border-border">
              {weather.main === "Rain"
                ? "🌧️"
                : weather.main === "Clear"
                ? "☀️"
                : "☁️"}{" "}
              {weather.description}
            </div>
          )}
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 p-6 -mt-8 relative z-20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
            AI-CURATED FOR YOUR VIBE
          </span>
          <div className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
            <Sparkles className="w-3 h-3" /> 98% Match
          </div>
        </div>

        {/* Title Generator */}
        <h1 className="text-3xl font-bold leading-tight mb-4 text-foreground">
          {weather?.main === "Rain"
            ? "Cozy Rainy"
            : weather?.main === "Clear"
            ? "Sunny"
            : "Atmospheric"}{" "}
          {tags[0] || "Vibe"} {tags[1] || "Flow"}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>6 tracks</span>
          <span>•</span>
          <span>22 min</span>
          <button
            onClick={onRestart}
            className="ml-auto text-primary hover:text-primary/80 text-xs uppercase font-bold tracking-wider"
          >
            New Vibe
          </button>
        </div>

        {/* Action Button */}
        <a
          href={getVibeLink()}
          target="_blank"
          rel="noreferrer"
          className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-center shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mb-8 hover:scale-105 transition-transform"
        >
          <Play className="w-5 h-5 fill-current" /> Play on Spotify
        </a>

        {/* Simulated Playlist Preview */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Music className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                {tags[0] || "Vibe"} Anthem
              </h3>
              <p className="text-xs text-muted-foreground">
                The Vibe Collective
              </p>
            </div>
            <Heart className="w-5 h-5 text-emerald-500 fill-current" />
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4 opacity-70">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Music className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                Ambience for {weather?.main || "Focus"}
              </h3>
              <p className="text-xs text-muted-foreground">Chill Beats</p>
            </div>
            <Heart className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
