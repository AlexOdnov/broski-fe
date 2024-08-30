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
	const sumRefBonus = computed(() => referals.value.reduce((acc, el) => acc + Number(el.bonus), 0))

	const setUserProperty = <T extends keyof UserCreateResponse>(
		key: T,
		value: UserCreateResponse[T]
	) => {
		if (user.value) {
			setUser({ ...user.value, [key]: value })
			setTimeWhenUserUpdated(new Date().getTime())
		}
	}

	const changeUserScore = (value: number) => {
		if (user.value) {
			setUserProperty('score', userScore.value + value)
			const payload: ScoreCreatePayload = {
				username: tgStore.username,
				score: Math.abs(value)
			}
			try {
				value > 0 ? api.addScore(payload) : api.removeScore(payload)
			} catch (error) {
				console.warn(error)
			}
		}
	}

	const changeUserTickets = (value: number) => {
		if (user.value) {
			setUserProperty('tickets', userTickets.value + value)
			const payload: TicketsCreatePayload = {
				username: tgStore.username,
				tickets: Math.abs(value)
			}
			try {
				value > 0 ? api.addTickets(payload) : api.removeTickets(payload)
			} catch (error) {
				console.warn(error)
			}
		}
	}

	const loadUser = async () => {
		try {
			setIsLoading(true)
			const userResponse = await api.getUser({
				user_id: tgStore.userId,
				username: tgStore.username,
				ref_code: tgStore.startParam,
				premium: tgStore.isPremium
			})
			setUser(userResponse)
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
				mining_done: false,
				referals: [
					{
						username: 'name',
						refs: 10,
						bonus: 1000
					}
				]
			})
			setIsLoading(false)
		}
	}

	const claimRefBonus = async () => {
		try {
			await api.claimRefBonus({
				username: tgStore.username
			})
			setUserProperty(
				'referals',
				referals.value.map((el) => ({ ...el, bonus: 0 }))
			)
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
		const currentTimeInMs = new Date().getTime()
		if (!timeWhenClaimEnable.value) {
			setTimeDeforeMiningString(null)
		} else {
			const passedTimeInMs = timeWhenClaimEnable.value - currentTimeInMs
			setTimeDeforeMiningString(msToTime(passedTimeInMs))
			setTimeout(startUpdateMiningString, 60000) // раз в минуту
		}
	}

	return {
		user,
		userTickets,
		userScore,
		isLoading,
		referals,
		sumRefBonus,
		loadUser,
		changeUserScore,
		changeUserTickets,
		claimRefBonus,
		startMining,
		doneMining,
		timeBeforeMiningLeftString,
		startUpdateMiningString
	}
})
