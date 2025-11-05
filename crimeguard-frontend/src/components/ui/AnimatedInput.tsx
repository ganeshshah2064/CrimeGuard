import React, { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'floating' | 'underline';
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  error,
  icon,
  variant = 'default',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!inputRef.current) return;

    const handleFocus = () => {
      setIsFocused(true);
      
      // Animate border
      if (borderRef.current) {
        gsap.to(borderRef.current, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Animate floating label
      if (variant === 'floating' && labelRef.current) {
        gsap.to(labelRef.current, {
          y: -24,
          scale: 0.85,
          color: '#dc2626',
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Input glow effect
      gsap.to(inputRef.current, {
        boxShadow: "0 0 0 3px rgba(220, 38, 38, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleBlur = () => {
      setIsFocused(false);
      const value = inputRef.current?.value || '';
      setHasValue(value.length > 0);
      
      // Animate border
      if (borderRef.current) {
        gsap.to(borderRef.current, {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Animate floating label back if no value
      if (variant === 'floating' && labelRef.current && !value) {
        gsap.to(labelRef.current, {
          y: 0,
          scale: 1,
          color: '#6b7280',
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Remove glow effect
      gsap.to(inputRef.current, {
        boxShadow: "0 0 0 0px rgba(220, 38, 38, 0)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    inputRef.current.addEventListener('focus', handleFocus);
    inputRef.current.addEventListener('blur', handleBlur);

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', handleFocus);
        inputRef.current.removeEventListener('blur', handleBlur);
      }
    };
  }, [variant]);

  const baseInputClasses = "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500";
  const variantClasses = {
    default: "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
    floating: "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white pt-6",
    underline: "border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent rounded-none px-0 focus:ring-0"
  };

  return (
    <div className="relative">
      {/* Standard Label */}
      {label && variant !== 'floating' && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          className={`${baseInputClasses} ${variantClasses[variant]} ${icon ? 'pl-10' : ''} ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />

        {/* Floating Label */}
        {label && variant === 'floating' && (
          <label
            ref={labelRef}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-300"
            style={{ transformOrigin: 'left center' }}
          >
            {label}
          </label>
        )}

        {/* Animated Border (for underline variant) */}
        {variant === 'underline' && (
          <div
            ref={borderRef}
            className="absolute bottom-0 left-0 h-0.5 bg-red-500 transform scale-x-0"
            style={{ transformOrigin: 'left center', width: '100%' }}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};

export default AnimatedInput;