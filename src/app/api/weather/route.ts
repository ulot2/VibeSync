import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("OpenWeatherMap Error Details:", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      });
      throw new Error(`Weather API failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return NextResponse.json({
      temp: Math.round(data.main.temp),
      weather: data.weather[0].main,
      description: data.weather[0].description,
    });
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
