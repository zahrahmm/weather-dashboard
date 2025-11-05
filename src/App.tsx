import AppRoutes from "./routes/AppRoutes";
import { ThemeContextProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeContextProvider>
      <AppRoutes />
    </ThemeContextProvider>
  );
};

export default App;
