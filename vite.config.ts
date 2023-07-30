import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		port: 2002,
		host: '0.0.0.0'
	},
	build: {
		sourcemap: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.mjs', '.mts']
	}
})
