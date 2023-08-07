/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*tsx"],
  theme: {
    extend: {
      colors: {
        bg: "#1E1F25",
        darker: "#0E0E11",
        buttonBg: "#24242D",
        borderDark: "#29292F",
        darkPurple: "#9494B8",
        gradientFrom: "#2B2D37 ",
        gradientTo: "#262933",
        textDark: "#DADADA",
        taskHover: "#7D7D94",
      },
    },
  },
  plugins: [],
};
