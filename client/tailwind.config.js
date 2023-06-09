/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
      },
      backgroundColor: {
        primaryWhite: `#F5F5F5`,
        primaryBlue: `#1266dd`,
        primaryRed: `#f73859`,
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-50": "rgba(0,0,0,0.5)",
        "overlay-70": "rgba(0,0,0,0.7)",
        redOverlay: "rgba(223,68,68,0.2)",
      },
      maxWidth: {
        600: "600px",
        1100: "1100px",
      },
      minWidth: {
        200: "200px",
      },
      cursor: {
        pointer: "pointer",
      },
      flex: {
        3: "3 3 0%",
      },
    },
  },
  plugins: [],
};
