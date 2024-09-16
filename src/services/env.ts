export interface Env {
	backendUrl: string
	botUrl: string
	lootboxChance: number
	loaderDuration: number
}

export const envVariables: Env = {
	backendUrl: import.meta.env.VITE_BACKEND_URL || '',
	botUrl: import.meta.env.VITE_BOT_URL || '',
	lootboxChance: Number(import.meta.env.VITE_LOOTBOX_CHANCE || 1),
	loaderDuration: Number(import.meta.env.VITE_LOADER_DURATION || 5000)
}
