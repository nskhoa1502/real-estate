/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
      },
    },
  },
  plugins: [],
};
