import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext } from "./ColorModeContext";

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#2196f3" },
          background: {
            default: darkMode ? "#151D32" : "#f3fafe",
          },
          text: {
            primary: darkMode ? "#fff" : "#050f24",
          },
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
        },
      }),
    [darkMode]
  );

  return (
    <ColorModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
