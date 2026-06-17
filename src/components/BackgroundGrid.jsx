import React, { useEffect, useRef } from 'react';

const BackgroundGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    const handleMouseMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Light blobs
    const blobs = [
      { x: width * 0.25, y: height * 0.3, radius: 250, vx: 0.5, vy: -0.4, color: 'rgba(255, 0, 0, 0.12)' },
      { x: width * 0.75, y: height * 0.2, radius: 320, vx: -0.4, vy: 0.5, color: 'rgba(255, 48, 48, 0.08)' },
      { x: width * 0.5, y: height * 0.8, radius: 280, vx: 0.3, vy: -0.3, color: 'rgba(200, 0, 0, 0.1)' }
    ];

    let gridOffset = 0;

    const render = () => {
      // Clear canvas with dark space background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Lerp mouse
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      // Draw Blobs
      blobs.forEach((blob) => {
        // Move blobs
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce check
        if (blob.x < -blob.radius || blob.x > width + blob.radius) blob.vx *= -1;
        if (blob.y < -blob.radius || blob.y > height + blob.radius) blob.vy *= -1;

        // Mouse pull
        const dx = mouse.x - blob.x;
        const dy = mouse.y - blob.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 600) {
          blob.x += (dx / dist) * 0.3;
          blob.y += (dy / dist) * 0.3;
        }

        // Draw radial gradient
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Grid with animated offset
      gridOffset = (gridOffset + 0.15) % 40;
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.025)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines (animated movement downwards)
      for (let y = gridOffset; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Mouse Glow Spotlight
      const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 450);
      glowGrad.addColorStop(0, 'rgba(255, 0, 0, 0.05)');
      glowGrad.addColorStop(0.5, 'rgba(255, 0, 0, 0.01)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 450, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default BackgroundGrid;
