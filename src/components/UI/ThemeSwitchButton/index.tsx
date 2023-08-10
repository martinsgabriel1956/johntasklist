import { Moon, Sun } from "phosphor-react";
import { useContext } from "react";
import clsx from 'clsx';
import { ThemeContext } from "../../../context/ThemeContext";

export function ThemeSwitchButton() {
  const { theme, changeTheme } = useContext(ThemeContext);

  function handleChangeTheme() {
    changeTheme(theme);
  }

  return (
    <div
      className={clsx("flex items-center justify-center rounded-md border border-solid  w-12 h-12 absolute right-[4.5rem] top-16 transition-all", {
        "bg-buttonBgDark": theme === "dark",
        "border-dark-border": theme === "dark",
        "bg-buttonBgLight": theme === "light",
        "border-light-border": theme === "light",
        "text-dark-text": theme === "dark",
        "text-light-text": theme === "light",
      })}
    >
      <button
        title="Change theme"
        className=""
        onClick={handleChangeTheme}
      >
        {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
      </button>
    </div>
  );
}