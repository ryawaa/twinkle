import { useEffect, useState } from 'react';

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
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
    >
      O
    </button>
  );
};

export default ThemeSwitcher;