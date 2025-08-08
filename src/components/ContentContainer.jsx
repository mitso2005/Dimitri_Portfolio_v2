import React from 'react';

const ContentContainer = ({ children }) => {
  return (
    <main className="container mx-auto py-20 px-10 max-w-3xl z-10">
      <section className="space-y-6">
        {children}
      </section>
    </main>
  );
};

export default ContentContainer;
