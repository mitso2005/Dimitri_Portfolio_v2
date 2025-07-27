import React, { useState, useEffect, useRef } from 'react';

export default function DraggableBox() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - containerRect.left - position.x,
      y: e.clientY - containerRect.top - position.y,
    });

    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const boxWidth = 128;
    const boxHeight = 128;

    const newX = Math.min(
      Math.max(0, mouseX - dragOffset.x),
      containerRect.width - boxWidth
    );
    const newY = Math.min(
      Math.max(0, mouseY - dragOffset.y),
      containerRect.height - boxHeight
    );

    setPosition({ x: newX, y: newY });

    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [dragging, dragOffset]);

  return (
    <div className="fixed inset-0 mt-100 mb-10 mr-10 ml-10">
      {/* Spacer to ensure scrollable area below */}
      <div
        ref={containerRef}
        className="fixed inset-0 mt-100 mb-10 mr-10 ml-10 border-2 border-black"
      >
        <div
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
      </div>
    </div>
  );
}
