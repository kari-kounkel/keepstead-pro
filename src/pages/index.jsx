import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { ROOMS } from "../config/rooms.config";
import { THEMES, STAINED_GLASS_ROOMS, THEME_ORDER } from "../config/themes.config";

export default function Home() {
  var { themeId, colors, setTheme, isStainedGlass } = useTheme("commons");

  return (
    <div style={{ minHeight: "100vh", background: colors.heroBg }}>

      {/* NAV */}
      <nav style={{
        background: colors.navBg,
        borderBottom: "1px solid " + colors.navBorder,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
      }}>
        <span style={{ fontSize: 22, fontWeight: "bold", color: colors.logoPrimary, letterSpacing: "-0.02em" }}>
          Keep<span style={{ color: colors.logoAccent }}>stead</span>
          <sup style={{ fontSize: 10, color: colors.logoAccent, verticalAlign: "super" }}>™</sup>
        </span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/auth/login" style={{ fontSize: 13, color: colors.subColor, textDecoration: "none" }}>Sign in</a>
          <a href="/auth/signup" style={{
            background: colors.btnBg,
            color: colors.btnText,
            padding: "8px 18px",
            borderRadius: 6,
            fontSize: 13,
            textDecoration: "none",
            fontFamily: "Georgia, serif",
          }}>Open your front door</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: "56px 24px 40px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.eyebrow, marginBottom: 12 }}>
          Let&apos;s get your house in order
        </div>
        <h1 style={{ fontSize: 44, lineHeight: 1.12, letterSpacing: "-0.025em", color: colors.h1Color, marginBottom: 16 }}>
          Your whole life.<br />
          <em style={{ color: colors.h1Accent }}>One house.</em>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: colors.subColor, maxWidth: "44ch", marginBottom: 28 }}>
          Seven rooms. One login. Free to try &mdash; everything works, nothing saves until you&apos;re ready.
        </p>
        <a href="/auth/signup" style={{
          display: "inline-block",
          background: colors.btnBg,
          color: colors.btnText,
          padding: "12px 28px",
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
      <div style={{ padding: "0 24px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: colors.subColor, marginBottom: 16 }}>
          The seven rooms
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {ROOMS.map(function (room) {
            var accent = isStainedGlass
              ? STAINED_GLASS_ROOMS[room.sgKey].accent
              : colors.accent;
            return (
              <div key={room.id} style={{
                background: colors.roomBg,
                borderRadius: 10,
                padding: "16px 18px",
                borderLeft: "3px solid " + accent,
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{room.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: colors.roomNameColor, marginBottom: 4 }}>
                  {room.label}
                </div>
                <div style={{ fontSize: 12, color: colors.roomDescColor, lineHeight: 1.4 }}>
                  {room.tagline}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRICING */}
      <div style={{
        borderTop: "1px solid " + colors.priceBorder,
        background: colors.navBg,
        padding: "28px 24px",
        display: "flex",
        gap: 12,
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: 900,
        margin: "0 auto",
      }}>
        {[
          { amt: "Free", lbl: "Use everything. Save nothing." },
          { amt: "$13/mo", lbl: "All rooms. Full house." },
          { amt: "$27/mo", lbl: "All in. Business too." },
        ].map(function (p) {
          return (
            <div key={p.amt} style={{
              background: colors.priceBg,
              borderRadius: 8,
              padding: "14px 20px",
              minWidth: 160,
              flex: 1,
            }}>
              <div style={{ fontSize: 24, fontWeight: "bold", color: colors.priceAmt }}>{p.amt}</div>
              <div style={{ fontSize: 12, color: colors.priceLbl, marginTop: 4 }}>{p.lbl}</div>
            </div>
          );
        })}
      </div>

      {/* THEME SWITCHER — Settings only in the real app, shown here for dev */}
      <div style={{ textAlign: "center", padding: "32px 24px", color: colors.subColor, fontSize: 12 }}>
        <div style={{ marginBottom: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>Theme preview</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {THEME_ORDER.map(function (tid) {
            var t = THEMES[tid];
            return (
              <button key={tid} onClick={function () { setTheme(tid); }} style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: "1.5px solid " + (themeId === tid ? colors.accent : colors.navBorder),
                background: themeId === tid ? colors.accent : "transparent",
                color: themeId === tid ? colors.btnText : colors.subColor,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "Georgia, serif",
              }}>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
