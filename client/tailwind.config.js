/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        primary: {
          DEFAULT: '#bf2231', // Rich Red
        },
        secondary: {
          DEFAULT: '#8aced0', // Soft Blue
        },
        accent: {
          DEFAULT: '#00BFA6', // Ocean Teal
        },
        light: {
          bg: '#f1faee', // Light Mode Background
          text: '#1D3557', // Light Mode Text
        },
        dark: {
          bg: '#121212', // Dark Mode Background
          text: '#F1FAEE', // Dark Mode Text
        },
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}