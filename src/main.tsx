import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Intro from "./pages/Intro";
import Register from "./pages/Register";
import Stage1 from "./pages/Stage1";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 첫 진입 시 Intro로 */}
        <Route path="/" element={<Navigate to="/intro" replace />} />

        {/* 페이지들 */}
        <Route path="/intro" element={<Intro />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stage-1" element={<Stage1 />} />

        {/* 임시 Level 페이지 */}
        <Route path="/level-1" element={<div style={{ padding: 16 }}>LEVEL 1 (다음 단계 준비중)</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
