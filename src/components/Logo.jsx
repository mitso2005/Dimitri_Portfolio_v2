import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      className="
        animate-fade-in
        fixed 
        top-6
        left-10
        lg:right-10 lg:left-auto 
        z-50
      "
    >
      <h5 className="font-bold italic lg:not-italic">
        <span className="lg:hidden">Dimitri</span>
        <span className="hidden lg:inline">Dimitri Petrakis</span>
      </h5>
    </Link>
  );
}
