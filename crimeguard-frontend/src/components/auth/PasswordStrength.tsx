import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className = '' }) => {
  const strengthRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const calculateStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    
    if (pwd.length >= 8) score += 1;
    if (pwd.match(/[a-z]/)) score += 1;
    if (pwd.match(/[A-Z]/)) score += 1;
    if (pwd.match(/[0-9]/)) score += 1;
    if (pwd.match(/[^a-zA-Z0-9]/)) score += 1;

    const strengthLevels = [
      { score: 0, label: '', color: 'transparent' },
      { score: 1, label: 'Very Weak', color: '#ef4444' },
      { score: 2, label: 'Weak', color: '#f97316' },
      { score: 3, label: 'Fair', color: '#eab308' },
      { score: 4, label: 'Good', color: '#22c55e' },
      { score: 5, label: 'Strong', color: '#16a34a' }
    ];

    return strengthLevels[score];
  };

  const strength = calculateStrength(password);

  useGSAP(() => {
    if (!barsRef.current) return;

    const bars = barsRef.current.children;
    
    // Animate bars based on strength
    Array.from(bars).forEach((bar, index) => {
      const isActive = index < strength.score;
      
      gsap.to(bar, {
        scaleY: isActive ? 1 : 0.3,
        backgroundColor: isActive ? strength.color : '#e5e7eb',
        duration: 0.3,
        ease: "power2.out",
        delay: index * 0.05
      });
    });

    // Animate strength text
    if (strengthRef.current && password.length > 0) {
      gsap.fromTo(strengthRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [password, strength.score]);

  if (!password) return null;

  return (
    <div className={`mt-2 ${className}`}>
      {/* Strength Bars */}
      <div ref={barsRef} className="flex space-x-1 mb-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-600 transform origin-bottom"
          />
        ))}
      </div>

      {/* Strength Label */}
      <div ref={strengthRef} className="flex justify-between items-center text-xs">
        <span 
          className="font-medium"
          style={{ color: strength.color }}
        >
          {strength.label}
        </span>
        
        {/* Requirements */}
        <div className="text-gray-500 dark:text-gray-400">
          <div className="flex space-x-1">
            <span className={password.length >= 8 ? 'text-green-500' : 'text-gray-400'}>8+</span>
            <span className={password.match(/[A-Z]/) ? 'text-green-500' : 'text-gray-400'}>A</span>
            <span className={password.match(/[a-z]/) ? 'text-green-500' : 'text-gray-400'}>a</span>
            <span className={password.match(/[0-9]/) ? 'text-green-500' : 'text-gray-400'}>1</span>
            <span className={password.match(/[^a-zA-Z0-9]/) ? 'text-green-500' : 'text-gray-400'}>@</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;