import { useState, useEffect, useRef } from 'react';

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollableContainer({ children, className = '' }: ScrollableContainerProps) {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkScrollability = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    setCanScrollUp(scrollTop > 10); // Small threshold for better UX
    setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10); // Small threshold for better UX
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial check
    checkScrollability();

    // Add scroll listener
    container.addEventListener('scroll', checkScrollability);
    
    // Add resize observer to check when content changes
    const resizeObserver = new ResizeObserver(checkScrollability);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', checkScrollability);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {/* Top shadow indicator */}
      {canScrollUp && (
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      )}
      
      {/* Scrollable content */}
      <div
        ref={containerRef}
        className={`modal-scroll ${className}`}
        style={{ scrollbarGutter: 'stable' }}
      >
        {children}
      </div>
      
      {/* Bottom shadow indicator */}
      {canScrollDown && (
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      )}
    </div>
  );
}
