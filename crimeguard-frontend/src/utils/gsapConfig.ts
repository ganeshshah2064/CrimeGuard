import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register free GSAP plugins
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  TextPlugin
);

// Custom eases for the CrimeGuard theme (using built-in eases)
export const customEases = {
  crimeguardBounce: "bounce.out",
  crimeguardSmooth: "power2.out",
  crimeguardElastic: "elastic.out(1, 0.3)",
};

// Animation presets
export const animations = {
  // Hero text animations
  heroTitle: {
    duration: 1.2,
    ease: customEases.crimeguardSmooth,
    y: 50,
    opacity: 0,
    stagger: 0.1
  },
  
  // Card animations
  cardHover: {
    duration: 0.3,
    scale: 1.05,
    y: -10,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    ease: "power2.out"
  },
  
  // Button animations
  buttonPress: {
    duration: 0.1,
    scale: 0.95,
    ease: "power2.out"
  },
  
  // Loading animations
  pulse: {
    duration: 1.5,
    scale: 1.1,
    opacity: 0.7,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true
  },
  
  // Page transitions
  pageEnter: {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: customEases.crimeguardElastic
  }
};

// Scroll-triggered animations
export const scrollAnimations = {
  fadeInUp: {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: null, // Will be set dynamically
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  },
  
  slideInLeft: {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: customEases.crimeguardSmooth,
    scrollTrigger: {
      trigger: null,
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  },
  
  slideInRight: {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: customEases.crimeguardSmooth,
    scrollTrigger: {
      trigger: null,
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  }
};

export { gsap, useGSAP, ScrollTrigger };