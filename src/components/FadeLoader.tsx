import React from 'react';
import { FadeLoader as Spinner } from 'react-spinners';

interface FadeLoaderProps {
  loading: boolean;
  color?: string;
}

const FadeLoader: React.FC<FadeLoaderProps> = ({ loading, color }) => {
  const themeColor = color || getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
  return (
    <div className="flex justify-center items-center translate-x-3 translate-y-3 px-2">
      <Spinner color={themeColor} loading={loading} height={6} padding={0} margin={-12} width={2}/>
    </div>
  );
};

export default FadeLoader;