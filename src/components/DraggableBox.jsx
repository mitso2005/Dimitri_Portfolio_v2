import React, { useState, useEffect, useRef } from 'react';

export default function DraggableBox() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  const onMouseDown = (e) => {
    // Only left mouse button
    if (e.button !== 0) return;
    
    // Calculate offset from mouse position to current box position
    // This ensures the box doesn't jump when we start dragging
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    
    // Use clientX/Y for viewport-relative positioning
    // Subtract the drag offset so the box doesn't jump
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
    
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (dragging) {
      // Add listeners to document so dragging works even when mouse leaves the container
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      
      // Change cursor globally while dragging
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [dragging, dragOffset.x, dragOffset.y]);

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      <div
        ref={boxRef}
        onMouseDown={onMouseDown}
        style={{ 
          left: position.x, 
          top: position.y,
          transform: dragging ? 'scale(1.05)' : 'scale(1)',
          transition: dragging ? 'none' : 'transform 0.2s ease',
        }}
        className={`
          absolute w-32 h-32 rounded-xl shadow-lg select-none
          flex items-center justify-center font-bold text-white
          ${dragging 
            ? 'bg-blue-600 cursor-grabbing shadow-2xl' 
            : 'bg-blue-500 cursor-grab hover:bg-blue-600 hover:shadow-xl'
          }
          transition-all duration-200
        `}
      >
        <span className="pointer-events-none">
          {dragging ? 'Dragging!' : 'Drag Me!'}
        </span>
      </div>
      
      {/* Optional: Show current position for debugging */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded text-sm font-mono">
        x: {Math.round(position.x)}, y: {Math.round(position.y)}
        <br />
        {dragging ? 'Dragging' : 'Idle'}
      </div>
    </div>
  );
}