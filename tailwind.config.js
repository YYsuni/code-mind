/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,tsx,jsx,css}', './index.html'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif']
			},
			colors: {
				bg: '#FEF3E1',
				text: 'black',
				focus: '#51A8B9',
				edge: '#7597E8',
				'#1': '#FD9886',
				'#2': '#51A8B9'
			},
			screens: {
				'max-xl': { max: '1280px' },
				'max-lg': { max: '1024px' },
				'max-md': { max: '768px' },
				'max-sm': { max: '640px' },
				'max-xs': { max: '360px' }
			}
		}
	},
	plugins: []
}
