import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['vite.svg'],
			manifest: {
				name: 'Sankofa',
				short_name: 'Sankofa',
				description: 'Decolonizing, awakening cultural learning app',
				theme_color: '#0f172a',
				background_color: '#0b1020',
				display: 'standalone',
				start_url: '/',
				icons: [
					{ src: 'vite.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,woff2}']
			}
		})
	]
})
