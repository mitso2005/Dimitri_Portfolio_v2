import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AssetPreloader from './components/AssetPreloader.jsx';
import Logo from './components/Logo';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Mail from './pages/Newsletter';
import Contact from './pages/Contact';
import './App.css'

function App() {
  return (
    <HashRouter>
      <AssetPreloader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/newsletter" element={<Mail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  )
}

export default App
