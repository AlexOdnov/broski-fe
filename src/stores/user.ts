import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { UserCreateResponse } from '@/api/responseTypes'
import { useApi } from '@/api/useApi'
import { useTgSdkStore } from './tg-sdk'
import type { ScoreCreatePayload, TicketsCreatePayload } from '@/api/generatedApi'
import { computed } from 'vue'
import { addHours, addMinutes, msToTime } from '@/utils/date'

export const useUserStore = defineStore('user', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [timeBeforeMiningLeftString, setTimeDeforeMiningString] = useState<string | null>(null)
	const [timeoutID, setTimeoutID] = useState<number | null>(null)

	const [user, setUser] = useState<UserCreateResponse | null>({
		username: 'rdsht',
		score: 1972,
		left_mining: '00:00',
		mining_claim: false,
		ref_code: '219611970',
		position: 1833,
		tickets: 0,
		boxes: 0,
		daily_stric: 1,
		daily_claim: true,
		first_login: true,
		region: 'eng',
		first_game: false,
		advertising_limit: 200,
		last_tap: ''
	})
	const [timeWhenUserUpdated, setTimeWhenUserUpdated] = useState<number | null>(null)

	const timeWhenClaimEnable = computed(() => {
		if (!timeWhenUserUpdated.value || !user.value) {
			return null
		}
		const delta = user.value.left_mining.split(':').map((x) => +x)
		if (delta.length !== 2 || !isFinite(delta[0]) || !isFinite(delta[1])) {
			return null
		}
		let time = addHours(timeWhenUserUpdated.value, delta[0])
		time = addMinutes(time, delta[1])
		return time
	})

	const userTickets = computed(() => user.value?.tickets || 0)
	const userScore = computed(() => user.value?.score || 0)

	const setUserProperty = <T extends keyof UserCreateResponse>(
		key: T,
		value: UserCreateResponse[T]
	) => {
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

	const loadUser = async (withLoader = false) => {
		try {
			withLoader && setIsLoading(true)
			const userResponse = await api.getUser({
				user_id: tgStore.userId,
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
			withLoader && setIsLoading(false)
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
			await loadUser()
		} catch (error) {
			console.warn(error)
		}
	}

	const claimAdvertisingReward = async () => {
		try {
			await api.claimAdvertisingReward({user_id: tgStore.userId})
		} catch (error) {
			console.warn(error)
		} finally {
			await loadUser()
		}
	}

	return {
		user,
		userTickets,
		userScore,
		isLoading,
		loadUser,
		changeUserScore,
		changeUserTickets,
		startMining,
		doneMining,
		timeBeforeMiningLeftString,
		startUpdateMiningString,
		claimDailyReward,
		claimAdvertisingReward,
	}
})
