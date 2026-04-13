// ============================================================
// KEEPSTEAD™ — useAuth hook
// Single auth layer. Reads user tier and settings from Supabase.
// Everything feature-gated reads from this hook only.
// ============================================================

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  var [user, setUser] = useState(null);
  var [profile, setProfile] = useState(null);
  var [loading, setLoading] = useState(true);

  async function loadProfile(userId) {
    var result = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (result.data) {
      setProfile(result.data);
    }
  }

  useEffect(function () {
    // Get initial session
    supabase.auth.getSession().then(function (result) {
      var session = result.data.session;
      if (session && session.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    var sub = supabase.auth.onAuthStateChange(function (_event, session) {
      if (session && session.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return function () {
      sub.data.subscription.unsubscribe();
    };
  }, []);

  // Derived values — everything reads from profile, not hardcoded
  var tier = profile ? profile.tier : "free";
  var businessEnabled = profile ? profile.business_enabled : false;
  var commonsProEnabled = profile ? profile.commons_pro_enabled : false;
  var themeId = profile ? profile.theme_id : null; // null = use localStorage

  var isPaid = tier !== "free";
  var canPersist = isPaid;
  var canShare = isPaid;
  var hasBusiness = businessEnabled && (tier === "business" || tier === "all_in");
  var hasCommonsPro = commonsProEnabled && (tier === "commons_pro" || tier === "all_in");

  async function signIn(email, password) {
    return supabase.auth.signInWithPassword({ email: email, password: password });
  }

  async function signUp(email, password) {
    return supabase.auth.signUp({ email: email, password: password });
  }

  async function signOut() {
    return supabase.auth.signOut();
  }

  async function resetPassword(email) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://keepstead.pro/auth/reset",
    });
  }

  return {
    user: user,
    profile: profile,
    loading: loading,
    tier: tier,
    isPaid: isPaid,
    canPersist: canPersist,
    canShare: canShare,
    hasBusiness: hasBusiness,
    hasCommonsPro: hasCommonsPro,
    themeId: themeId,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    resetPassword: resetPassword,
  };
}
