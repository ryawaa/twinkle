// components/HeadTemplate.tsx
import Head from 'next/head';
import React from 'react';

// HeadTemplate functional component for setting up the document head
const HeadTemplate: React.FC = () => {
  return (
    // The Head component from Next.js to modify the head section of the document
    <Head>
      {/* Title of the document */}
      <title>Twinkle - Track Your Stocks</title>

      {/* Meta description for SEO and providing information about the content */}
      <meta
        name="description"
        content="Twinkle helps you track your favorite stocks in a delightful and user-friendly way."
      />

      {/* Meta viewport tag to control layout on mobile browsers */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Link tag for the favicon */}
      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
};

export default HeadTemplate;