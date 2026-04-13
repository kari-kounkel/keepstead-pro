// ============================================================
// KEEPSTEAD™ — useTheme hook
// Reads theme from user profile (paid) or localStorage (free).
// In Stained Glass mode, activeRoom drives the colors.
// Apply CSS variables to :root from here — one source of truth.
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { THEMES, STAINED_GLASS_ROOMS, DEFAULT_THEME } from "../config/themes.config";

var STORAGE_KEY = "keepstead_theme";

function getStainedGlassColors(roomId) {
  var room = STAINED_GLASS_ROOMS[roomId] || STAINED_GLASS_ROOMS["commons"];
  return {
    navBg: room.navBg,
    navBorder: room.priceBorder,
    logoPrimary: room.text,
    logoAccent: room.accent,
    heroBg: room.bg,
    eyebrow: room.accent,
    h1Color: room.text,
    h1Accent: room.accent,
    subColor: room.sub,
    btnBg: room.btnBg,
    btnText: room.btnText,
    roomBg: room.bg,
    roomNameColor: room.text,
    roomDescColor: room.sub,
    priceBorder: room.priceBorder,
    priceBg: room.priceBg,
    priceAmt: room.text,
    priceLbl: room.sub,
    inputBg: "#FFFFFF",
    inputBorder: room.priceBorder,
    inputText: room.text,
    cardBg: "#FFFFFF",
    cardBorder: room.priceBorder,
    accent: room.accent,
  };
}

function applyThemeToCss(colors) {
  var root = document.documentElement;
  Object.keys(colors).forEach(function (key) {
    root.style.setProperty("--ks-" + key, colors[key]);
  });
}

export function useTheme(activeRoomId) {
  var stored = "daylight";
  if (typeof window !== "undefined") {
    stored = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  }

  var [themeId, setThemeId] = useState(stored);

  var resolvedColors = useCallback(
    function () {
      if (themeId === "stainedglass") {
        return getStainedGlassColors(activeRoomId || "commons");
      }
      var theme = THEMES[themeId] || THEMES[DEFAULT_THEME];
      return Object.assign({}, theme, { accent: theme.logoAccent });
    },
    [themeId, activeRoomId]
  );

  // Apply CSS vars whenever theme or room changes
  useEffect(
    function () {
      if (typeof document !== "undefined") {
        applyThemeToCss(resolvedColors());
      }
    },
    [resolvedColors]
  );

  function setTheme(newThemeId) {
    if (!THEMES[newThemeId]) return;
    setThemeId(newThemeId);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newThemeId);
    }
    // TODO: save to user profile in Supabase for paid users
  }

  return {
    themeId: themeId,
    theme: THEMES[themeId] || THEMES[DEFAULT_THEME],
    colors: resolvedColors(),
    setTheme: setTheme,
    isStainedGlass: themeId === "stainedglass",
  };
}
