/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      main: "#1A3263",
      sub1: "#EA5455",
      sub2: "#FFB400",
      back: "#F6F7FB",
      font1: "#333333",
      font2: "#878787",
    },
    fontFamily: {
      suit: ["SUIT", "sans-serif"],
      righteous: ["Righteous", "sans-serif"],
      // maru: ["MaruBuri"],
      // sans: ["NanumBarunGothic", "sans-serif"],
      // sansbold: ["NanumBarunGothicBold", "sans-serif"],
      // sanslight: ["NanumBareunGothicLight", "sans-serif"],
      // sansultralight: ["NanumBareunGothicUltraLight", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
