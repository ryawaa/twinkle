import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button 
      onClick={handleThemeToggle}
      className="px-4 py-2 bg-text text-crust rounded-md transition-all hover:bg-overlay1 focus:outline-none"
    >
      {
        theme === 'light' ? <FaSun /> : <FaMoon />
      }
    </button>
  );
};

export default ThemeSwitcher;