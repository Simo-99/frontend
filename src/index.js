import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Navbar />
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </HashRouter>
);
