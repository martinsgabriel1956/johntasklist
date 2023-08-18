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
      keyframes: {
        slideIn: {
          from: { transform: "translateX(calc(100% + 25px))" },
          to: { transform: "translateX(0)" },
        },
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        ["slide-in"]: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        hide: "hide 100ms ease-in",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
