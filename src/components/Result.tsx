import {
  Sparkles,
  Play,
  Pause,
  Music,
  Heart,
  Camera,
  MapPin,
  Coffee,
  CloudRain,
  Sun,
  Monitor,
  Briefcase,
  Feather,
  ExternalLink,
} from "lucide-react";
import { ReactNode, useEffect, useState, useRef } from "react";

interface ResultProps {
  image: string | null;
  tags: string[];
  weather: any;
  onRestart: () => void;
}

interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string; // Apple Music Link
}

export function Result({ image, tags, weather, onRestart }: ResultProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState<number | null>(null); // trackId
  const [loading, setLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      setLoading(true);
      const queryParts = [...tags];
      if (weather?.description) {
        queryParts.push(weather.description);
      }
      const query = queryParts.slice(0, 3).join(" "); // Limit query to first few relevant terms

      try {
        const res = await fetch(
          `/api/music/search?term=${encodeURIComponent(query)}&limit=6`
        );
        const data = await res.json();
        if (data.results) {
          setSongs(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch music", error);
      } finally {
        setLoading(false);
      }
    };

    if (tags.length > 0) {
      fetchMusic();
    }
  }, [tags, weather]);

  const togglePlay = (previewUrl: string, trackId: number) => {
    if (isPlaying === trackId) {
      audioRef.current?.pause();
      setIsPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(previewUrl);
      audioRef.current.play();
      audioRef.current.onended = () => setIsPlaying(null);
      setIsPlaying(trackId);
    }
  };

  const getSpotifyLink = (term: string) =>
    `https://open.spotify.com/search/${encodeURIComponent(term)}`;
  const getSoundCloudLink = (term: string) =>
    `https://soundcloud.com/search?q=${encodeURIComponent(term)}`;
  const getAudiomackLink = (term: string) =>
    `https://audiomack.com/search?q=${encodeURIComponent(term)}`;

  const getTagConfig = (tag: string): { icon: ReactNode; color: string } => {
    const lowerTag = tag.toLowerCase();

    if (lowerTag.includes("coffee") || lowerTag.includes("cafe")) {
      return {
        icon: <Coffee className="w-3.5 h-3.5" />,
        color: "bg-purple-600/80 border-purple-400/30",
      };
    }
    if (lowerTag.includes("rain") || lowerTag.includes("storm")) {
      return {
        icon: <CloudRain className="w-3.5 h-3.5" />,
        color: "bg-blue-600/80 border-blue-400/30",
      };
    }
    if (
      lowerTag.includes("sun") ||
      lowerTag.includes("sunny") ||
      lowerTag.includes("bright")
    ) {
      return {
        icon: <Sun className="w-3.5 h-3.5" />,
        color: "bg-amber-500/80 border-amber-300/30",
      };
    }
    if (lowerTag.includes("window") || lowerTag.includes("glass")) {
      return {
        icon: <Monitor className="w-3.5 h-3.5" />,
        color: "bg-slate-700/80 border-slate-500/30",
      };
    }
    if (lowerTag.includes("work") || lowerTag.includes("office")) {
      return {
        icon: <Briefcase className="w-3.5 h-3.5" />,
        color: "bg-emerald-600/80 border-emerald-400/30",
      };
    }
    if (lowerTag.includes("cozy") || lowerTag.includes("warm")) {
      return {
        icon: <Feather className="w-3.5 h-3.5" />,
        color: "bg-orange-600/80 border-orange-400/30",
      };
    }

    // Default
    return {
      icon: <Sparkles className="w-3.5 h-3.5" />,
      color: "bg-white/10 border-white/10",
    };
  };

  return (
    <div className="h-dvh flex flex-col bg-background overflow-y-auto font-sans transition-colors duration-300">
      {/* Hero Image Section */}
      <div className="h-2/5 relative shrink-0 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none"></div>
        <img
          src={image || ""}
          alt="Vibe Source"
          className="w-full h-full object-cover"
        />

        {/* Camera Button (Top Right) */}
        <button
          onClick={onRestart}
          className="absolute top-6 right-6 z-30 p-3 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/20 shadow-lg hover:bg-black/60 transition-all active:scale-95"
          aria-label="New Photo"
        >
          <Camera className="w-6 h-6" />
        </button>

        {/* Tags & Location Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-3 w-full pr-4">
          {/* Tags Row */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, i) => {
              const { icon, color } = getTagConfig(tag);
              return (
                <div
                  key={i}
                  className={`px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-bold flex items-center gap-1.5 text-white border shadow-sm ${color}`}
                >
                  {icon}
                  <span className="capitalize">{tag}</span>
                </div>
              );
            })}
          </div>

          {/* Location Info */}
          <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium pl-1">
            <MapPin className="w-4 h-4 text-white/80" />
            <span className="drop-shadow-sm">
              {weather?.name || "Current Location"}
            </span>
            {weather?.temp && (
              <>
                <span className="opacity-60">•</span>
                <span className="drop-shadow-sm">
                  {Math.round(weather.temp)}°C
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 p-6 -mt-6 relative z-20 bg-background rounded-t-3xl min-h-[60%]">
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
          <span>{songs.length || 6} tracks</span>
          <span>•</span>
          <span>{loading ? "Loading..." : "Curated Details"}</span>
        </div>

        {/* Songs List */}
        <div className="space-y-4 pb-20">
          {songs.map((song) => (
            <div
              key={song.trackId}
              className="group p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={song.artworkUrl100}
                    alt={song.trackName}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => togglePlay(song.previewUrl, song.trackId)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {isPlaying === song.trackId ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {song.trackName}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {song.artistName}
                  </p>
                </div>

                <button
                  onClick={() => togglePlay(song.previewUrl, song.trackId)}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 md:hidden"
                >
                  {isPlaying === song.trackId ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>
              </div>

              {/* Universal Links */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <a
                  href={song.trackViewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 text-[10px] font-medium bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 text-center transition-colors"
                >
                  Apple Music
                </a>
                <a
                  href={getSpotifyLink(song.trackName + " " + song.artistName)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 text-[10px] font-medium bg-green-500/10 text-green-600 rounded hover:bg-green-500/20 text-center transition-colors"
                >
                  Spotify
                </a>
                <a
                  href={getSoundCloudLink(
                    song.trackName + " " + song.artistName
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 text-[10px] font-medium bg-orange-500/10 text-orange-600 rounded hover:bg-orange-500/20 text-center transition-colors"
                >
                  SoundCloud
                </a>
                <a
                  href={getAudiomackLink(
                    song.trackName + " " + song.artistName
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 text-[10px] font-medium bg-yellow-500/10 text-yellow-600 rounded hover:bg-yellow-500/20 text-center transition-colors"
                >
                  Audiomack
                </a>
              </div>
            </div>
          ))}

          {songs.length === 0 && !loading && (
            <div className="text-center text-muted-foreground py-10">
              <Music className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No vibes found for this combination.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
