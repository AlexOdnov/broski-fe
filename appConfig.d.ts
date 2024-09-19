import { AdsgramInitParams, AdController } from './adsgram'

declare global {
	interface Window {
		initCdTma: ({ id: number }) => Promise<() => Promise<void>>
		Adsgram?: {
			init(params: AdsgramInitParams): AdController
		}
	}
}
