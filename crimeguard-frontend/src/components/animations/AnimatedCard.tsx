import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'tilt' | 'glow' | 'morph';
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '',
  hoverEffect = 'lift',
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    // Initial animation
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      switch (hoverEffect) {
        case 'lift':
          gsap.to(cardRef.current, {
            y: -10,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power2.out"
          });
          break;
          
        case 'tilt':
          gsap.to(cardRef.current, {
            rotationY: 5,
            rotationX: 5,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000
          });
          break;
          
        case 'glow':
          gsap.to(cardRef.current, {
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
          break;
          
        case 'morph':
          gsap.to(cardRef.current, {
            borderRadius: "20px",
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out"
          });
          break;
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    cardRef.current.addEventListener('mouseenter', handleMouseEnter);
    cardRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseenter', handleMouseEnter);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [hoverEffect, delay]);

  return (
    <div ref={cardRef} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedCard;