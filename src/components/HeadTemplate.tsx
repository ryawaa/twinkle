// components/HeadTemplate.tsx
import Head from 'next/head';

const HeadTemplate = () => {
  return (
    <Head>
      <title>Twinkle - Track Your Stocks</title>
      <meta name="description" content="Twinkle helps you track your favorite stocks in a delightful and user-friendly way." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.svg" />
      </Head>
  );
};

export default HeadTemplate;