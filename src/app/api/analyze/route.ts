import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const base64Data = image.split(",")[1] || image;

    const prompt =
      "Look at this image. Identify 3-5 keywords that describe the visual atmosphere, setting, and lighting (e.g., 'cozy', 'neon', 'rainy', 'minimalist'). Return ONLY the keywords separated by commas. Do not write sentences.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const responseText = result.response.text();
    console.log("Gemini Response:", responseText);

    const tags = responseText
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
