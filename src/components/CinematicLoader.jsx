import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef(null);
  const particles = useRef([]);

  // Counter animation
  useEffect(() => {
    let start = 0;
    const duration = 2500; // 2.5 seconds
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      start += step + Math.random() * 2;
      if (start >= 100) {
        start = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          triggerExplosion();
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              onComplete();
            }, 800);
          }, 400);
        }, 300);
      } else {
        setProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Canvas particles explosion
  const triggerExplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Create 150 particles
    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 12;
      particles.current.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 4,
        color: i % 3 === 0 ? '#ff0000' : i % 3 === 1 ? '#ff3030' : '#ffffff',
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
      });
    }

    let animationId;
    const animateExplosion = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      let active = false;

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          active = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (active) {
        animationId = requestAnimationFrame(animateExplosion);
      }
    };
    animateExplosion();
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', 
            transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] } 
          }}
          className="fixed inset-0 w-full h-full bg-[#050505] z-[99999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Explosion canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          <div className="relative flex flex-col items-center z-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-24 h-24 mb-6 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-slow" />
              <div className="absolute -inset-1 rounded-full border border-accent/20 animate-orbit-slow" />
              
              {/* Outer logo ring */}
              <div className="absolute w-20 h-20 rounded-xl border border-primary/50 rotate-45 flex items-center justify-center bg-black/60 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                <span className="text-white text-3xl font-black tracking-tighter -rotate-45 font-display text-glow">
                  AR
                </span>
              </div>
            </motion.div>

            {/* Text Reveal */}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white font-display text-4xl font-extrabold tracking-[0.2em] uppercase select-none text-glow"
            >
              ASWIN R
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/80 font-sans text-xs tracking-[0.3em] uppercase mt-2 mb-12 select-none"
            >
              Java Full Stack Developer
            </motion.p>

            {/* Counter */}
            <div className="relative flex items-center justify-center font-display text-5xl font-black text-white/90 select-none">
              <span className="tabular-nums">{progress}</span>
              <span className="text-primary text-2xl ml-1 font-bold">%</span>
            </div>
            
            {/* Progress line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden relative">
              <motion.div 
                className="h-full bg-primary shadow-[0_0_10px_#ff0000]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
