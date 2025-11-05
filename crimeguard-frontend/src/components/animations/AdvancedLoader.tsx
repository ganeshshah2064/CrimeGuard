import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';

interface AdvancedLoaderProps {
  type?: 'pulse' | 'morph' | 'particles' | 'wave';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'red' | 'white';
}

const AdvancedLoader: React.FC<AdvancedLoaderProps> = ({
  type = 'morph',
  size = 'md',
  color = 'red'
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    red: 'text-red-600',
    white: 'text-white'
  };

  useGSAP(() => {
    if (!loaderRef.current) return;

    const elements = loaderRef.current.children;

    switch (type) {
      case 'pulse':
        gsap.to(elements, {
          scale: 1.5,
          opacity: 0.3,
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.2,
          repeat: -1,
          yoyo: true
        });
        break;

      case 'morph':
        gsap.to(elements, {
          rotation: 360,
          scale: 1.2,
          duration: 2,
          ease: "power2.inOut",
          stagger: 0.1,
          repeat: -1
        });
        break;

      case 'particles':
        gsap.to(elements, {
          y: -20,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          repeat: -1,
          yoyo: true
        });
        break;

      case 'wave':
        gsap.to(elements, {
          scaleY: 2,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.1,
          repeat: -1,
          yoyo: true
        });
        break;
    }
  }, [type]);

  const renderLoader = () => {
    switch (type) {
      case 'pulse':
        return (
          <>
            <div className={`${sizeClasses[size]} bg-current rounded-full opacity-75`} />
            <div className={`${sizeClasses[size]} bg-current rounded-full opacity-50 absolute`} />
            <div className={`${sizeClasses[size]} bg-current rounded-full opacity-25 absolute`} />
          </>
        );

      case 'morph':
        return (
          <>
            <div className={`w-3 h-3 bg-current rounded-full`} />
            <div className={`w-3 h-3 bg-current rounded-full`} />
            <div className={`w-3 h-3 bg-current rounded-full`} />
            <div className={`w-3 h-3 bg-current rounded-full`} />
          </>
        );

      case 'particles':
        return (
          <>
            <div className={`w-2 h-2 bg-current rounded-full`} />
            <div className={`w-2 h-2 bg-current rounded-full`} />
            <div className={`w-2 h-2 bg-current rounded-full`} />
            <div className={`w-2 h-2 bg-current rounded-full`} />
            <div className={`w-2 h-2 bg-current rounded-full`} />
          </>
        );

      case 'wave':
        return (
          <>
            <div className={`w-1 h-8 bg-current rounded-full`} />
            <div className={`w-1 h-8 bg-current rounded-full`} />
            <div className={`w-1 h-8 bg-current rounded-full`} />
            <div className={`w-1 h-8 bg-current rounded-full`} />
            <div className={`w-1 h-8 bg-current rounded-full`} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={loaderRef}
      className={`flex items-center justify-center space-x-1 ${colorClasses[color]}`}
    >
      {renderLoader()}
    </div>
  );
};

export default AdvancedLoader;