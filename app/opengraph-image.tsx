import { ImageResponse } from "next/og";

export const alt = "Brian Jeong, software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#1b1814",
          color: "#efe8da",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontFamily: "serif" }}>Brian Jeong</div>
          <div style={{ fontSize: 36, color: "#e3b673" }}>Software engineer · full-stack, backend, ML Ops</div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 30, color: "#cfc6b5" }}>
          <span>Central</span>
          <span>Chaeum</span>
          <span>PNC</span>
        </div>
      </div>
    ),
    size,
  );
}
