'use client';   
import { useEffect } from 'react';

const AnimatedCursor = () => {
  useEffect(() => {
    const circleElement = document.querySelector('.circle') as HTMLElement;

    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };

    let currentScale = 0;
    let currentAngle = 0;

    const handleMouseMove = (e: { x: number; y: number; }) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const speed = 0.17;

    const tick = () => {
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;
      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;
      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
      const scaleValue = (mouseVelocity / 150) * 0.5;
      currentScale += (scaleValue - currentScale) * speed;
      const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
      if (mouseVelocity > 20) {
        currentAngle = angle;
      }
      const rotateTransform = `rotate(${currentAngle}deg)`;

      if (circleElement) {
        circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      }

      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="circle" style={{ width: '50px', height: '50px', backgroundColor: 'black', borderRadius: '50%' }}>
      {/* Custom cursor circle */}
    </div>
  );
};

export default AnimatedCursor;
