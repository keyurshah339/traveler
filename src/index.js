import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./components/Reducer/Reducer";
import { AuthProvider } from "./components/Reducer/AuthReducer";
import { ActionManagementProvider } from "./components/Contexts/ActionManagementContext";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ActionManagementProvider>
        <AuthProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </AuthProvider>
      </ActionManagementProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
