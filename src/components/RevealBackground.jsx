import React, { useEffect, useRef } from 'react';

const RevealBackground = ({ 
  bgImage = '/imgh/imagem_1.webp', 
  topImage = '/imgh/imagem_2.webp',
  radius = 120,
  hardness = 5,
  chromaticAberration = 25,
  tail = 70,
  fluidity = 0,
  dissipation = 0
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const trail = useRef([]);
  const particles = useRef([]);
  const images = useRef({ bg: null, top: null, loaded: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Create offscreen buffer for the top layer
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    
    let animationFrameId;

    // Load images
    const loadImages = async () => {
      const bg = new Image();
      const top = new Image();
      
      const loadImage = (img, src) => {
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = () => {
            console.error('Failed to load image:', src);
            resolve();
          };
          img.src = src;
        });
      };

      await Promise.all([loadImage(bg, bgImage), loadImage(top, topImage)]);
      images.current = { bg, top, loaded: true };
    };

    loadImages();

    const resize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouse.current.active = true;
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);
    resize();

    const createParticle = (x, y) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 1.0,
        size: Math.random() * 2 + 0.5
      };
    };

    const lastMouse = { x: 0, y: 0 };

    const render = () => {
      if (!images.current.loaded || !images.current.bg || !images.current.top) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Calculate cover dimensions
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = images.current.top.width / images.current.top.height;
      let drawW, drawH, drawX, drawY;
      
      if (canvasAspect > imgAspect) {
        drawW = canvas.width;
        drawH = canvas.width / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawW = canvas.height * imgAspect;
        drawH = canvas.height;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }

      // 1. Prepare Top Layer Buffer
      offscreenCtx.clearRect(0, 0, canvas.width, canvas.height);
      offscreenCtx.fillStyle = '#000'; // Pure black base
      offscreenCtx.fillRect(0, 0, canvas.width, canvas.height);
      offscreenCtx.globalAlpha = 1.0;
      offscreenCtx.globalCompositeOperation = 'source-over';
      offscreenCtx.drawImage(images.current.top, drawX, drawY, drawW, drawH);

      // 2. Update Trail Points
      // ONLY add a point if the mouse has moved since the last frame
      const mouseMoved = Math.abs(mouse.current.x - lastMouse.x) > 0.1 || Math.abs(mouse.current.y - lastMouse.y) > 0.1;
      
      if (mouse.current.active && mouseMoved) {
        trail.current.unshift({ x: mouse.current.x, y: mouse.current.y, life: 1.0 });
        if (Math.random() > 0.6) {
          particles.current.push(createParticle(mouse.current.x, mouse.current.y));
        }
        lastMouse.x = mouse.current.x;
        lastMouse.y = mouse.current.y;
      }
      
      // Points decay over time (fade out the reveal holes)
      // Faster decay means the hole closes quickly when mouse stops
      trail.current.forEach(p => { p.life -= 0.025; }); 
      trail.current = trail.current.filter(p => p.life > 0);

      if (trail.current.length > tail) {
        trail.current.pop();
      }

      // 3. Erase holes in Top Layer Buffer
      offscreenCtx.globalCompositeOperation = 'destination-out';
      trail.current.forEach((point) => {
        offscreenCtx.beginPath();
        const grad = offscreenCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
        const stop = Math.max(0, Math.min(1, hardness / 100));
        grad.addColorStop(stop, `rgba(0,0,0,${point.life})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        offscreenCtx.fillStyle = grad;
        offscreenCtx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        offscreenCtx.fill();
      });

      // 4. Draw Background Layer to Main Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (chromaticAberration > 0) {
        const offset = (chromaticAberration / 100) * 15;
        ctx.save();
        ctx.drawImage(images.current.bg, drawX - offset, drawY, drawW, drawH);
        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(images.current.bg, drawX, drawY, drawW, drawH);
        ctx.drawImage(images.current.bg, drawX + offset, drawY, drawW, drawH);
        ctx.restore();
      } else {
        ctx.drawImage(images.current.bg, drawX, drawY, drawW, drawH);
      }

      // 5. Overlay the masked Top Layer
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(offscreenCanvas, 0, 0);

      // 6. Draw Particles
      particles.current = particles.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.7})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [bgImage, topImage, radius, hardness, chromaticAberration, tail, dissipation]);

  return (
    <div 
      ref={containerRef} 
      className="reveal-background-container"
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block' 
        }} 
      />
    </div>
  );
};

export default RevealBackground;
