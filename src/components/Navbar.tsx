import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-primary/90 backdrop-blur-md border-b border-cosmic-blue/30 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl font-sans">A &lt;/&gt; M</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-text-secondary text-cosmic-blue transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#skills" className="text-text-secondary text-cosmic-purple transition-colors duration-300 font-medium">
              Skills
            </a>
            <a href="#projects" className="text-text-secondary text-cosmic-pink transition-colors duration-300 font-medium">
              Projects
            </a>
            <a href="#contact" className="text-text-secondary text-stellar-gold transition-colors duration-300 font-medium">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-text-secondary transition-all duration-300 p-2 rounded-lg border border-cosmic-blue/30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-cosmic-blue/20 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 mt-4 pb-4">
            <a
              href="#about"
              onClick={handleNavClick}
              className="text-text-secondary transition-all duration-200 py-2 border-b border-border/30 font-medium"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={handleNavClick}
              className="text-text-secondary transition-all duration-200 py-2 border-b border-border/30 font-medium"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={handleNavClick}
              className="text-text-secondary transition-all duration-200 py-2 border-b border-border/30 font-medium"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="text-text-secondary transition-all duration-200 py-2 font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
