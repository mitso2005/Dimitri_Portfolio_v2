import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PageNav() {
  return (
    <nav className="hidden md:flex absolute top-5 left-10 gap-8">
      <Link to="/about">
        <h4>ABOUT</h4>
      </Link>
      <Link to="/work">
        <h4>WORK</h4>
      </Link>
      <Link to="/mail">
        <h4>MAIL</h4>
      </Link>
      <Link to="/contact">
        <h4>CONTACT</h4>
      </Link>
    </nav>
  );
}
