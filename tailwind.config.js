/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "/src/**/*.{js,ts,jsx,tsx}", // Ensure this matches your project structure
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Must be here
  ],
};
