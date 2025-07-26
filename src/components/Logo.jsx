import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      className="
        animate-fade-in
        fixed 
        top-5
        left-10
        md:right-10 md:left-auto 
        z-50
      "
    >
      <h5 className="font-bold italic md:not-italic">
        <span className="md:hidden">Dimitri</span>
        <span className="hidden md:inline">Dimitri Petrakis</span>
      </h5>
    </Link>
  );
}
