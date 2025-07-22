import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Custom color palette test */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Custom Color Palette Test</h2>
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
  )
}

export default App
