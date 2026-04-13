import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function Login() {
  var router = useRouter();
  var { signIn } = useAuth();
  var { colors } = useTheme("commons");

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState("");
  var [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    var result = await signIn(email, password);
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: colors.heroBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>

      {/* Logo */}
      <a href="/" style={{ textDecoration: "none", marginBottom: 32 }}>
        <span style={{ fontSize: 26, fontWeight: "bold", color: colors.logoPrimary, letterSpacing: "-0.02em", fontFamily: "Georgia, serif" }}>
          Keep<span style={{ color: colors.logoAccent }}>stead</span>
          <sup style={{ fontSize: 11, color: colors.logoAccent, verticalAlign: "super" }}>™</sup>
        </span>
      </a>

      {/* Card */}
      <div style={{
        background: colors.cardBg,
        border: "1px solid " + colors.cardBorder,
        borderRadius: 14,
        padding: "36px 40px",
        width: "100%",
        maxWidth: 420,
      }}>
        <h1 style={{ fontSize: 22, color: colors.h1Color, marginBottom: 6, fontFamily: "Georgia, serif", fontWeight: "bold" }}>
          Welcome home.
        </h1>
        <p style={{ fontSize: 13, color: colors.subColor, marginBottom: 28 }}>
          Sign in to your Keepstead.
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, color: colors.subColor, marginBottom: 6, letterSpacing: "0.04em" }}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={function (e) { setEmail(e.target.value); }}
              required
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 7,
                border: "1px solid " + colors.inputBorder,
                background: colors.inputBg,
                color: colors.inputText,
                fontSize: 14,
                fontFamily: "Georgia, serif",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label style={{ fontSize: 12, color: colors.subColor, letterSpacing: "0.04em" }}>
                PASSWORD
              </label>
              <a href="/auth/reset" style={{ fontSize: 12, color: colors.logoAccent, textDecoration: "none" }}>
                Forgot?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={function (e) { setPassword(e.target.value); }}
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 7,
                border: "1px solid " + colors.inputBorder,
                background: colors.inputBg,
                color: colors.inputText,
                fontSize: 14,
                fontFamily: "Georgia, serif",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 7, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#B91C1C" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? colors.subColor : colors.btnBg,
              color: colors.btnText,
              border: "none",
              borderRadius: 7,
              fontSize: 15,
              fontFamily: "Georgia, serif",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: colors.subColor }}>
          No account yet?{" "}
          <a href="/auth/signup" style={{ color: colors.logoAccent, textDecoration: "none", fontWeight: "bold" }}>
            Create one free
          </a>
        </div>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: colors.subColor, textAlign: "center" }}>
        &copy; {new Date().getFullYear()} Keepstead™ — CARES Consulting Inc.
      </p>
    </div>
  );
}
