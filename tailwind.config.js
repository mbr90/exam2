/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#23232C",
        deepsea: "#023C3E",
        ash: "#9E9E9E",
        cloud: "#F7F7F7",
        bronze: "#8C7251",
        sandstone: "#D6B387",
        tigerlily: "#E66435",
        salmon: "#E9805A",
      },
    },
  },
  plugins: [],
};
