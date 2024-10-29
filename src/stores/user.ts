import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import { useApi } from '@/api/useApi'
import { useTgSdkStore } from './tg-sdk'
import { computed } from 'vue'
import { useCommonStore } from './common'
import type { User, LegacyUser } from '@/api/generatedApi'
import { useSentry } from '@/services/sentry'

export const useUserStore = defineStore('user', () => {
	const api = useApi()
	const sentry = useSentry()
	const tgStore = useTgSdkStore()
	const commonStore = useCommonStore()

	const [user, setUser] = useState<User | null>(null)
	const [userLegacy, setUserLegacy] = useState<LegacyUser | null>(null)

	const userTickets = computed(() => user.value?.tickets || 0)
	const userScore = computed(() => user.value?.score || 0)
	const userBoxes = computed(() => user.value?.boxes || 0)

	const setUserProperty = <T extends keyof User>(key: T, value: User[T]) => {
		if (user.value) {
			setUser({ ...user.value, [key]: value })
		}
	}

	const loadUserLegacy = async (withLoader = false) => {
		try {
			withLoader && commonStore.setIsLoading(true)
			const userResponse = await api.postUser({
				user_id: tgStore.userId,
				username: tgStore.username,
				ref_code: tgStore.startParam,
				premium: tgStore.isPremium
			})
			setUserLegacy(userResponse)
		} catch (error) {
			sentry.captureNetworkException(error)
			console.warn(error)
		} finally {
			withLoader && commonStore.setIsLoading(false)
		}
	}

	const loadUser = async () => {
		try {
			const userResponse = await api.getUser({
				userId: tgStore.userId
			})
			setUser(userResponse)
		} catch (error) {
			sentry.captureNetworkException(error)
			console.warn(error)
		}
	}

	const claimDailyReward = async () => {
		try {
			await api.claimDailyReward({ userId: tgStore.userId })
			await loadUser()
			await loadUserLegacy()
		} catch (error) {
			console.warn(error)
		}
	}

	const claimAdvertisingReward = async () => {
		try {
			await api.claimAdvertisingReward({ userId: tgStore.userId })
		} catch (error) {
			console.warn(error)
		} finally {
			await loadUser()
		}
	}

	const doneFirstLogin = async () => {
		try {
			await api.doneFirstLogin({ userId: tgStore.userId })
			await loadUserLegacy()
		} catch (error) {
			console.warn(error)
		}
	}

	const doneUpdateNotification = async () => {
		try {
			await api.doneUpdateNotification({ userId: tgStore.userId })
			await loadUserLegacy()
		} catch (error) {
			console.warn(error)
		}
	}

	const doneEventNotification = async () => {
		try {
			await api.doneEventNotification({ userId: tgStore.userId })
			await loadUserLegacy()
		} catch (error) {
			console.warn(error)
		}
	}

	const switchRegion = async () => {
		try {
			await api.switchRegion({
				userId: tgStore.userId,
				region: tgStore.languageCode
			})
		} catch (error) {
			console.warn(error)
		}
	}

	return {
		user,
		userLegacy,
		userTickets,
		userScore,
		userBoxes,
		loadUserLegacy,
		loadUser,
		claimDailyReward,
		claimAdvertisingReward,
		doneFirstLogin,
		doneUpdateNotification,
		doneEventNotification,
		switchRegion
	}
})
