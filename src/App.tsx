import { Routes, Route } from "react-router-dom";
import "./App.css";

import { Dashboard, Metrics, Table } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Metrics />} path="/metrics" />
        <Route element={<Table />} path="/table" />
      </Routes>
    </div>
  );
}

export default App;
