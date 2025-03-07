import React, { useEffect, useState, useRef } from 'react';

const Cursor3D = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailElementsRef = useRef<HTMLDivElement[]>([]);

  // Colors from the SVG
  const colors = {
    primary: '#37B13B',    // Main green
    secondary: '#277F2A',  // Darker green
    highlight: '#37B13B',  // Highlight green (with different opacity)
    background: 'rgba(0, 0, 0, 0.2)' // Background with transparency
  };

  useEffect(() => {
    // Create trail elements
    for (let i = 0; i < 5; i++) {
      const trailElement = document.createElement('div');
      trailElement.classList.add('cursor-trail');
      trailElement.style.position = 'fixed';
      trailElement.style.pointerEvents = 'none';
      trailElement.style.width = `${12 - i * 2}px`;
      trailElement.style.height = `${12 - i * 2}px`;
      trailElement.style.borderRadius = '50%';
      trailElement.style.backgroundColor = colors.primary;
      trailElement.style.opacity = (0.5 - i * 0.1).toString();
      trailElement.style.zIndex = '9999';
      trailElement.style.transition = 'transform 0.1s ease-out, opacity 0.3s ease';
      trailElement.style.transform = 'translate(-50%, -50%) perspective(400px) translateZ(0)';
      trailElement.style.boxShadow = '0 0 15px rgba(55, 177, 59, 0.5)';

      document.body.appendChild(trailElement);
      trailElementsRef.current.push(trailElement);
    }

    // Track mouse movement
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if we're hovering over any clickable elements
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const clickable = element?.matches('a, button, [role="button"], input, select, textarea, [onclick]') ||
                        window.getComputedStyle(element || document.body).cursor === 'pointer';
      setIsPointer(clickable);
    };

    // Handle mouse enter/leave
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle click state
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Apply to all clickable elements
    const elements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    elements.forEach(el => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      // Clean up
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      // Restore default cursor
      document.body.style.cursor = '';

      // Remove trail elements
      trailElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });

      // Restore cursor on elements
      elements.forEach(el => {
        (el as HTMLElement).style.cursor = '';
      });
    };
  }, []);

  // Update cursor position and appearance
  useEffect(() => {
    if (cursorRef.current) {
      // Update main cursor
      cursorRef.current.style.transform = `translate(${position.x}px, ${position.y}px) perspective(400px) translateZ(0px) rotateX(${position.y / 20}deg) rotateY(${-position.x / 20}deg)`;

      // Update trail elements with delay
      trailElementsRef.current.forEach((el, index) => {
        setTimeout(() => {
          if (el) {
            el.style.transform = `translate(${position.x}px, ${position.y}px) perspective(400px) translateZ(${-10 * (index + 1)}px) rotateX(${position.y / 10}deg) rotateY(${-position.x / 10}deg)`;
            el.style.opacity = (isVisible ? (0.6 - index * 0.1) : 0).toString();
          }
        }, index * 30);
      });
    }
  }, [position, isVisible]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 transition-transform"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px) perspective(400px) translateZ(0px)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      {/* Outer ring - grows on hover over clickable elements */}
      <div
        className="absolute rounded-full"
        style={{
          width: isPointer ? '36px' : '30px',
          height: isPointer ? '36px' : '30px',
          border: `2px solid ${colors.secondary}`,
          backgroundColor: 'rgba(39, 127, 42, 0.05)',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 10px rgba(55, 177, 59, 0.3)`,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s'
        }}
      ></div>

      {/* Inner dot - scales on click */}
      <div
        className="absolute rounded-full"
        style={{
          width: isClicking ? '10px' : '8px',
          height: isClicking ? '10px' : '8px',
          backgroundColor: colors.primary,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          boxShadow: `0 0 15px rgba(55, 177, 59, 0.7)`,
          transition: 'transform 0.2s, width 0.2s, height 0.2s'
        }}
      ></div>

      {/* 3D floating light effect */}
      <div
        className="absolute rounded-full"
        style={{
          width: '14px',
          height: '14px',
          background: 'radial-gradient(circle, rgba(55, 177, 59, 0.6) 0%, rgba(55, 177, 59, 0) 70%)',
          transform: 'translate(-50%, -50%) translateZ(10px)',
          filter: 'blur(2px)'
        }}
      ></div>

      {/* Click ripple - appears on mouse down */}
      <div
        className="absolute rounded-full"
        style={{
          width: isClicking ? '40px' : '0px',
          height: isClicking ? '40px' : '0px',
          border: `2px solid ${colors.highlight}`,
          transform: 'translate(-50%, -50%)',
          opacity: isClicking ? 0.5 : 0,
          transition: 'width 0.3s, height 0.3s, opacity 0.3s'
        }}
      ></div>
    </div>
  );
};

// Component that acts as a wrapper to provide the cursor functionality
const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Cursor3D />
      {children}
    </>
  );
};

export default CursorProvider;
