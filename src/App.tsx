import { useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Button,
} from "@mui/material";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#2196f3" },
          background: {
            default: darkMode ? "#050f24" : "#f3fafe",
            paper: darkMode ? "#111827" : "#fff",
          },
          text: { primary: darkMode ? "#fff" : "#050f24" },
        },
        typography: { fontFamily: "Roboto, sans-serif" },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ minHeight: "100vh", py: 4 }}>
        <AppRoutes />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
