import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Mail from './pages/Mail';
import Contact from './pages/Contact';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
        {/* Custom color palette test */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ background: 'var(--color-primary-blue)', color: '#111B2D', padding: '1rem', borderRadius: '8px' }}>
              --color-primary-blue
            </div>
            <div style={{ background: 'var(--color-primary-pink)', color: '#111B2D', padding: '1rem', borderRadius: '8px' }}>
              --color-primary-pink
            </div>
            <div style={{ background: 'var(--color-secondary-blue)', color: '#fff', padding: '1rem', borderRadius: '8px' }}>
              --color-secondary-blue
            </div>
            <div style={{ background: 'var(--color-light)', color: '#111B2D', padding: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}>
              --color-light
            </div>
            <div style={{ background: 'var(--color-dark)', color: '#fff', padding: '1rem', borderRadius: '8px' }}>
              --color-dark
            </div>
          </div>
        </div>
      </>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
