import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          backgroundColor: "#080808",
          color: "#e8e8e8",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#444444",
            }}
          >
            Creative Technology Studio
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            SENO
          </span>
          <span
            style={{
              fontSize: "20px",
              color: "#777777",
              marginTop: "8px",
            }}
          >
            Crafting immersive digital experiences
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
