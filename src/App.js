import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Views/Home.tsx";
import {Analytics} from '@vercel/analytics/react';

import './App.css';
import PromoAgent from "./Views/PromoAgent.tsx";
import PromoAgentApplication from "./Views/PromoAgentApplication.tsx";

function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promo-agent/application" element={<PromoAgentApplication />} />
        <Route path="/promo-agent" element={<PromoAgent />} />
      </Routes>
    </Router>
  );
}

export default App;