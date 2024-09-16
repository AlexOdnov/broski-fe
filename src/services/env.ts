export interface Env {
	backendUrl: string
	botUrl: string
	lootboxChance: number
}

export const envVariables: Env = {
	backendUrl: import.meta.env.BACKEND_URL || '',
	botUrl: import.meta.env.BOT_URL || '',
	lootboxChance: Number(import.meta.env.LOOTBOX_CHANCE)
}
