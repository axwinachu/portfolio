import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Award, BookOpen, Activity, Compass, Cpu } from 'lucide-react';

const BentoCard = ({ children, className = '', delay = 0 }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-3xl overflow-hidden glassmorphism p-8 flex flex-col justify-between group transition-all duration-300 border border-white/5 hover:border-primary/20 ${className}`}
    >
      {/* Spotlight overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 0, 0, 0.08), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="relative py-32 px-6 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-3">
          About Me
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
          Crafting Scalable <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Digital Architectures</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Who I Am (Large) */}
        <BentoCard className="md:col-span-2 md:row-span-2 min-h-[350px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
              <Terminal size={24} />
            </div>
            <h3 className="text-white text-2xl font-bold font-display uppercase tracking-wider mb-4">
              Who I Am
            </h3>
            <p className="text-white/60 font-sans leading-relaxed text-sm sm:text-base space-y-4">
              I am Aswin R, a passionate <strong className="text-white font-semibold">Java Full Stack Developer</strong> specialized in building robust, performant backend systems and beautiful, responsive user interfaces. 
              <br /><br />
              My design philosophy is simple: architecture must scale, execution must be flawless, and UI/UX must tell a compelling story. With extensive experience in Spring Boot microservices, React ecosystems, and containerized deployments, I bridge the gap between heavy enterprise backend logic and silky-smooth frontend aesthetics.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 flex gap-6 text-xs text-white/40">
            <div>
              <span className="text-white font-bold block text-lg">1+</span>
              Years Coding Experience
            </div>
        
            <div>
              <span className="text-white font-bold block text-lg">100%</span>
              Execution Consistency
            </div>
          </div>
        </BentoCard>

        {/* Journey */}
        <BentoCard className="min-h-[220px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
              <Compass size={24} />
            </div>
            <h3 className="text-white text-lg font-bold font-display uppercase tracking-wider mb-2">
              My Journey
            </h3>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
              Transitioned from computer science fundamentals to production-grade application lifecycle management. Constantly exploring modern tech bounds.
            </p>
          </div>
          <div className="text-xs text-primary font-bold mt-4 tracking-wider flex items-center gap-1 uppercase">
            Evolution <span className="text-white">🚀</span>
          </div>
        </BentoCard>

        {/* Core Philosophy */}
        <BentoCard className="min-h-[220px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
              <Cpu size={24} />
            </div>
            <h3 className="text-white text-lg font-bold font-display uppercase tracking-wider mb-2">
              System Engineering
            </h3>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
              Obsessed with microservices scalability, high-concurrency performance, event streaming architectures, and container orchestration.
            </p>
          </div>
          <div className="text-xs text-primary font-bold mt-4 tracking-wider flex items-center gap-1 uppercase">
            Efficiency <span className="text-white">⚡</span>
          </div>
        </BentoCard>

        {/* Certificate highlight */}
        <BentoCard className="min-h-[200px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
              <Award size={24} />
            </div>
            <h3 className="text-white text-lg font-bold font-display uppercase tracking-wider mb-2">
              IBM Certified
            </h3>
            <p className="text-white/50 text-xs sm:text-sm">
              Certified Cloud Specialist via the IBM Cloud Envision Program, verifying global infrastructure deployment standards.
            </p>
          </div>
        </BentoCard>

        {/* Academics */}
        <BentoCard className="min-h-[200px] md:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 h-full">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <BookOpen size={24} />
              </div>
              <h3 className="text-white text-lg font-bold font-display uppercase tracking-wider mb-1">
                Computer Science Academic Background
              </h3>
              <p className="text-white/50 text-xs sm:text-sm max-w-lg">
                Earned a Bachelor of Computer Science degree from NGM College, grounding my engineering logic in solid math and database theories.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex flex-col items-center justify-center min-w-[120px] text-center self-end sm:self-auto">
              <span className="text-primary font-black text-2xl font-display">CS</span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Graduation</span>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
};

export default About;
