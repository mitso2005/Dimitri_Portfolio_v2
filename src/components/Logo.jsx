import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      className="
        fixed 
        top-4 
        left-4 
        md:right-4 md:left-auto 
        z-50
      "
    >
      <h5 className="text-lg md:text-xl font-semibold italic md:not-italic">
        <span className="md:hidden">Dimitri</span>
        <span className="hidden md:inline">Dimitri Petrakis</span>
      </h5>
    </Link>
  );
}
