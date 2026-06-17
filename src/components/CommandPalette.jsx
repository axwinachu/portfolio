import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, FileText, CornerDownLeft } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const commands = [
  { id: 'home', name: 'Go to Home', type: 'nav', target: '#home' },
  { id: 'about', name: 'Go to About', type: 'nav', target: '#about' },
  { id: 'skills', name: 'Go to Skills', type: 'nav', target: '#skills' },
  { id: 'projects', name: 'Go to Projects', type: 'nav', target: '#projects' },
  { id: 'experience', name: 'Go to Experience', type: 'nav', target: '#experience' },
  { id: 'contact', name: 'Go to Contact', type: 'nav', target: '#contact' },
  { id: 'resume', name: 'Download Resume', type: 'action', target: '/aswin%20resume%20.pdf' },
  { id: 'github', name: 'View GitHub Profile', type: 'link', target: 'https://github.com/axwinachu' },
  { id: 'linkedin', name: 'View LinkedIn Profile', type: 'link', target: 'https://www.linkedin.com/in/aswin-r-366443296/' },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const paletteRef = useRef(null);

  // Detect key bindings
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter commands
  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  // Reset active index when search changes
  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  // Handle keyboard selections inside open palette
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        executeCommand(filteredCommands[activeIndex]);
      }
    }
  };

  const executeCommand = (cmd) => {
    setIsOpen(false);
    setSearch('');
    
    if (cmd.type === 'nav') {
      const el = document.getElementById(cmd.target.replace('#', ''));
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -80 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (cmd.type === 'action') {
      const a = document.createElement('a');
      a.href = cmd.target;
      a.download = 'Aswin_R_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (cmd.type === 'link') {
      window.open(cmd.target, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Floating help tip in top right (hidden on mobile) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="px-3.5 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-primary/40 text-white/50 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-2xl cursor-pointer"
        >
          <span>Press</span>
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] border border-white/20">Ctrl + K</kbd>
          <span>to explore</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div
            onKeyDown={handleKeyDown}
            className="fixed inset-0 w-full h-full bg-black/75 backdrop-blur-md z-[99999] flex items-start justify-center pt-[15vh] px-4"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Main Palette box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl rounded-2xl bg-[#090909] border border-white/15 overflow-hidden flex flex-col shadow-[0_0_40px_rgba(255,0,0,0.2)]"
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <Search size={18} className="text-white/40" />
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search sections..."
                  className="w-full bg-transparent text-white focus:outline-none font-sans text-sm placeholder-white/30"
                />
                <span className="text-[10px] text-white/20 border border-white/10 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  ESC to close
                </span>
              </div>

              {/* Commands List */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => {
                    const icon =
                      cmd.type === 'nav' ? (
                        <Hash size={14} />
                      ) : cmd.type === 'action' ? (
                        <FileText size={14} />
                      ) : cmd.id === 'github' ? (
                        <FaGithub size={14} />
                      ) : (
                        <FaLinkedin size={14} />
                      );

                    return (
                      <div
                        key={cmd.id}
                        onClick={() => executeCommand(cmd)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                          idx === activeIndex
                            ? 'bg-primary/10 text-white border border-primary/20'
                            : 'text-white/60 hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${idx === activeIndex ? 'text-primary' : 'text-white/40'}`}>
                            {icon}
                          </span>
                          <span className="text-sm font-semibold tracking-wide font-sans">{cmd.name}</span>
                        </div>
                        {idx === activeIndex && (
                          <span className="text-[10px] text-primary font-bold flex items-center gap-1 font-sans">
                            ENTER <CornerDownLeft size={10} />
                          </span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-white/30 uppercase tracking-widest">
                    No results found
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
