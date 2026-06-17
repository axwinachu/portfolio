import React, { useEffect, useRef } from 'react';

const skillList = [
  'Java', 'Spring Boot', 'React', 'Kafka', 'Redis',
  'Docker', 'MySQL', 'JavaScript', 'Tailwind', 'REST API',
  'Hibernate', 'WebFlux', 'Git', 'AWS', 'Keycloak',
  'CI/CD', 'Redux', 'Spring Cloud', 'JPA', 'Postman'
];

const SkillGalaxy = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const radius = Math.min(width, height) * 0.38;
    const tags = [];

    // Sphere mathematics for distributing coordinates
    for (let i = 0; i < skillList.length; i++) {
      const phi = Math.acos(-1 + (2 * i) / skillList.length);
      const theta = Math.sqrt(skillList.length * Math.PI) * phi;

      tags.push({
        text: skillList[i],
        x3d: radius * Math.sin(phi) * Math.cos(theta),
        y3d: radius * Math.sin(phi) * Math.sin(theta),
        z3d: radius * Math.cos(phi),
        x: 0,
        y: 0,
        scale: 1,
        alpha: 1,
      });
    }

    let angleX = 0.005;
    let angleY = 0.005;
    let targetAngleX = 0.005;
    let targetAngleY = 0.005;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - width / 2;
      const my = e.clientY - rect.top - height / 2;
      targetAngleX = -my * 0.00003;
      targetAngleY = mx * 0.00003;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const rotateX = (tag, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = tag.y3d * cos - tag.z3d * sin;
      const z1 = tag.z3d * cos + tag.y3d * sin;
      tag.y3d = y1;
      tag.z3d = z1;
    };

    const rotateY = (tag, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = tag.x3d * cos - tag.z3d * sin;
      const z1 = tag.z3d * cos + tag.x3d * sin;
      tag.x3d = x1;
      tag.z3d = z1;
    };

    let animFrameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate angles
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      const fov = 400;
      const cx = width / 2;
      const cy = height / 2;

      // Sort tags by z3d for proper 3D rendering occlusion
      tags.sort((a, b) => b.z3d - a.z3d);

      tags.forEach((tag) => {
        rotateX(tag, angleX);
        rotateY(tag, angleY);

        // Project 3D coordinates onto 2D viewport
        const scale = fov / (fov + tag.z3d);
        tag.scale = scale;
        tag.x = cx + tag.x3d * scale;
        tag.y = cy + tag.y3d * scale;
        tag.alpha = (tag.z3d + radius) / (2 * radius) * 0.8 + 0.2;

        // Draw connections to nearby items
        tags.forEach((other) => {
          const dx = tag.x3d - other.x3d;
          const dy = tag.y3d - other.y3d;
          const dz = tag.z3d - other.z3d;
          const dist = Math.hypot(dx, dy, dz);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - dist / 130) * 0.06 * tag.alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(tag.x, tag.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw Text
        ctx.fillStyle = tag.z3d > 0 ? `rgba(255, 255, 255, ${tag.alpha})` : `rgba(255, 48, 48, ${tag.alpha})`;
        ctx.font = `bold ${Math.max(10, Math.floor(14 * tag.scale))}px Outfit, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Dynamic subtle shadows for glowing foreground items
        if (tag.z3d > radius * 0.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255, 0, 0, 0.4)';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(tag.text, tag.x, tag.y);
        ctx.shadowBlur = 0; // reset shadow
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center relative bg-gradient-to-b from-transparent via-black/20 to-transparent border border-white/5 rounded-3xl overflow-hidden glassmorphism shadow-2xl">
      <div className="absolute top-4 left-6 text-white/30 text-xs font-semibold uppercase tracking-widest pointer-events-none select-none">
        3D Interactive Constellation
      </div>
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};

export default SkillGalaxy;
