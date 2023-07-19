/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,tsx,jsx,css}', './index.html'],
	theme: {
		extend: {
			colors: {
				bg: '#FEF3E1',
				text: 'black',
				focus: '#51A8B9',
				edge: '#7597E8'
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
