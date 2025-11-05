import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';

const GSAPShowcase: React.FC = () => {
  const showcaseRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!showcaseRef.current) return;

    // Create a master timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Floating animation for the entire showcase
    tl.to(showcaseRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut"
    })
    .to(showcaseRef.current, {
      rotation: 2,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .to(showcaseRef.current, {
      scale: 1.02,
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.5");

    // Particle system animation
    const particles = showcaseRef.current.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: () => gsap.utils.random(-50, 50),
        y: () => gsap.utils.random(-50, 50),
        rotation: () => gsap.utils.random(0, 360),
        duration: gsap.utils.random(2, 4),
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.1
      });
    });

    // Morphing background
    const morphElements = showcaseRef.current.querySelectorAll('.morph-bg');
    morphElements.forEach((element, index) => {
      gsap.to(element, {
        borderRadius: () => gsap.utils.random(10, 50) + 'px',
        scale: () => gsap.utils.random(0.8, 1.2),
        duration: gsap.utils.random(3, 6),
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });
    });

  }, []);

  return (
    <div 
      ref={showcaseRef}
      className="fixed bottom-4 left-4 w-32 h-32 pointer-events-none z-40 opacity-20"
    >
      {/* Morphing backgrounds */}
      <div className="morph-bg absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl"></div>
      <div className="morph-bg absolute inset-2 bg-gradient-to-tl from-red-300 to-red-500 rounded-xl"></div>
      
      {/* Floating particles */}
      <div className="particle absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
      <div className="particle absolute top-4 right-4 w-1.5 h-1.5 bg-red-200 rounded-full"></div>
      <div className="particle absolute bottom-6 left-6 w-1 h-1 bg-red-100 rounded-full"></div>
      <div className="particle absolute bottom-2 right-2 w-2.5 h-2.5 bg-white rounded-full"></div>
      
      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold text-lg">CG</span>
      </div>
    </div>
  );
};

export default GSAPShowcase;