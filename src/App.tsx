import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Dashboard, Metrics, Table, Login } from "./pages";
import { DashboardDetail } from "./pages/Dashboard/screens";
import { useMode } from "./context";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const { isDarkTheme } = useMode();
  return (
    <div>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Metrics />} path="/metrics" />
          <Route element={<Table />} path="/table" />
          <Route element={<Login />} path="/login" />
          <Route element={<DashboardDetail />} path="/:projectId" />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
