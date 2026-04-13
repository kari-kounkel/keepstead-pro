import { ROOMS } from "../config/rooms.config";
import { STAINED_GLASS_ROOMS } from "../config/themes.config";

// Landing page uses a fixed neutral palette — no theme applied here.
// Themes are a user setting, not a marketing feature.
var N = {
  bg: "#FAFAF9",
  navBg: "#FFFFFF",
  navBorder: "#E8E8E5",
  text: "#1A1A18",
  muted: "#6B6B67",
  faint: "#F0F0ED",
  border: "#E8E8E5",
  btnBg: "#1A1A18",
  btnText: "#FFFFFF",
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: N.bg }}>

      {/* NAV */}
      <nav style={{
        background: N.navBg,
        borderBottom: "1px solid " + N.navBorder,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
      }}>
        <span style={{ fontSize: 22, fontWeight: "bold", color: N.text, letterSpacing: "-0.02em", fontFamily: "Georgia, serif" }}>
          Keep<span style={{ color: N.muted }}>stead</span>
          <sup style={{ fontSize: 10, color: N.muted, verticalAlign: "super" }}>™</sup>
        </span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/auth/login" style={{ fontSize: 13, color: N.muted, textDecoration: "none", fontFamily: "Georgia, serif" }}>Sign in</a>
          <a href="/auth/signup" style={{
            background: N.btnBg,
            color: N.btnText,
            padding: "8px 18px",
            borderRadius: 6,
            fontSize: 13,
            textDecoration: "none",
            fontFamily: "Georgia, serif",
          }}>Open your front door</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: "64px 24px 48px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: N.muted, marginBottom: 14 }}>
          Let&apos;s get your house in order
        </div>
        <h1 style={{ fontSize: 46, lineHeight: 1.1, letterSpacing: "-0.025em", color: N.text, marginBottom: 18, fontFamily: "Georgia, serif" }}>
          Your whole life.<br />
          <em style={{ color: N.muted }}>One house.</em>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: N.muted, maxWidth: "44ch", marginBottom: 32 }}>
          Seven rooms. One login. Free to try &mdash; everything works, nothing saves until you&apos;re ready.
        </p>
        <a href="/auth/signup" style={{
          display: "inline-block",
          background: N.btnBg,
          color: N.btnText,
          padding: "13px 30px",
          borderRadius: 8,
          fontSize: 15,
          textDecoration: "none",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
        }}>
          Open your front door
        </a>
      </div>

      {/* ROOMS */}
      <div style={{ padding: "0 24px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: N.muted, marginBottom: 16 }}>
          The seven rooms
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {ROOMS.map(function (room) {
            var accent = STAINED_GLASS_ROOMS[room.sgKey].accent;
            return (
              <div key={room.id} style={{
                background: N.navBg,
                borderRadius: 10,
                padding: "16px 18px",
                border: "1px solid " + N.border,
                borderLeft: "3px solid " + accent,
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{room.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: N.text, marginBottom: 3, fontFamily: "Georgia, serif" }}>
                  {room.label}
                </div>
                <div style={{ fontSize: 12, color: N.muted, lineHeight: 1.4 }}>
                  {room.tagline}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRICING */}
      <div style={{
        borderTop: "1px solid " + N.border,
        background: N.navBg,
        padding: "28px 24px",
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        {[
          { amt: "Free", lbl: "Use everything. Save nothing." },
          { amt: "$13/mo", lbl: "All rooms. Full house." },
          { amt: "$27/mo", lbl: "All in. Business too." },
        ].map(function (p) {
          return (
            <div key={p.amt} style={{
              background: N.faint,
              borderRadius: 8,
              padding: "14px 20px",
              minWidth: 160,
              flex: 1,
              maxWidth: 260,
            }}>
              <div style={{ fontSize: 22, fontWeight: "bold", color: N.text, fontFamily: "Georgia, serif" }}>{p.amt}</div>
              <div style={{ fontSize: 12, color: N.muted, marginTop: 4 }}>{p.lbl}</div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "24px", fontSize: 12, color: N.muted }}>
        &copy; {new Date().getFullYear()} Keepstead™ — CARES Consulting Inc.
      </div>

    </div>
  );
}
