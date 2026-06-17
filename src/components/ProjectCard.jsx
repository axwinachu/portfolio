import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project, onOpenModal }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate relative coordinates (between -0.5 and 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Calculate rotation (-15deg to 15deg)
    setRotate({
      x: -y * 15,
      y: x * 15
    });

    // Calculate glow position percentage
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: px, y: py });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative w-full rounded-3xl bg-[#0a0a0a]/75 backdrop-blur-md border border-white/5 overflow-hidden group hover:border-primary/30 p-8 flex flex-col justify-between min-h-[380px] shadow-2xl"
    >
      {/* Interactive border spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 0, 0, 0.09), transparent 85%)`,
        }}
      />

      <div>
        {/* Decorative Top Beam */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent group-hover:via-primary/80 transition-colors" />

        {/* Tech Icon and Tags */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/25">
            System Design
          </span>
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
              aria-label="GitHub Repository"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-3xl font-display font-black uppercase tracking-wide mb-3 group-hover:text-primary transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-6 font-sans">
          {project.description}
        </p>
      </div>

      {/* Footer & Tech Tags */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[10px] text-white/60 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 font-sans font-semibold"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="text-[10px] text-primary font-bold bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
              +{project.tech.length - 5} More
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto relative z-20">
          <button
            onClick={() => onOpenModal(project)}
            className="flex-1 text-center bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl transition-all duration-300 border border-white/10 group-hover:border-primary/20 cursor-pointer"
          >
            Project Details
          </button>
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 bg-primary hover:bg-accent text-white flex items-center justify-center rounded-xl transition-colors cursor-pointer"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
