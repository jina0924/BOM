/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      main: "#1A3263",
      sub1: "#EA5455",
      sub2: "#FFB400",
      back: "#F6F7FB",
      blue: "#5C78B1",
      white: "#FFFFFF",
      gray: "#BFBFBF",
      black: "#000000",
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
    extend: {
      boxShadow: {
        bg: "0px 0px 20px rgba(184, 184, 184, 0.2)",
        side: "2px 0px 10px rgba(184, 184, 184, 0.2)",
        head: "0px 4px 10px rgba(184, 184, 184, 0.2)",
        box: "0px 4px 10px rgba(184, 184, 184, 0.2)",
        dark: "2px 4px 10px rgba(51, 51, 51, 0.2)",
        login: "2px 4px 10px rgba(184, 184, 184, 0.2)",
        loginbtn: "2px 4px 5px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
    styled: true,
  },
};
