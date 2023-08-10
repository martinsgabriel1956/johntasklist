import { createContext } from "react";

interface ThemeContextProps {
  theme: string;
  changeTheme: (theme: string) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);
