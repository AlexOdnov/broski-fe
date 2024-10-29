import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { Prize } from '@/api/generatedApi'
import { useApi } from '@/api/useApi'
import { useTgSdkStore } from '@/stores/tg-sdk'

export const useLootboxesStore = defineStore('lootboxes', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()

	const [prizes, setPrizes] = useState<Prize[]>([])

	const loadPrizes = async () => {
		try {
			setPrizes(await api.getPrizes())
		} catch (error) {
			console.warn(error)
		}
	}

	const openLootbox = async (): Promise<string | null> => {
		try {
			const result = await api.openLootbox(tgStore.userId)
			return result.result ?? null
		} catch (error) {
			console.warn(error)
			return null
		}
	}

	return {
		prizes,
		loadPrizes,
		openLootbox
	}
})
