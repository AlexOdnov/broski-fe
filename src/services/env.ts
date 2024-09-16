export interface Env {
	backendUrl: string
	botUrl: string
	lootboxChance: number
}

export const envVariables: Env = {
	backendUrl: process.env.BACKEND_URL || '',
	botUrl: process.env.BOT_URL || '',
	lootboxChance: Number(process.env.LOOTBOX_CHANCE)
}
