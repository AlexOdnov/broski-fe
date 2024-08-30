import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useTgSdkStore = defineStore('tgSdk', () => {
	const tg = Telegram.WebApp

	const user = computed(() => tg.initDataUnsafe.user)
	const username = computed(() => user.value?.username || '')
	const userId = computed(() => user.value?.id || 0)
	const startParam = computed(() => tg.initDataUnsafe.start_param)
	const isPremium = computed(() => user.value?.is_premium)

	const openLink = (url?: string) => {
		if (!url) {
			return
		}
		try {
			tg.openTelegramLink(url)
		} catch (error) {
			console.warn(error)
			tg.openLink(url)
		}
	}

	const initTgApp = () => {
		tg.expand()
		tg.disableVerticalSwipes()
		tg.ready()
	}

	return {
		user,
		username,
		userId,
		startParam,
		isPremium,
		initTgApp,
		openLink
	}
})
