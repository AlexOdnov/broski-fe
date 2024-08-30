import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { UserCreateResponse } from '@/api/responseTypes'
import { useApi } from '@/api/useApi'
import { useTgSdkStore } from './tg-sdk'
import type { ScoreCreatePayload, TicketsCreatePayload } from '@/api/generatedApi'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [timeBeforeMiningLeftString, setTimeDeforeMiningString] = useState<string | null>(null)

	const [user, setUser] = useState<UserCreateResponse | null>(null)
	const [timeWhenUserUpdated, setTimeWhenUserUpdated] = useState<Date | null>(null)

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
			setTimeWhenUserUpdated(new Date())
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
				ref_code: tgStore.startParam
			})
			setUser(userResponse)
		} catch (error) {
			console.warn(error)
		} finally {
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

	const lastUserMiningTimeInMs = computed(() => new Date(user.value?.start_mining ?? 0).getTime())

	const startUpdateMiningString = () => {
		const currentTimeInMs = new Date().getTime()
		const passedTimeInMs = currentTimeInMs - lastUserMiningTimeInMs.value
		if( passedTimeInMs  >= 1000 * 60 * 60 * 6) {
			setTimeDeforeMiningString(msToTime(passedTimeInMs))
			setTimeout(startUpdateMiningString, 60000) // раз в минуту
		} else {
			setTimeDeforeMiningString(null)
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
		timeBeforeMiningLeftString,
		startUpdateMiningString,
	}
})
