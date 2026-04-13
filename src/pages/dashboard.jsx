import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { ROOMS } from "../config/rooms.config";
import { STAINED_GLASS_ROOMS } from "../config/themes.config";

export default function Dashboard() {
  var router = useRouter();
  var { user, loading, signOut, tier } = useAuth();
  var { colors, isStainedGlass } = useTheme("commons");

  useEffect(function () {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: colors.heroBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: colors.subColor, fontFamily: "Georgia, serif" }}>Opening your house...</p>
      </div>
    );
  }

  if (!user) return null;

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

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
        <span style={{ fontSize: 20, fontWeight: "bold", color: colors.logoPrimary, letterSpacing: "-0.02em", fontFamily: "Georgia, serif" }}>
          Keep<span style={{ color: colors.logoAccent }}>stead</span>
          <sup style={{ fontSize: 10, color: colors.logoAccent, verticalAlign: "super" }}>™</sup>
        </span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: colors.subColor }}>
            {user.email}
          </span>
          <button
            onClick={handleSignOut}
            style={{
              fontSize: 12,
              color: colors.subColor,
              background: "transparent",
              border: "1px solid " + colors.navBorder,
              borderRadius: 6,
              padding: "6px 14px",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
            }}
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ padding: "40px 24px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: colors.eyebrow, marginBottom: 10 }}>
          Your house
        </div>
        <h1 style={{ fontSize: 32, color: colors.h1Color, fontFamily: "Georgia, serif", marginBottom: 6 }}>
          Welcome home.
        </h1>
        <p style={{ fontSize: 14, color: colors.subColor }}>
          {tier === "free"
            ? "You're on the free plan. Everything works — nothing saves yet."
            : "All rooms open. Everything saves."}
        </p>
      </div>

      {/* ROOMS GRID */}
      <div style={{ padding: "0 24px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {ROOMS.map(function (room) {
            var accent = isStainedGlass
              ? STAINED_GLASS_ROOMS[room.sgKey].accent
              : colors.accent;
            var locked = room.minTier === "paid" && tier === "free";

            return (
              <div
                key={room.id}
                onClick={function () {
                  if (!locked) router.push(room.path);
                }}
                style={{
                  background: colors.cardBg,
                  border: "1px solid " + colors.cardBorder,
                  borderLeft: "4px solid " + accent,
                  borderRadius: 10,
                  padding: "20px 22px",
                  cursor: locked ? "default" : "pointer",
                  opacity: locked ? 0.5 : 1,
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{room.emoji}</div>
                <div style={{ fontSize: 15, fontWeight: "bold", color: colors.roomNameColor, fontFamily: "Georgia, serif", marginBottom: 4 }}>
                  {room.label}
                </div>
                <div style={{ fontSize: 12, color: colors.roomDescColor, lineHeight: 1.5 }}>
                  {room.tagline}
                </div>
                {locked && (
                  <div style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    fontSize: 10,
                    color: colors.subColor,
                    background: colors.priceBg,
                    border: "1px solid " + colors.priceBorder,
                    borderRadius: 4,
                    padding: "2px 7px",
                    letterSpacing: "0.05em",
                  }}>
                    UPGRADE
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
