import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }
    
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}