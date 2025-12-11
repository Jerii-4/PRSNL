/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      animation: {
        tear: "tear 0.6s ease-in forwards",
        "fade-out": "fadeOut 0.5s ease-out forwards",
      },
      keyframes: {
        tear: {
          "0%": { transform: "rotate(0deg) scale(1)", opacity: "1" },
          "50%": {
            transform: "rotate(5deg) translateY(-10px)",
            opacity: "0.8",
          },
          "100%": { transform: "rotate(10deg) translateY(50px)", opacity: "0" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
