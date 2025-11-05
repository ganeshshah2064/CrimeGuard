import React, { useRef, useEffect } from 'react';
import { gsap, useGSAP } from '../utils/gsapConfig';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = containerRef.current!.offsetWidth;
      canvas.height = containerRef.current!.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: `hsl(${Math.random() * 20 + 350}, 70%, 60%)`
        });
      }
    };
    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Draw connections
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Animated geometric shapes
    const shapes = containerRef.current.querySelectorAll('.animated-shape');
    
    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        rotation: 360,
        duration: 20 + index * 5,
        ease: "none",
        repeat: -1
      });
      
      gsap.to(shape, {
        scale: 1.2,
        duration: 3 + index,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    // Floating animation for decorative elements
    const floatingElements = containerRef.current.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: -30,
        duration: 2 + index * 0.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
      
      gsap.to(element, {
        x: 20,
        duration: 3 + index * 0.3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.1
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="animated-shape absolute top-20 left-20 w-16 h-16 border border-red-300 opacity-20 rounded-lg"></div>
        <div className="animated-shape absolute top-40 right-32 w-12 h-12 border border-red-400 opacity-15 rounded-full"></div>
        <div className="animated-shape absolute bottom-32 left-40 w-20 h-20 border border-red-200 opacity-10"></div>
        <div className="animated-shape absolute bottom-20 right-20 w-14 h-14 border border-red-500 opacity-25 rounded-lg"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="floating-element absolute top-32 left-1/4 w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
        <div className="floating-element absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-red-500 rounded-full opacity-40"></div>
        <div className="floating-element absolute bottom-1/3 left-1/3 w-3 h-3 bg-red-300 rounded-full opacity-30"></div>
        <div className="floating-element absolute bottom-40 right-1/4 w-2.5 h-2.5 bg-red-600 rounded-full opacity-50"></div>
      </div>
      
      {/* SVG Morphing Shapes */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1">
              <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="50%" stopColor="#dc2626" stopOpacity="0.2">
              <animate attributeName="stop-opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.1">
              <animate attributeName="stop-opacity" values="0.1;0.25;0.1" dur="5s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Morphing blob */}
        <path fill="url(#morphGradient)" filter="url(#glow)">
          <animate attributeName="d" 
            values="M20,50 Q50,20 80,50 Q50,80 20,50;M25,45 Q55,15 85,45 Q55,75 25,45;M20,50 Q50,20 80,50 Q50,80 20,50" 
            dur="8s" 
            repeatCount="indefinite"/>
        </path>
        
        {/* Animated lines with motion path */}
        <g stroke="url(#morphGradient)" strokeWidth="1" fill="none" opacity="0.4">
          <path d="M10,10 Q50,50 90,10">
            <animate attributeName="d" 
              values="M10,10 Q50,50 90,10;M15,15 Q45,45 85,15;M10,10 Q50,50 90,10" 
              dur="6s" 
              repeatCount="indefinite"/>
          </path>
          <path d="M10,90 Q50,50 90,90">
            <animate attributeName="d" 
              values="M10,90 Q50,50 90,90;M15,85 Q55,55 85,85;M10,90 Q50,50 90,90" 
              dur="7s" 
              repeatCount="indefinite"/>
          </path>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;