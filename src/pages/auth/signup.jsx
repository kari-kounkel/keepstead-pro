import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function Signup() {
  var router = useRouter();
  var { signUp } = useAuth();
  var { colors } = useTheme("commons");

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [confirm, setConfirm] = useState("");
  var [error, setError] = useState("");
  var [success, setSuccess] = useState(false);
  var [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    var result = await signUp(email, password);
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: colors.heroBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{
          background: colors.cardBg,
          border: "1px solid " + colors.cardBorder,
          borderRadius: 14,
          padding: "40px",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🏡</div>
          <h1 style={{ fontSize: 22, color: colors.h1Color, fontFamily: "Georgia, serif", marginBottom: 12 }}>
            Your house is ready.
          </h1>
          <p style={{ fontSize: 14, color: colors.subColor, lineHeight: 1.6, marginBottom: 24 }}>
            Use the email and password you just created to sign in and walk through your front door.
          </p>
          <a href="/auth/login" style={{
            display: "inline-block",
            background: colors.btnBg,
            color: colors.btnText,
            padding: "11px 28px",
            borderRadius: 7,
            fontSize: 14,
            fontFamily: "Georgia, serif",
            textDecoration: "none",
            fontWeight: "bold",
          }}>
            Sign in now
          </a>
        </div>
      </div>
    );
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
          Open your front door.
        </h1>
        <p style={{ fontSize: 13, color: colors.subColor, marginBottom: 28 }}>
          Free forever. Nothing saves until you decide it should.
        </p>

        <form onSubmit={handleSignup}>
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

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, color: colors.subColor, marginBottom: 6, letterSpacing: "0.04em" }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={function (e) { setPassword(e.target.value); }}
              required
              placeholder="At least 8 characters"
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
            <label style={{ display: "block", fontSize: 12, color: colors.subColor, marginBottom: 6, letterSpacing: "0.04em" }}>
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              value={confirm}
              onChange={function (e) { setConfirm(e.target.value); }}
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
            {loading ? "Creating your house..." : "Create my free account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: colors.subColor }}>
          Already have an account?{" "}
          <a href="/auth/login" style={{ color: colors.logoAccent, textDecoration: "none", fontWeight: "bold" }}>
            Sign in
          </a>
        </div>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: colors.subColor, textAlign: "center" }}>
        &copy; {new Date().getFullYear()} Keepstead™ — CARES Consulting Inc.
      </p>
    </div>
  );
}
