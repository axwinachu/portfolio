import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Track mouseovers for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('clickable') ||
        target.closest('.clickable');

      if (isClickable) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Lerp loop for the outer ring
    let animationId;
    const updateRing = () => {
      const ease = 0.15; // smooth delay
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX - 18}px, ${currentY - 18}px, 0)`;
      }
      animationId = requestAnimationFrame(updateRing);
    };
    updateRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-9 h-9 border border-primary rounded-full pointer-events-none z-50 transition-all duration-300 ease-out will-change-transform ${
          hovered ? 'scale-150 bg-primary/10 border-accent/80 shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'scale-100 shadow-[0_0_8px_rgba(255,0,0,0.2)]'
        } ${clicked ? 'scale-90 border-white bg-white/20' : ''}`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />
      {/* Inner Dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50 transition-transform duration-100 -translate-x-1/2 -translate-y-1/2 will-change-transform ${
          hovered ? 'scale-0' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
