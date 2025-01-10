/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Agrega Roboto como fuente personalizada
      },
      animation: {
        "zoom-in": "zoomIn 0.5s ease-in-out forwards ",
        "zoom-out": "zoomOut 0.5s ease-in-out  forwards ",
      },
      keyframes: {
        zoomIn: {
          "0%": {
            transform: "scale(0)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        zoomOut: {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
