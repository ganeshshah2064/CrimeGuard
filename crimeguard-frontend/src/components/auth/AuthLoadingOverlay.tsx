import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../utils/gsapConfig';
import AdvancedLoader from '../animations/AdvancedLoader';

interface AuthLoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const AuthLoadingOverlay: React.FC<AuthLoadingOverlayProps> = ({ 
  isVisible, 
  message = 'Processing...' 
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (isVisible) {
      // Show overlay
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      // Animate content
      gsap.fromTo(contentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.3)", delay: 0.1 }
      );
    } else {
      // Hide overlay
      gsap.to(overlayRef.current,
        { 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.out",
          onComplete: () => {
            gsap.set(overlayRef.current, { display: 'none' });
          }
        }
      );
    }
  }, [isVisible]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      style={{ display: 'none' }}
    >
      <div
        ref={contentRef}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 text-center max-w-sm mx-4"
      >
        <div className="mb-4">
          <AdvancedLoader type="morph" size="lg" color="red" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Please Wait
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AuthLoadingOverlay;