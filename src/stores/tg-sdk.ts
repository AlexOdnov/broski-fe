import type { LocaleType } from '@/services/localization'
import { SentryError, useSentry } from '@/services/sentry'
import { forceUpdateTgUser } from '@/utils/tg-parse'
import { defineStore } from 'pinia'
import type { TelegramWebApps } from 'telegram-webapps'
import { computed, ref } from 'vue'

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'

export const useTgSdkStore = defineStore('tgSdk', () => {
	const sentry = useSentry()

	let initTgSdkRetryCount = 3

	const tg = ref<null | TelegramWebApps.WebApp>(null)

	const user = computed(() => tg.value?.initDataUnsafe?.user)
	const startParam = computed(() =>
		Number(tg.value?.initDataUnsafe?.start_param)
			? Number(tg.value?.initDataUnsafe?.start_param)
			: undefined
	)
	const username = computed(() => user.value?.username || '')
	const userId = computed(() => user.value?.id || 0)
	const isPremium = computed(() => user.value?.is_premium)
	const languageCode = computed(() => (user.value?.language_code || 'en') as LocaleType)

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

	const openInvoice = (
		url: string,
		callback?: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void
	) => {
		if (!url) {
			sentry.captureException(new Error('Empty invoice url'))
			return
		}
		try {
			if (tg.value) {
				// ошибка в типизации tg web app sdk
				tg.value.openInvoice(url, callback as unknown as TelegramWebApps.InvoiceClosedEventHandler)
			} else {
				throw new SentryError('Tg sdk error', 'Tg sdk is not exist')
			}
		} catch (error) {
			sentry.captureException(error)
			console.warn(error)
		}
	}

	const hapticFeedback = (style: HapticStyle = 'soft') =>
		Telegram.WebApp?.HapticFeedback.impactOccurred(style)

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
			}
			tg.value.ready()
		} catch (error) {
			initTgSdkRetryCount -= 1
			if (initTgSdkRetryCount > 0) {
				initTgApp()
				return
			}
			sentry.captureException(error)
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
		openInvoice,
		hapticFeedback
	}
})
