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
      fontFamily: {
        ibm: ['IBM Plex Sans', 'sans-serif'],
      },
  		// colors: {
      //   primary: {
      //     DEFAULT: '#bf2231', // Rich Red
      //   },
      //   secondary: {
      //     DEFAULT: '#8aced0', // Soft Blue
      //   },
      //   accent: {
      //     DEFAULT: '#00BFA6', // Ocean Teal
      //   },
      //   light: {
      //     bg: '#f1faee', // Light Mode Background
      //     text: '#1D3557', // Light Mode Text
      //   },
      //   dark: {
      //     bg: '#121212', // Dark Mode Background
      //     text: '#F1FAEE', // Dark Mode Text
      //   },
      // }
      colors: {
        primary: {
            DEFAULT: '#bf2231',
        },
        secondary: {
            DEFAULT: '#3498db', // Medical Blue (calm, professional)
        },
        accent: {
            DEFAULT: '#1abc9c', // Soft Turquoise (healing, tranquility)
        },
        light: {
            bg: '#f4f9f4', // Very Light Mint (clean, pure feel)
            text: '#2c3e50', // Deep Charcoal (professional, readable)
        },
        dark: {
            bg: '#0f2027', // Deep Navy (calm, trustworthy)
            text: '#e0e6ed', // Soft Cloud Grey (gentle, approachable)
        },
    }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}