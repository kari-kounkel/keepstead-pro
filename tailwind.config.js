/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/hooks/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // All colors use CSS variables set by useTheme.
      // This means every component is automatically theme-aware.
      colors: {
        ks: {
          navBg: "var(--ks-navBg)",
          navBorder: "var(--ks-navBorder)",
          logoPrimary: "var(--ks-logoPrimary)",
          logoAccent: "var(--ks-logoAccent)",
          heroBg: "var(--ks-heroBg)",
          eyebrow: "var(--ks-eyebrow)",
          h1: "var(--ks-h1Color)",
          h1Accent: "var(--ks-h1Accent)",
          sub: "var(--ks-subColor)",
          btn: "var(--ks-btnBg)",
          btnText: "var(--ks-btnText)",
          roomBg: "var(--ks-roomBg)",
          roomName: "var(--ks-roomNameColor)",
          roomDesc: "var(--ks-roomDescColor)",
          priceBorder: "var(--ks-priceBorder)",
          priceBg: "var(--ks-priceBg)",
          priceAmt: "var(--ks-priceAmt)",
          priceLbl: "var(--ks-priceLbl)",
          inputBg: "var(--ks-inputBg)",
          inputBorder: "var(--ks-inputBorder)",
          inputText: "var(--ks-inputText)",
          cardBg: "var(--ks-cardBg)",
          cardBorder: "var(--ks-cardBorder)",
          accent: "var(--ks-accent)",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
