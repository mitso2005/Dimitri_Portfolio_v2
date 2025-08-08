import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PageNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    if (menuOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    }
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden lg:flex absolute left-10 z-50 top-7 lg:top-5 gap-6 lg:gap-8">
        <Link to="/about"><h4 className="font-nav-sm hover:text-[var(--color-secondary-blue)]">ABOUT</h4></Link>
        <Link to="/work"><h4 className="font-nav-sm hover:text-[var(--color-secondary-blue)]">WORK</h4></Link>
        <Link to="/newsletter"><h4 className="font-nav-sm hover:text-[var(--color-secondary-blue)]">NEWSLETTER</h4></Link>
        <Link to="/contact"><h4 className="font-nav-sm hover:text-[var(--color-secondary-blue)]">CONTACT ME</h4></Link>
      </nav>

      {/* Mobile Hamburger */}
      <div className="lg:hidden fixed top-6 right-10 z-50">
        <button
          onClick={toggleMenu}
          className={`text-3xl cursor-pointer transition-colors ${
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
          <Link to="/newsletter" onClick={closeMenu}>
            <h4 className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors">NEWSLETTER</h4>
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            <h4 className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors">CONTACT</h4>
          </Link>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mt-8">
            <a 
              href="https://www.linkedin.com/in/dptrks/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a 
              href="https://github.com/mitso2005" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a 
              href="https://www.instagram.com/dimitri_petrakis/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a 
              href="https://www.tiktok.com/@dimitri_petrakis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--color-light)] hover:text-[var(--color-primary-blue)] transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
