import { useState } from '@/utils/useState'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useTgSdkStore = defineStore('tgSdk', () => {
	const tg = Telegram.WebApp

	const [isExpanded, setIsExpanded] = useState(false)

	tg.onEvent('viewportChanged', (e) => {
		if (e.isStateStable) {
			setIsExpanded(tg.isExpanded as unknown as boolean)
		}
	})

	const user = computed(() => tg.initDataUnsafe.user)
	const username = computed(() => user.value?.username || '')
	const userId = computed(() => user.value?.id || 0)
	const startParam = computed(() => tg.initDataUnsafe.start_param)

	const initTgApp = () => tg.ready()

	return {
		user,
		username,
		userId,
		startParam,
		isExpanded,
		initTgApp
	}
})
