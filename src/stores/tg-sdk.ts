import { defineStore } from 'pinia'
import type { TelegramWebApps } from 'telegram-webapps'
import { computed } from 'vue'

export const useTgSdkStore = defineStore('tgSdk', () => {
	const tg = Telegram.WebApp

	const user = computed(() => tg.initDataUnsafe.user)
	const username = computed(() => user.value?.username || '')
	const userId = computed(() => user.value?.id || 0)
	const startParam = computed(() => tg.initDataUnsafe.start_param)
	const isPremium = computed(() => user.value?.is_premium)
	const languageCode = computed(() => user.value?.language_code || 'en')

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

	const openInvoice = (url: string, callback?: TelegramWebApps.InvoiceClosedEventHandler) => {
		if (!url) {
			return
		}
		try {
			tg.openInvoice(url, callback)
		} catch (error) {
			console.warn(error)
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
		languageCode,
		initTgApp,
		openLink,
		openInvoice
	}
})
