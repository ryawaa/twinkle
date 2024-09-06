import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

/**
 * ThemeSwitcher component toggles between light and dark themes.
 */
const ThemeSwitcher = () => {
  // State variable to hold the current theme, defaulting to 'light'
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // useEffect hook to apply the theme when it changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); // Adds the 'dark' class for dark theme
    } else {
      document.documentElement.classList.remove('dark'); // Removes the 'dark' class for light theme
    }
  }, [theme]);

  // Function to handle theme toggle
  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button 
      onClick={handleThemeToggle} // Toggles the theme on button click
      className="px-4 py-2 bg-text text-crust rounded-md transition-all hover:bg-overlay1 focus:outline-none"
      aria-label="Toggle Theme"
    >
      {
        theme === 'light' ? <FaSun /> : <FaMoon /> // Renders Sun icon for light theme and Moon icon for dark theme
      }
    </button>
  );
};

export default ThemeSwitcher;