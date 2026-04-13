import { useState } from "react";
import { ROOMS } from "../config/rooms.config";
import { THEMES, STAINED_GLASS_ROOMS, THEME_ORDER } from "../config/themes.config";

// Landing starts neutral black and white.
// Visitor picks a theme and the whole page transforms live.
// That's the wow moment — before they even sign up.

var NEUTRAL = {
  bg: "#FAFAF9",
  navBg: "#FFFFFF",
  navBorder: "#E8E8E5",
  text: "#1A1A18",
  muted: "#6B6B67",
  faint: "#F0F0ED",
  border: "#E8E8E5",
  btnBg: "#1A1A18",
  btnText: "#FFFFFF",
  accent: "#1A1A18",
};

function getColors(themeId) {
  if (!themeId) return NEUTRAL;
  var t = THEMES[themeId];
  if (!t) return NEUTRAL;
  return {
    bg: t.heroBg,
    navBg: t.navBg,
    navBorder: t.navBorder,
    text: t.h1Color,
    muted: t.subColor,
    faint: t.priceBg,
    border: t.priceBorder,
    btnBg: t.btnBg,
    btnText: t.btnText,
    accent: t.logoAccent,
  };
}

export default function Home() {
  var [themeId, setThemeId] = useState(null);
  var C = getColors(themeId);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, transition: "background 0.3s ease" }}>

      {/* NAV */}
      <nav style={{
        background: C.navBg,
        borderBottom: "1px solid " + C.navBorder,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
        transition: "background 0.3s ease",
      }}>
        <span style={{ fontSize: 22, fontWeight: "bold", color: C.text, letterSpacing: "-0.02em", fontFamily: "Georgia, serif" }}>
          Keep<span style={{ color: C.accent }}>stead</span>
          <sup style={{ fontSize: 10, color: C.accent, verticalAlign: "super" }}>™</sup>
        </span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/auth/login" style={{ fontSize: 13, color: C.muted, textDecoration: "none", fontFamily: "Georgia, serif" }}>Sign in</a>
          <a href="/auth/signup" style={{
            background: C.btnBg,
            color: C.btnText,
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
        <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 14 }}>
          Let&apos;s get your house in order
        </div>
        <h1 style={{ fontSize: 46, lineHeight: 1.1, letterSpacing: "-0.025em", color: C.text, marginBottom: 18, fontFamily: "Georgia, serif" }}>
          Your whole life.<br />
          <em style={{ color: C.accent }}>One house.</em>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: C.muted, maxWidth: "44ch", marginBottom: 32 }}>
          Seven rooms. One login. Free to try &mdash; everything works, nothing saves until you&apos;re ready.
        </p>
        <a href="/auth/signup" style={{
          display: "inline-block",
          background: C.btnBg,
          color: C.btnText,
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

      {/* THEME PICKER */}
      <div style={{ padding: "0 24px 40px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 12 }}>
          Make it yours — pick a theme
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={function () { setThemeId(null); }}
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              border: "1.5px solid " + (!themeId ? "#1A1A18" : C.border),
              background: !themeId ? "#1A1A18" : "transparent",
              color: !themeId ? "#FFFFFF" : C.muted,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "Georgia, serif",
            }}
          >
            Default
          </button>
          {THEME_ORDER.map(function (tid) {
            var t = THEMES[tid];
            var isActive = themeId === tid;
            return (
              <button
                key={tid}
                onClick={function () { setThemeId(tid); }}
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  border: "1.5px solid " + (isActive ? t.btnBg : C.border),
                  background: isActive ? t.btnBg : "transparent",
                  color: isActive ? t.btnText : C.muted,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ROOMS */}
      <div style={{ padding: "0 24px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 16 }}>
          The seven rooms
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {ROOMS.map(function (room) {
            var accent = STAINED_GLASS_ROOMS[room.sgKey].accent;
            return (
              <div key={room.id} style={{
                background: C.navBg,
                borderRadius: 10,
                padding: "16px 18px",
                border: "1px solid " + C.border,
                borderLeft: "3px solid " + accent,
                transition: "background 0.3s ease",
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{room.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: C.text, marginBottom: 3, fontFamily: "Georgia, serif" }}>
                  {room.label}
                </div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>
                  {room.tagline}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRICING */}
      <div style={{
        borderTop: "1px solid " + C.border,
        background: C.navBg,
        padding: "28px 24px",
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
        transition: "background 0.3s ease",
      }}>
        {[
          { amt: "Free", lbl: "Use everything. Save nothing." },
          { amt: "$13/mo", lbl: "All rooms. Full house." },
          { amt: "$27/mo", lbl: "All in. Business too." },
        ].map(function (p) {
          return (
            <div key={p.amt} style={{
              background: C.faint,
              borderRadius: 8,
              padding: "14px 20px",
              minWidth: 160,
              flex: 1,
              maxWidth: 260,
            }}>
              <div style={{ fontSize: 22, fontWeight: "bold", color: C.text, fontFamily: "Georgia, serif" }}>{p.amt}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{p.lbl}</div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "24px", fontSize: 12, color: C.muted }}>
        &copy; {new Date().getFullYear()} Keepstead™ — CARES Consulting Inc.
      </div>

    </div>
  );
}
