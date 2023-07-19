/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,tsx,jsx,css}', './index.html'],
	theme: {
		extend: {
			colors: {
				primary: 'blue',
				edge: '#eee'
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
