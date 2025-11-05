import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';

interface AnimatedTextProps {
  children: string;
  className?: string;
  animation?: 'fadeInUp' | 'typewriter' | 'wave' | 'glitch';
  delay?: number;
  trigger?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  trigger
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Split text into spans for character animation
    const text = children;
    const chars = text.split('').map((char, index) => 
      char === ' ' ? '&nbsp;' : `<span style="display: inline-block;">${char}</span>`
    ).join('');
    
    textRef.current.innerHTML = chars;
    const charElements = textRef.current.querySelectorAll('span');
    
    switch (animation) {
      case 'fadeInUp':
        gsap.fromTo(charElements, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.02,
            delay,
            scrollTrigger: trigger ? {
              trigger: trigger,
              start: "top 80%",
              toggleActions: "play none none reverse"
            } : undefined
          }
        );
        break;
        
      case 'typewriter':
        gsap.fromTo(charElements,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.05,
            stagger: 0.05,
            delay,
            ease: "none"
          }
        );
        break;
        
      case 'wave':
        gsap.fromTo(charElements,
          { y: 0 },
          {
            y: -20,
            duration: 0.6,
            ease: "power2.inOut",
            stagger: 0.1,
            repeat: -1,
            yoyo: true,
            delay
          }
        );
        break;
        
      case 'glitch':
        gsap.timeline({ delay })
          .fromTo(charElements,
            { x: 0, y: 0, opacity: 1 },
            {
              x: () => gsap.utils.random(-5, 5),
              y: () => gsap.utils.random(-2, 2),
              duration: 0.1,
              stagger: 0.02,
              repeat: 3,
              yoyo: true,
              ease: "power2.inOut"
            }
          );
        break;
    }
  }, [animation, delay, trigger, children]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedText;