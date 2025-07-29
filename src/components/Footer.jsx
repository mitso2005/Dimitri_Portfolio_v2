import React from "react";
import { FaInstagram, FaLinkedin, FaTiktok, FaGithub } from "react-icons/fa";
import { Link } from "react-scroll";  // Import Link from react-scroll

function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 relative">
        <div className="text-center space-y-8 sm:space-y-4">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 sm:pt-0">
            <a href="https://github.com/mitso2005" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/dimitrios-petrakis-719443269/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/dimitri_petrakis" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.tiktok.com/@dimitri_petrakis" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
              <FaTiktok size={24} />
            </a>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex justify-center space-x-6 text-sm">
              {["About", "Downloads", "Projects", "Work", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item.toLowerCase()} // Scroll to the corresponding section
                    smooth={true} // Enable smooth scroll
                    duration={100} // Scroll duration in milliseconds
                    offset={-50} // Adjust the offset to account for the fixed navbar
                    className="hover:text-red-500 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright & Tech Stack */}
          <p className="text-xs text-gray-400 pb-6 sm:pb-0">
            © {new Date().getFullYear()} Dimitri Petrakis. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
