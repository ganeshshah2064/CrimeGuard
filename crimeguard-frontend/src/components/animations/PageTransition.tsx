import React, { useRef, useEffect } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useGSAP(() => {
    if (!containerRef.current || !overlayRef.current) return;

    // Page enter animation
    const tl = gsap.timeline();
    
    tl.fromTo(overlayRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { 
        scaleX: 1, 
        duration: 0.5, 
        ease: "power2.inOut" 
      }
    )
    .to(overlayRef.current,
      { 
        scaleX: 0, 
        transformOrigin: 'right center',
        duration: 0.5, 
        ease: "power2.inOut" 
      },
      0.3
    )
    .fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      },
      0.2
    );

  }, [location.pathname]);

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-red-600 z-50 pointer-events-none"
        style={{ transformOrigin: 'left center' }}
      />
      <div ref={containerRef} className="min-h-screen">
        {children}
      </div>
    </>
  );
};

export default PageTransition;