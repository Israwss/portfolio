// src/app/api/og/generate/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge"; // debe ser edge

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Israel Martínez — Portfolio").slice(0, 120);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "white",
          padding: 60,
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 980, fontSize: 72, lineHeight: 1.1, fontWeight: 800, letterSpacing: -1 }}>
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 } // pasa el size aquí
  );
}
