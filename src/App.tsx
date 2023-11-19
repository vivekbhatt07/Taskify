import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Dashboard, Metrics, Table, Login, SignUp } from "./pages";
import { DashboardDetail } from "./pages/Dashboard/screens";
import { useMode } from "./context";
import RequiresAuth from "./auth/RequiresAuth";

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
      <Toaster />
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route
            element={
              <RequiresAuth>
                <Dashboard />
              </RequiresAuth>
            }
            path="/"
          />
          <Route
            element={
              <RequiresAuth>
                <Metrics />
              </RequiresAuth>
            }
            path="/metrics"
          />
          <Route
            element={
              <RequiresAuth>
                <Table />
              </RequiresAuth>
            }
            path="/table"
          />

          <Route
            element={
              <RequiresAuth>
                <DashboardDetail />
              </RequiresAuth>
            }
            path="/:projectId"
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
