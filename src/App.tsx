import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Dashboard, Metrics, Table, Login, SignUp } from "./pages";
import { DashboardDetail } from "./pages/Dashboard/screens";
import { useMode } from "./context";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./auth/PublicRoute";

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
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route
            path="/signup"
            element={<PublicRoute element={<SignUp />} />}
          />
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          <Route
            path="/metrics"
            element={<PrivateRoute element={<Metrics />} />}
          />
          <Route path="/table" element={<PrivateRoute element={<Table />} />} />
          <Route
            path="/:projectId"
            element={<PrivateRoute element={<DashboardDetail />} />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
