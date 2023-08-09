import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [react(), svgr(), tsconfigPaths()],
	server: {
		port: 2222,
		host: '0.0.0.0'
	},
	build: {
		sourcemap: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss', '.mjs', '.mts']
	}
})
