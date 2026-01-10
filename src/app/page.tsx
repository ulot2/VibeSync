"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [weather, setWeather] = useState<any>(null);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        setImage(base64);
        setLoading(true);

        try {
          const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });
          const data = await response.json();
          setTags(data.tags || []);
        } catch (error) {
          console.error("Failed to analyze", error);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-dvh bg-linear-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      {weather && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
          {weather.temp}°C • {weather.description}
        </div>
      )}
      <label
        htmlFor="image"
        className="w-64 h-64 border-2 border-white/20 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-white/5 active:scale-95 text-gray-400"
      >
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <p className="text-gray-400">Upload Image</p>
        )}
      </label>
      {loading && (
        <p className="animate-pulse text-white mt-4">Analyzing vibes...</p>
      )}
      <div className="flex flex-wrap gap-2 mt-4 max-w-md justify-center">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/10 rounded-full text-sm text-white backdrop-blur-md"
          >
            {tag}
          </span>
        ))}
      </div>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        capture="environment"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
