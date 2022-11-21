import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NAVBAR from "./components/NAVBAR";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <NAVBAR />
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </HashRouter>
);
