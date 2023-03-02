import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Hourly from './pages/Hourly';
import AppNavBar from './pages/AppNavBar';


export default function App() {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppNavBar />}>
            <Route index element={<Home />} />
            <Route path="/hourly" element={<Hourly />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
