import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PageNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex absolute top-5 left-10 gap-8 z-50">
        <Link to="/about"><h4 className="hover:text-[var(--color-primary-blue)]">ABOUT</h4></Link>
        <Link to="/work"><h4 className="hover:text-[var(--color-primary-blue)]">WORK</h4></Link>
        <Link to="/mail"><h4 className="hover:text-[var(--color-primary-blue)]">MAIL</h4></Link>
        <Link to="/contact"><h4 className="hover:text-[var(--color-primary-blue)]">CONTACT</h4></Link>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-6 right-10 z-50">
        <button
          onClick={toggleMenu}
          className={`text-3xl transition-colors ${
            menuOpen
              ? 'text-[var(--color-light)] hover:text-[var(--color-primary-pink)]'
              : 'text-[var(--color-dark)] hover:text-[var(--color-secondary-blue)]'
          }`}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[var(--color-dark)] flex flex-col items-center justify-center gap-10 z-40"
        >
          <Link to="/about" onClick={closeMenu}>
            <h4 className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors">ABOUT</h4>
          </Link>
          <Link to="/work" onClick={closeMenu}>
            <h4 className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors">WORK</h4>
          </Link>
          <Link to="/mail" onClick={closeMenu}>
            <h4 className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors">MAIL</h4>
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            <h4 className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors">CONTACT</h4>
          </Link>
        </div>
      )}
    </>
  );
}
