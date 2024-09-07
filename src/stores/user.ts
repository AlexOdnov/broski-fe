import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { ReferalsCreateResponse, UserCreateResponse } from '@/api/responseTypes'
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
	const [referralsResponse, setReferralsResponse] = useState<ReferalsCreateResponse | null>(null)
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
	const referrals = computed(() => referralsResponse.value?.referals || [])
	const totalReferrals = computed(() => referralsResponse.value?.total_referals || 0)
	const sumReferralsReward = computed(() =>
		referrals.value.reduce((acc, el) => acc + Number(el.reward), 0)
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
			setUser({
				username: 'name',
				score: 1000,
				tickets: 2,
				position: 1,
				ref_code: 'code',
				last_tap: '',
				left_mining: '',
				mining_claim: false,
				referals: [
					{
						username: 'name',
						refs: 10,
						bonus: 1000,
						reward: 100
					}
				]
			})
			withLoader && setIsLoading(false)
		}
	}

	const claimReferralsReward = async () => {
		try {
			await api.claimRefBonus({
				username: tgStore.username
			})
			await loadUser()
		} catch (error) {
			console.warn(error)
		}
	}

	const startMining = async () => {
		try {
			await api.startMinig({ username: tgStore.username })
		} catch (error) {
			console.warn(error)
		}
	}

	const doneMining = async () => {
		try {
			await api.doneMining({ username: tgStore.username })
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

	const loadReferrals = async () => {
		try {
			const response = await api.getReferrals({
				username: tgStore.username
			})
			setReferralsResponse(response)
		} catch (error) {
			console.warn(error)
		}
	}

	return {
		user,
		userTickets,
		userScore,
		isLoading,
		referrals,
		totalReferrals,
		sumReferralsReward,
		loadUser,
		changeUserScore,
		changeUserTickets,
		claimReferralsReward,
		startMining,
		doneMining,
		timeBeforeMiningLeftString,
		startUpdateMiningString,
		loadReferrals
	}
})
