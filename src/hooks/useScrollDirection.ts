// hooks/useScrollDirection.ts
import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState<'up'|'down'>('up');
  
  useEffect(() => {
    let lastY = window.pageYOffset;
    let ticking = false;

    const onScroll = () => {
      const currentY = window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Math.abs(currentY - lastY) > 20) {     // ignore small jitters
            setScrollDir(currentY > lastY ? 'down' : 'up');
            lastY = currentY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollDir;
};
