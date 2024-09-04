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

	const [user, setUser] = useState<UserCreateResponse | null>(null)
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
	const referals = computed(() => user.value?.referals || [])
	const sumReferralsReward = computed(() =>
		referals.value.reduce((acc, el) => acc + Number(el.reward), 0)
	)

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
				username: tgStore.username,
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
				username: tgStore.username,
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

	const claimReferralsReward = async () => {
		try {
			await api.claimRefBonus({
				user_id: tgStore.userId
			})
			await loadUser()
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

	const getDailyReward = async () => {
		try {
			await api.getDailyReward({user_id: tgStore.userId})
			await loadUser()
		} catch (error) {
			console.warn(error)
		}
	}

	return {
		user,
		userTickets,
		userScore,
		isLoading,
		referals,
		sumReferralsReward,
		loadUser,
		changeUserScore,
		changeUserTickets,
		claimReferralsReward,
		startMining,
		doneMining,
		timeBeforeMiningLeftString,
		startUpdateMiningString,
		getDailyReward,
	}
})
