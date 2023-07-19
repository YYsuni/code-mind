import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 2002
	},
	build: {
		sourcemap: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.mjs', '.mts']
	}
})
