import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logo from './components/Logo';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Mail from './pages/Newsletter';
import Contact from './pages/Contact';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      {/* Fixed gradient background bar at top of screen */}
      <div 
        className="fixed top-0 left-0 right-0 z-30"
        style={{ 
          height: '120px',
          background: 'linear-gradient(to bottom, var(--color-light) 50%, transparent 100%)'
        }}
      />
      
      <Logo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/newsletter" element={<Mail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
