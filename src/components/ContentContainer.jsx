import React from 'react';

const ContentContainer = ({ children, allowFullWidth = false }) => {
  return (
    <main
      className={`container mx-auto pt-15 pb-10 px-10 z-10 ${allowFullWidth ? '' : 'max-w-3xl'}`}
      style={{ minHeight: 'calc(100vh - 50px)' }}
    >
      <section className="space-y-6">
        {children}
      </section>
    </main>
  );
};

export default ContentContainer;
