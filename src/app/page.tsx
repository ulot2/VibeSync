"use client";

import { useEffect, useState } from "react";
import { Home } from "@/components/Home";
import { Capture } from "@/components/Capture";
import { Analyzing } from "@/components/Analyzing";
import { Result } from "@/components/Result";

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [view, setView] = useState<"home" | "capture" | "analyzing" | "result">(
    "home"
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `/api/weather?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setWeather(data);
        } catch (error) {
          console.error("Weather error:", error);
        }
      });
    }
  }, []);

  const handleAnalyze = async (base64: string) => {
    setImage(base64);
    setView("analyzing");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await response.json();
      setTags(data.tags || []);

      setTimeout(() => {
        setView("result");
      }, 2000);
    } catch (error) {
      console.error("Failed to analyze", error);
      setView("capture");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        handleAnalyze(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestart = () => {
    setImage(null);
    setTags([]);
    setView("home");
  };

  return (
    <div className="min-h-dvh bg-slate-900 text-white font-sans">
      {view === "home" && <Home onStart={() => setView("capture")} />}

      {view === "capture" && (
        <Capture
          onBack={() => setView("home")}
          onImageUpload={handleImageUpload}
          onCapture={handleAnalyze}
        />
      )}

      {view === "analyzing" && <Analyzing tags={tags} weather={weather} />}

      {view === "result" && (
        <Result
          image={image}
          tags={tags}
          weather={weather}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
