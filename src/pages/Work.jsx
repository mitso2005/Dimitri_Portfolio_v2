import React from 'react';
import PageNav from '../components/PageNav.jsx';
import Box from '../components/DraggableBox.jsx';

export default function Work() {
  return (
    <div>
      <PageNav />
      <div className="">
        <h2 className="">Developer Work</h2>
        <p>Discover my coding projects and work experience. Just Hover, Drag and Click to learn more!</p>
      </div>
      <Box />
    </div>
  );
}
