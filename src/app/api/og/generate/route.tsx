// app/api/og/generate/route.ts
import { ImageResponse } from "next/og";

export const runtime = "edge";           // Mantener en edge
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

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
          background: "#0f172a", // slate-900
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
    size
  );
}
