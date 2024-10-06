import { SentryError, useSentry } from '@/services/sentry'
import { forceUpdateTgUser } from '@/utils/tg-parse'
import { defineStore } from 'pinia'
import type { TelegramWebApps } from 'telegram-webapps'
import { computed, ref } from 'vue'

export const useTgSdkStore = defineStore('tgSdk', () => {
	const sentry = useSentry()

	let initTgSdkRetryCount = 3

	const tg = ref<null | TelegramWebApps.WebApp>(null)

	const user = computed(() => tg.value?.initDataUnsafe?.user)
	const startParam = computed(() => tg.value?.initDataUnsafe?.start_param)
	const username = computed(() => user.value?.username || '')
	const userId = computed(() => user.value?.id || 0)
	const isPremium = computed(() => user.value?.is_premium)
	const languageCode = computed(() => user.value?.language_code || 'en')

	const openLink = (url?: string) => {
		if (!url) {
			return
		}
		try {
			tg.value?.openTelegramLink(url)
		} catch (error) {
			console.warn(error)
			tg.value?.openLink(url)
		}
	}

	const openInvoice = (url: string, callback?: TelegramWebApps.InvoiceClosedEventHandler) => {
		if (!url) {
			return
		}
		try {
			tg.value?.openInvoice(url, callback)
		} catch (error) {
			console.warn(error)
		}
	}

	const initTgApp = () => {
		try {
			tg.value = Telegram.WebApp
			tg.value.expand()
			tg.value.disableVerticalSwipes()
			if (!user.value) {
				initTgSdkRetryCount -= 1
				if (initTgSdkRetryCount > 0) {
					tg.value = null
					forceUpdateTgUser()
					initTgApp()
					return
				}
				sentry.captureException(
					new SentryError('Tg sdk error', 'Failed to get telegram user information'),
					{ ...tg }
				)
			}
			tg.value.ready()
		} catch (error) {
			initTgSdkRetryCount -= 1
			if (initTgSdkRetryCount > 0) {
				initTgApp()
				return
			}
			sentry.captureException(error, {
				...(tg.value ? tg.value : {})
			})
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
