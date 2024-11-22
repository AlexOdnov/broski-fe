export interface Env {
	backendUrl: string
	botUrl: string
	lootboxChance: number
	loaderDuration: number
	enableLoaderBanner: boolean
	enableInAppBanner: boolean
	invoice3Energy: string
	invoice10Energy: string
	invoice20Energy: string
	invoice3Premium: string
	invoice7Premium: string
	invoice14Premium: string
	imvoiceLootboxBuy: string
	sentryDSN: string
	skipPvpCost: 'coin' | 'ticket'
	symbolsQuantity: number
	symbolsShift: number
	environment: 'prod' | 'dev'
	disableApp: boolean
	chatUrl: string
}

export const envVariables: Env = {
	backendUrl: import.meta.env.VITE_BACKEND_URL || 'https://api.itsbrocoin.wtf',
	botUrl: import.meta.env.VITE_BOT_URL || 'https://t.me/itsbrocoinbot/BROSKI',
	lootboxChance: Number(import.meta.env.VITE_LOOTBOX_CHANCE || 1),
	loaderDuration: Number(import.meta.env.VITE_LOADER_DURATION || 500),
	enableLoaderBanner: import.meta.env.VITE_ENABLE_LOADER_BANNER === 'true',
	enableInAppBanner: import.meta.env.VITE_ENABLE_IN_APP_BANNER === 'true',
	invoice3Energy: import.meta.env.VITE_INVOICE_3_ENERGY || '',
	invoice10Energy: import.meta.env.VITE_INVOICE_10_ENERGY || '',
	invoice20Energy: import.meta.env.VITE_INVOICE_20_ENERGY || '',
	invoice3Premium: import.meta.env.VITE_INVOICE_3_PREMIUM || '',
	invoice7Premium: import.meta.env.VITE_INVOICE_7_PREMIUM || '',
	invoice14Premium: import.meta.env.VITE_INVOICE_14_PREMIUM || '',
	imvoiceLootboxBuy: import.meta.env.VITE_INVOICE_LOOTBOX_BUY || '',
	sentryDSN: import.meta.env.VITE_SENTRY_DSN || '',
	skipPvpCost: import.meta.env.VITE_SKIP_PVP_COST || 'ticket',
	symbolsQuantity: Number(import.meta.env.VITE_SYMBOLS_QUANTITY) || 0,
	symbolsShift: Number(import.meta.env.VITE_SYMBOLS_SHIFT) || 0,
	environment: import.meta.env.VITE_ENVIRONMENT || 'dev',
	disableApp: import.meta.env.VITE_DISABLE_APP === 'true',
	chatUrl: import.meta.env.VITE_CHAT_URL || ''
}
