/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", "./node_modules/@magiclabs/ui/dist/**/*.js"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			ibm: [
  				'IBM Plex Sans',
  				'sans-serif'
  			]
  		},
  		colors: {
  			primary: {
  				DEFAULT: '#bf2231'
  			},
  			secondary: {
  				DEFAULT: '#3498db'
  			},
  			accent: {
  				DEFAULT: '#1abc9c'
  			},
  			light: {
  				bg: '#f4f9f4',
  				text: '#2c3e50'
  			},
  			dark: {
  				bg: '#222222',
  				text: '#e0e6ed'
  			}
  		},
  		animation: {
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
  		},
  		keyframes: {
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}