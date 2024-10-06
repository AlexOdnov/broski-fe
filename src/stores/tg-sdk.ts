import { SentryError, useSentry } from '@/services/sentry'
import { defineStore } from 'pinia'
import type { TelegramWebApps } from 'telegram-webapps'
import { computed } from 'vue'

export const useTgSdkStore = defineStore('tgSdk', () => {
	const sentry = useSentry()

	let tg: null | TelegramWebApps.WebApp = null
	let initTgSdkRetryCount = 3

	const user = computed(() => tg?.initDataUnsafe?.user)
	const startParam = computed(() => tg?.initDataUnsafe?.start_param)
	const username = computed(() => user.value?.username || '')
	const userId = computed(() => user.value?.id || 0)
	const isPremium = computed(() => user.value?.is_premium)
	const languageCode = computed(() => user.value?.language_code || 'en')

	const openLink = (url?: string) => {
		if (!url) {
			return
		}
		try {
			tg?.openTelegramLink(url)
		} catch (error) {
			console.warn(error)
			tg?.openLink(url)
		}
	}

	const openInvoice = (url: string, callback?: TelegramWebApps.InvoiceClosedEventHandler) => {
		if (!url) {
			return
		}
		try {
			tg?.openInvoice(url, callback)
		} catch (error) {
			console.warn(error)
		}
	}

	const retryInitTgApp = (error: SentryError) => {
		initTgSdkRetryCount -= 1
		if (initTgSdkRetryCount > 0) {
			document.querySelector('#tg-sdk-script-tag')?.remove()
			const scriptTag = document.createElement('script')
			scriptTag.src = 'https://telegram.org/js/telegram-web-app.js'
			scriptTag.id = 'tg-sdk-script-tag'
			scriptTag.onload = initTgApp
			document.head.appendChild(scriptTag)
			return
		}
		sentry.captureException(error, {
			...(tg ? tg : {})
		})
	}

	const initTgApp = () => {
		try {
			tg = Telegram.WebApp
			tg.expand()
			tg.disableVerticalSwipes()
			tg.ready()
			if (!user.value) {
				retryInitTgApp(new SentryError('Tg sdk error', 'Failed to get telegram user information'))
			}
		} catch (error) {
			retryInitTgApp(error as SentryError)
		}
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
