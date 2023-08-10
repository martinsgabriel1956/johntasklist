import { ReactNode, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const getTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(getTheme ?? "light");

  function changeTheme(theme: string) {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <ThemeContext.Provider value={{
      theme, changeTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}