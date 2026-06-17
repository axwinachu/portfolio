import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Resume', href: '/aswin%20resume%20.pdf', download: 'Aswin_R_Resume.pdf' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress line percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check if scrolled past threshold for background opacity
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href, isDownload) => {
    if (isDownload) return; // Allow normal browser download behavior
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, { offset: -80 });
      } else {
        const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-lg border border-primary/40 flex items-center justify-center bg-black transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-white text-lg font-black tracking-tight font-display">A</span>
            </div>
            <span className="text-white font-display font-extrabold tracking-wider text-xl group-hover:text-primary transition-colors">
              ASWIN<span className="text-primary font-black">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                download={link.download}
                onClick={(e) => handleLinkClick(e, link.href, link.download)}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium tracking-wide relative py-2 group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] cursor-pointer"
            >
              Hire Me <ArrowUpRight size={14} />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white hover:text-primary transition-colors p-2 z-50 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_8px_#ff0000]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(30px at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(1500px at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(30px at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full h-full bg-[#050505]/98 backdrop-blur-2xl z-30 flex flex-col justify-center px-10"
          >
            <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
              <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase border-b border-white/10 pb-4">
                Navigation Menu
              </p>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  download={link.download}
                  onClick={(e) => handleLinkClick(e, link.href, link.download)}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  className="text-white hover:text-primary transition-colors text-3xl font-display font-extrabold tracking-wide flex items-center justify-between group cursor-pointer"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </motion.a>
              ))}
              <div className="mt-8 flex gap-4">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="w-full text-center bg-primary hover:bg-accent text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.3)] cursor-pointer"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
