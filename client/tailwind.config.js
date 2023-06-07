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
      },
      maxWidth: {
        600: "600px",
      },
      cursor: {
        pointer: "pointer",
      },
    },
  },
  plugins: [],
};
