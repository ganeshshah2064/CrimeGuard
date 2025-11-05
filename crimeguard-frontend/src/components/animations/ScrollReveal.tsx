import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
  className?: string;
  trigger?: 'top' | 'center' | 'bottom';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 1,
  className = '',
  trigger = 'top'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    const triggerPoints = {
      top: 'top 90%',
      center: 'center 80%',
      bottom: 'bottom 70%'
    };

    const animations = {
      fadeInUp: { y: 60, opacity: 0 },
      slideInLeft: { x: -100, opacity: 0 },
      slideInRight: { x: 100, opacity: 0 },
      scaleIn: { scale: 0.8, opacity: 0 },
      rotateIn: { rotation: 45, scale: 0.8, opacity: 0 }
    };

    gsap.fromTo(elementRef.current, 
      animations[animation],
      {
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: triggerPoints[trigger],
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Add a subtle bounce effect
            gsap.to(elementRef.current, {
              scale: 1.02,
              duration: 0.2,
              ease: "power2.out",
              yoyo: true,
              repeat: 1
            });
          }
        }
      }
    );
  }, [animation, delay, duration, trigger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;