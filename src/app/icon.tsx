import { ImageResponse } from "next/og";

export const contentType = "image/svg+xml";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="30" height="30" fill="#c8ff00" transform="rotate(45 30 30)" />
        </svg>
      </div>
    ),
    { width: 60, height: 60 }
  );
}
