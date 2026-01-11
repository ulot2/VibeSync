import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  const limit = searchParams.get("limit") || "6";

  if (!term) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        term
      )}&media=music&entity=song&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`iTunes API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching music:", error);
    return NextResponse.json(
      { error: "Failed to fetch music data" },
      { status: 500 }
    );
  }
}
