export interface Env {
	backendUrl: string
	botUrl: string
	lootboxChance: number
	loaderDuration: number
	enableLoaderBanner: boolean
	invoice3Energy: string
	invoice10Energy: string
	invoice20Energy: string
	invoice3Premium: string
	invoice7Premium: string
	invoice14Premium: string
	sentryDSN: string
	skipPvpCost: 'coin' | 'ticket'
}

export const envVariables: Env = {
	backendUrl: import.meta.env.VITE_BACKEND_URL || 'https://brocoin.site',
	botUrl: import.meta.env.VITE_BOT_URL || 'https://t.me/itsbrocoinbot/BROSKI',
	lootboxChance: Number(import.meta.env.VITE_LOOTBOX_CHANCE || 1),
	loaderDuration: Number(import.meta.env.VITE_LOADER_DURATION || 500),
	enableLoaderBanner: import.meta.env.VITE_ENABLE_LOADER_BANNER === 'true',
	invoice3Energy: import.meta.env.VITE_INVOICE_3_ENERGY || '',
	invoice10Energy: import.meta.env.VITE_INVOICE_10_ENERGY || '',
	invoice20Energy: import.meta.env.VITE_INVOICE_20_ENERGY || '',
	invoice3Premium: import.meta.env.VITE_INVOICE_3_PREMIUM || '',
	invoice7Premium: import.meta.env.VITE_INVOICE_7_PREMIUM || '',
	invoice14Premium: import.meta.env.VITE_INVOICE_14_PREMIUM || '',
	sentryDSN: import.meta.env.VITE_SENTRY_DSN || '',
	skipPvpCost: import.meta.env.VITE_SKIP_PVP_COST || 'ticket'
}
