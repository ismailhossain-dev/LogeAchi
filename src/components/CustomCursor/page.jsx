"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // 🟢 চেক১: স্ক্রিন ৭৬৮ পিক্সেলের কম হলে অথবা ডিভাইসটি টাচ স্ক্রিন (মোবাইল/ট্যাব) হলে কার্সার রান হবে না
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (window.innerWidth < 768 || isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      // Main Dot Movement
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      // Follower Circle Movement (Smooth Lag)
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(follower, {
        scale: 1.8,
        borderWidth: '0.5px',
        borderColor: '#2563eb',
        duration: 0.4
      });
      gsap.to(cursor, {
        scale: 1.2,
        backgroundColor: '#2563eb',
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, {
        scale: 1,
        borderWidth: '1px',
        borderColor: 'rgba(249, 242, 234, 0.4)',
        duration: 0.4
      });
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#f9f2ea',
        duration: 0.3
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Dynamic Select
    const interactiveElements = document.querySelectorAll('button, a, .hover-target, .MuiButton-root, .MuiIconButton-root');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Common Styles for both elements
  const baseStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
  };

  return (
    // 🟢 Tailwind CSS Class: hidden md:block দিয়ে ছোট স্ক্রিনে ডিভ ২টি হাইড করা হয়েছে
    <div className="hidden md:block">
      {/* মেইন ডট */}
      <div
        ref={cursorRef}
        style={{
          ...baseStyle,
          width: '6px',
          height: '6px',
          backgroundColor: '#f9f2ea',
          zIndex: 9999,
        }}
      />
      {/* ফলোয়ার সার্কেল */}
      <div
        ref={followerRef}
        style={{
          ...baseStyle,
          width: '30px',
          height: '30px',
          border: '1px solid rgba(249, 242, 234, 0.4)',
          zIndex: 9998,
        }}
      />
    </div>
  );
};

export default CustomCursor;