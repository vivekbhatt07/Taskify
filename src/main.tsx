import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ModeProvider, ProjectProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ModeProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </ModeProvider>
    </Router>
  </React.StrictMode>
);
