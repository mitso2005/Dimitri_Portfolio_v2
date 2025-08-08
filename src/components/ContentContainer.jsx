import React from 'react';

const ContentContainer = ({ children, allowFullWidth = false }) => {
  return (
    <main className={`container mx-auto py-20 px-10 z-10 ${allowFullWidth ? '' : 'max-w-3xl'}`}>
      <section className="space-y-6">
        {children}
      </section>
    </main>
  );
};

export default ContentContainer;
