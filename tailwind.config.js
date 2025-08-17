/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your custom theme colors
        theme: {
          'dark-purple': '#9a8194',    // Main dark purple for text, icons, hero background
          'light-bg': '#f7f0f0',      // Light background and accent when bg is dark
          'bright-pink': '#ffd9f6',   // Bright pink for hover effects
        },
        // Semantic color names for easier usage
        primary: {
          DEFAULT: '#9a8194',    // Dark purple
          light: '#f7f0f0',      // Light background 
          accent: '#ffd9f6',     // Bright pink
        },
        // CSS variables for dynamic theming
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        'mono': ['Roboto Mono', 'monospace'],
      },
      animation: {
        'scroll-slow': 'scroll-horizontal 40s linear infinite',
        'scroll-medium': 'scroll-horizontal 30s linear infinite',
        'scroll-fast': 'scroll-horizontal 25s linear infinite',
      },
      keyframes: {
        'scroll-horizontal': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-primary\\/30': {
          'scrollbar-color': 'rgba(154, 129, 148, 0.3) transparent',
        },
        '.scrollbar-track-transparent': {
          'scrollbar-track-color': 'transparent',
        },
        '.hover\\:scrollbar-thumb-primary\\/50:hover': {
          'scrollbar-color': 'rgba(154, 129, 148, 0.5) transparent',
        },
        /* Webkit scrollbar styles */
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: 'rgba(154, 129, 148, 0.3)',
          'border-radius': '3px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(154, 129, 148, 0.5)',
        },
        '.scrollbar-thin::-webkit-scrollbar-corner': {
          background: 'transparent',
        },
      })
    }
  ],
}

