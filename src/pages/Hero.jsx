import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Briefcase, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const specialties = [
  'Backend Engineer',
  'Microservices Architect',
  'React Developer',
  'Spring Boot Developer',
  'MERN Stack Developer'
];

const Hero = () => {
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const currentSpecialty = specialties[specialtyIndex];

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setDisplayText(currentSpecialty.substring(0, displayText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setDisplayText(currentSpecialty.substring(0, displayText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentSpecialty) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setSpecialtyIndex((prev) => (prev + 1) % specialties.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, specialtyIndex, typingSpeed]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSec = document.getElementById('projects');
    if (projectsSec) {
      if (window.lenis) {
        window.lenis.scrollTo(projectsSec, { offset: -80 });
      } else {
        projectsSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 pt-20 overflow-hidden"
    >
      {/* Visual Spotlights & Ambient Glow */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center z-10">
        
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md bg-white/5"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
            Open For Opportunities
          </span>
        </motion.div>

        {/* Hero Headings */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white font-sans text-xl sm:text-2xl font-light tracking-[0.1em] mb-3"
        >
          Hello, I'm
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tight uppercase leading-none text-white select-none"
        >
          ASWIN <span className="text-primary text-glow">R</span>
        </motion.h1>

        {/* Dynamic Typing Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="h-10 mt-6 mb-12 flex items-center justify-center"
        >
          <span className="text-white/50 font-sans text-lg sm:text-2xl tracking-[0.15em] uppercase">
            Specializing in{' '}
          </span>
          <span className="text-primary font-display text-lg sm:text-2xl font-bold tracking-[0.05em] ml-2 border-r-2 border-primary pr-1 min-w-[200px] text-left">
            {displayText}
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="/aswin%20resume%20.pdf"
            download="Aswin_R_Resume.pdf"
            className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.65)] hover:-translate-y-1 cursor-pointer"
          >
            <FileText size={18} /> Download Resume
          </a>

          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md hover:-translate-y-1 cursor-pointer"
          >
            <Briefcase size={18} /> View Projects
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex items-center gap-6 mt-16"
        >
          <a
            href="https://github.com/axwinachu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-115 bg-black/40 backdrop-blur-md"
            aria-label="GitHub Profile"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/aswin-r-366443296/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-115 bg-black/40 backdrop-blur-md"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={20} />
          </a>
        </motion.div>
      </div>

      {/* Down Arrow indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 1.5, repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-1 text-white/30 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase font-bold">Scroll Down</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
