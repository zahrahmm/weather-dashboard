import { createContext } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ColorModeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});
