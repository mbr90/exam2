/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "600px",
      pc: "1200px",
    },
    extend: {
      colors: {
        charcoal: "#23232C",
        deepsea: "#023C3E",
        midnightteal: "#1F5B58",
        cloud: "#F7F7F7",
        tigerlily: "#E66435",
      },
      fontFamily: {
        header: ["Nunito", "sans-serif"],
        text: ["Montserrat", "sans-serif"],
        button: ["maple-web", "sans-serif"],
      },
    },
  },
  plugins: [],
};
