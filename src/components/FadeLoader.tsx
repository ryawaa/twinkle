import React, { useEffect, useState } from 'react';
import { FadeLoader as Spinner } from 'react-spinners';

// Props interface for the FadeLoader component
interface FadeLoaderProps {
  loading: boolean; // Indicates if the loader should be shown
  color?: string;   // Optional color for the loader
}

// FadeLoader component to display a loading spinner with fade animation
const FadeLoader: React.FC<FadeLoaderProps> = ({ loading, color }) => {
  // State to hold the theme color
  const [themeColor, setThemeColor] = useState<string>(color || '');

  // Effect to set default theme color if color prop is not provided
  useEffect(() => {
    if (!color) {
      // Get the CSS property value for --color-text from the document's root element
      const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
      setThemeColor(defaultColor);
    } else {
      setThemeColor(color);
    }
  }, [color]);

  // Render the Spinner component from react-spinners library
  return (
    <div className="flex justify-center items-center translate-x-3 translate-y-3 px-2">
      <Spinner color={themeColor} loading={loading} height={6} padding={0} margin={-12} width={2} />
    </div>
  );
};

export default FadeLoader;