/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*tsx"],
  theme: {
    extend: {
      colors: {
        buttonBgDark: "#24242D",
        gradientTo: "#262933",
        taskHover: "#7D7D94",
        buttonBgLight: "#F2F3FF",

        dark: {
          bg: "#1E1F25",
          title: "#FFF",
          purple: "#9494B8",
          border: "#29292F",
          text: "#DADADA",
          checkboxBorder: "#0E0E11",
          gradientFrom: "#2B2D37 ",
          gradientTo: "#262933",
        },
        light: {
          bg: "#FFF",
          title: "#000",
          text: "#575767",
          border: "#EBEBEB",
          gradientFrom: "#FCFCFC ",
          gradientTo: "#F8F8F8",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
