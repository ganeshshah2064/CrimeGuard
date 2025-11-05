import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  animation?: 'pulse' | 'bounce' | 'magnetic' | 'liquid';
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className = '',
  onClick,
  variant = 'primary',
  animation = 'magnetic',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!buttonRef.current || disabled) return;

    // Magnetic effect
    if (animation === 'magnetic') {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = buttonRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(buttonRef.current, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };

      buttonRef.current.addEventListener('mousemove', handleMouseMove);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (buttonRef.current) {
          buttonRef.current.removeEventListener('mousemove', handleMouseMove);
          buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }

    // Pulse animation
    if (animation === 'pulse') {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    // Bounce on hover
    if (animation === 'bounce') {
      const handleMouseEnter = () => {
        gsap.to(buttonRef.current, {
          scale: 1.1,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)"
        });
      };

      buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (buttonRef.current) {
          buttonRef.current.removeEventListener('mouseenter', handleMouseEnter);
          buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, [animation, disabled]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Click ripple effect
    if (rippleRef.current) {
      const rect = buttonRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.set(rippleRef.current, {
        x: x - 10,
        y: y - 10,
        scale: 0,
        opacity: 0.6
      });
      
      gsap.to(rippleRef.current, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }

    // Button press animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });

    onClick?.();
  };

  const baseClasses = "relative overflow-hidden inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      <div
        ref={rippleRef}
        className="absolute w-5 h-5 bg-white rounded-full pointer-events-none"
        style={{ mixBlendMode: 'overlay' }}
      />
    </button>
  );
};

export default AnimatedButton;