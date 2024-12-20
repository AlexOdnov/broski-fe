import { sentryVitePlugin } from '@sentry/vite-plugin'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		sentryVitePlugin({
			org: 'broski-inc',
			project: 'broski-fe',
			authToken: process.env.SENTRY_AUTH_TOKEN,
			release: { name: 'broski-fe@' + process.env.CF_PAGES_COMMIT_SHA },
			bundleSizeOptimizations: {
				excludeDebugStatements: true,
				excludeReplayIframe: true,
				excludeReplayShadowDom: true,
				excludeReplayWorker: true,
				excludeTracing: true
			}
		})
	],

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},

	build: {
		sourcemap: true,
		target: ['es2020', 'edge80', 'firefox78', 'chrome80', 'safari12']
	}
})
