import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { UserStatsCreateResponse } from '@/api/responseTypes'
import { useApi } from '@/api/useApi'
import { useTgSdkStore } from './tg-sdk'
import type { ScoreCreatePayload, TicketsCreatePayload } from '@/api/generatedApi'
import { computed } from 'vue'
import { addHours, addMinutes, msToTime } from '@/utils/date'
import { useCommonStore } from './common'
import type { User } from '@/api/newGeneratedApi'

export const useUserStore = defineStore('user', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()
	const commonStore = useCommonStore()

	const [timeBeforeMiningLeftString, setTimeDeforeMiningString] = useState<string | null>(null)
	const [timeoutID, setTimeoutID] = useState<ReturnType<typeof setTimeout> | null>(null)

	const [user, setUser] = useState<User | null>(null)
	const [userStats, setUserStats] = useState<UserStatsCreateResponse | null>(null)
	const [timeWhenUserUpdated, setTimeWhenUserUpdated] = useState<number | null>(null)

	const timeWhenClaimEnable = computed(() => {
		if (!timeWhenUserUpdated.value || !user.value) {
			return null
		}
		const delta = user.value.mining.left.split(':').map((x) => +x)
		if (delta.length !== 2 || !isFinite(delta[0]) || !isFinite(delta[1])) {
			return null
		}
		let time = addHours(timeWhenUserUpdated.value, delta[0])
		time = addMinutes(time, delta[1])
		return time
	})

	const userTickets = computed(() => user.value?.tickets || 0)
	const userScore = computed(() => user.value?.score || 0)
	const userBoxes = computed(() => user.value?.boxes || 0)

	const setUserProperty = <T extends keyof User>(key: T, value: User[T]) => {
		if (user.value) {
			setUser({ ...user.value, [key]: value })
		}
	}

	const changeUserScore = async (value: number) => {
		if (user.value) {
			const payload: ScoreCreatePayload = {
				user_id: tgStore.userId,
				score: Math.abs(value)
			}
			try {
				await (value > 0 ? api.addScore(payload) : api.removeScore(payload))
				await loadUser()
			} catch (error) {
				console.warn(error)
			}
		}
	}

	const changeUserTickets = async (value: number) => {
		if (user.value) {
			const payload: TicketsCreatePayload = {
				user_id: tgStore.userId,
				tickets: Math.abs(value)
			}
			try {
				await (value > 0 ? api.addTickets(payload) : api.removeTickets(payload))
				await loadUser()
			} catch (error) {
				console.warn(error)
			}
		}
	}

	const initUser = async () => {
		try {
			commonStore.setIsLoading(true)
			const userResponse = await api.postUser({
				user_id: `${tgStore.userId}`,
				username: tgStore.username,
				ref_code: tgStore.startParam,
				premium: tgStore.isPremium
			})
			setUser(userResponse)
			setTimeWhenUserUpdated(new Date().getTime())
			startUpdateMiningString()
		} catch (error) {
			console.warn(error)
		} finally {
			commonStore.setIsLoading(false)
		}
	}

	const loadUser = async () => {
		try {
			const userResponse = await api.getUserV2({
				userId: `${tgStore.userId}`
			})
			setUser(userResponse)
			setTimeWhenUserUpdated(new Date().getTime())
			startUpdateMiningString()
		} catch (error) {
			console.warn(error)
		}
	}

	const loadUserStats = async () => {
		try {
			const userResponse = await api.getUserStats({
				user_id: tgStore.userId,
				username: tgStore.username,
				ref_code: tgStore.startParam,
				premium: tgStore.isPremium
			})
			setUserStats(userResponse)
		} catch (error) {
			console.warn(error)
		}
	}

	const startMining = async () => {
		try {
			await api.startMining({ user_id: tgStore.userId })
		} catch (error) {
			console.warn(error)
		}
	}

	const doneMining = async () => {
		try {
			await api.doneMining({ user_id: tgStore.userId })
		} catch (error) {
			console.warn(error)
		}
	}

	const startUpdateMiningString = () => {
		if (timeoutID.value) {
			clearTimeout(timeoutID.value)
		}
		const currentTimeInMs = new Date().getTime()
		if (!timeWhenClaimEnable.value) {
			setTimeDeforeMiningString(null)
		} else {
			const passedTimeInMs = timeWhenClaimEnable.value - currentTimeInMs
			if (passedTimeInMs <= 0) {
				setTimeDeforeMiningString(null)
				return
			} else {
				setTimeDeforeMiningString(msToTime(passedTimeInMs))
			}
			setTimeoutID(setTimeout(startUpdateMiningString, 60000)) // раз в минуту
		}
	}

	const claimDailyReward = async () => {
		try {
			await api.claimDailyReward({ user_id: tgStore.userId })
			await loadUserStats()
		} catch (error) {
			console.warn(error)
		}
	}

	const claimAdvertisingReward = async () => {
		try {
			await api.claimAdvertisingReward({ user_id: tgStore.userId })
		} catch (error) {
			console.warn(error)
		} finally {
			await loadUser()
		}
	}

	const doneFirstLogin = async () => {
		try {
			await api.doneFirstLogin({ user_id: tgStore.userId })
			await loadUserStats()
		} catch (error) {
			console.warn(error)
		}
	}

	const claimBox = async (boxCount: number) => {
		try {
			await api.claimBox({ user_id: tgStore.userId, box: boxCount })
			await loadUser()
		} catch (error) {
			console.warn(error)
		}
	}

	const doneUpdateNotification = async () => {
		try {
			await api.doneUpdateNotification({ user_id: tgStore.userId })
			await loadUserStats()
		} catch (error) {
			console.warn(error)
		}
	}

	const switchRegion = async () => {
		try {
			await api.switchRegion({
				user_id: tgStore.userId,
				region: tgStore.languageCode
			})
		} catch (error) {
			console.warn(error)
		}
	}

	return {
		user,
		userStats,
		userTickets,
		userScore,
		userBoxes,
		initUser,
		loadUser,
		loadUserStats,
		changeUserScore,
		changeUserTickets,
		startMining,
		doneMining,
		timeBeforeMiningLeftString,
		startUpdateMiningString,
		claimDailyReward,
		claimAdvertisingReward,
		doneFirstLogin,
		claimBox,
		doneUpdateNotification,
		switchRegion
	}
})
