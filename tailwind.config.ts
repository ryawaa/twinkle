import type { Config } from 'tailwindcss'

const latte = {
  base: '#ebe6df',
  mantle: '#e2ddd6',
  crust: '#f5f4ed',
  surface0: '#f2e7dc',
  surface1: '#ece5df',
  surface2: '#f4ede8',
  overlay0: '#dad5d0',
  overlay1: '#e3ded8',
  overlay2: '#edebe7',
  text: '#4c4f52',
  subtext1: '#55595e',
  subtext0: '#5f6368'
}

const mocha = {
  base: '#1e1e2e',
  mantle: '#181825',
  crust: '#13111e',
  surface0: '#313244',
  surface1: '#3a3c51',
  surface2: '#4e4f68',
  overlay0: '#6c6f85',
  overlay1: '#898ba5',
  overlay2: '#aabbcc',
  text: '#cdd6f4',
  subtext1: '#bac2de',
  subtext0: '#a6adc8'
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        base: 'var(--color-base)',
        mantle: 'var(--color-mantle)',
        crust: 'var(--color-crust)',
        surface0: 'var(--color-surface0)',
        surface1: 'var(--color-surface1)',
        surface2: 'var(--color-surface2)',
        overlay0: 'var(--color-overlay0)',
        overlay1: 'var(--color-overlay1)',
        overlay2: 'var(--color-overlay2)',
        text: 'var(--color-text)',
        subtext1: 'var(--color-subtext1)',
        latte,
        mocha
      }
    }
  },
  plugins: []
}

export default config