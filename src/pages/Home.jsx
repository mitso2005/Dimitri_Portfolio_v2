import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav style={{ margin: '2rem 0', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <Link to="/about">About</Link>
        <Link to="/work">Work</Link>
        <Link to="/mail">Mail</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <p>Welcome to the portfolio homepage.</p>
    </div>
  );
}
