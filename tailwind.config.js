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
    },
  },
  plugins: [],
}

