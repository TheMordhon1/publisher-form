/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary50: "#F6F6F8",
        primary100: "#E9EAF0",
        primary200: "#D9DBE4",
        primary300: "#BEC1D2",
        primary400: "#9FA3BB",
        primary500: "#8789AA",
        primary700: "#6B698C",
        primary800: "#54526B",
        primary900: "#4B4A5E",
        primary950: "#2B273F",
        neutral: "#FDFDFD",
        secondary50: "#FFF7EC",
        secondary600: "#FF5D01",
        error50: "#FFF1F2",
        error: "#F83B48",
      },
      fontFamily: {
        regular: ["LF-regular", "sans-serif"],
        medium: ["LF-medium", "sans-serif"],
        semibold: ["LF-semibold", "sans-serif"],
        bold: ["LF-bold"],
      },
      fontSize: {
        xs: "12px",
        sm: "13px",
        base: "16px",
        lg: "18px",
        xl: "20px",
      },
    },
  },
  plugins: [],
};
