import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import { checkErrorMessage, useApi } from '@/api/useApi'
import { useTgSdkStore } from './tg-sdk'
import { computed, ref } from 'vue'
import type {
	AbilityScores,
	AbilityScoresDelta,
	CharacterProfile,
	PVPMatch,
	PVPMatchResult
} from '@/api/generatedApi'
import { useCommonStore } from './common'
import { useUserStore } from './user'
import { Temporal } from 'temporal-polyfill'
import { dropConfetti } from '@/utils/drop-confetti'
import { useSentry } from '@/services/sentry'

export type AbilityType = keyof AbilityScores

export const usePvpStore = defineStore('pvp', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()
	const commonStore = useCommonStore()
	const userStore = useUserStore()
	const sentry = useSentry()

	const loadingState = ref(0)
	const [pvpCharacter, setPvpCharacter] = useState<CharacterProfile | null>(null)
	const [pvpMatch, setPvpMatch, resetPvpMatch] = useState<PVPMatch | null>(null)
	const [pvpMatchResult, setPvpMatchResult, resetPvpMatchResult] = useState<PVPMatchResult | null>(
		null
	)
	const energyTimerInterval = ref<ReturnType<typeof setInterval> | null>(null)
	const [energyTimer, setEnergyTimerValue] = useState<Temporal.Duration | null>(null)

	const setIsLoading = (isLoading: boolean) =>
		isLoading ? (loadingState.value += 1) : (loadingState.value -= 1)

	const isLoading = computed(() => loadingState.value > 0)

	const pvpCharacterAbilities = computed<AbilityScores>(() => ({
		combinations: pvpCharacter.value?.abilities.combinations ?? 1,
		defence: pvpCharacter.value?.abilities.defence ?? 1,
		speed: pvpCharacter.value?.abilities.speed ?? 1,
		strength: pvpCharacter.value?.abilities.strength ?? 1,
		weight: pvpCharacter.value?.abilities.weight ?? 1
	}))

	const timeToRestoreEnergy = computed(() =>
		energyTimer.value && energyTimer.value?.total({ unit: 'seconds' }) > 0
			? `${energyTimer.value.minutes}:${energyTimer.value.seconds.toLocaleString('en-US', {
					minimumIntegerDigits: 2,
					useGrouping: false
				})}`
			: ''
	)

	const isCharacterPremium = computed(() => Boolean(pvpCharacter.value?.premium?.active))

	const setPvpCharacterAbilities = (abilities: AbilityScores) => {
		if (pvpCharacter.value) {
			setPvpCharacter({
				...pvpCharacter.value,
				abilities
			})
		}
	}

	const setPvpCharacterPower = (power: number) => {
		if (pvpCharacter.value) {
			setPvpCharacter({
				...pvpCharacter.value,
				power
			})
		}
	}

	const setEnergyTimer = (value: string) => {
		energyTimerInterval.value && clearInterval(energyTimerInterval.value)
		setEnergyTimerValue(Temporal.Duration.from(value))

		if (energyTimer.value && energyTimer.value.total({ unit: 'seconds' })) {
			energyTimerInterval.value = setInterval(() => {
				if (energyTimer.value) {
					setEnergyTimerValue(energyTimer.value.subtract({ seconds: 1 }))
					if (energyTimer.value.total({ unit: 'seconds' }) <= 0) {
						loadPvpCharacter()
					}
				}
			}, 1000)
		}
	}

	const loadPvpCharacter = async (withLoader = false) => {
		try {
			withLoader && commonStore.setIsLoading(true)
			setIsLoading(true)
			const response = await api.loadPvpCharacter({ userId: tgStore.userId })
			if (
				response?.level &&
				pvpCharacter.value?.level &&
				response.level > pvpCharacter.value.level
			) {
				await dropConfetti()
			}
			setPvpCharacter(response)
			setEnergyTimer(response.energy.time_to_restore)
		} catch (error) {
			console.warn(error)
			sentry.captureNetworkException(error)
		} finally {
			withLoader && commonStore.setIsLoading(false)
			setIsLoading(false)
		}
	}

	const upgradePvpCharacterAbility = async (ability: Partial<AbilityScoresDelta>) => {
		try {
			setIsLoading(true)
			const response = await api.upgradePvpCharacterAbility({
				userId: tgStore.userId,
				...ability
			})
			setPvpCharacterAbilities(response.abilities)
			setPvpCharacterPower(response.power)
			userStore.loadUser()
		} catch (error) {
			console.warn(error)
			if (checkErrorMessage(error, ['insufficient coins'])) {
				userStore.loadUser()
			} else {
				sentry.captureNetworkException(error)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const searchPvpOpponent = async () => {
		try {
			setIsLoading(true)
			commonStore.setDisableNavigation(true)
			const response = await api.searchPvpMatch({ userId: tgStore.userId })
			setPvpMatch(response)
			userStore.loadUser()
		} catch (error) {
			console.warn(error)
			sentry.captureNetworkException(error)
			commonStore.setDisableNavigation(false)
		} finally {
			setIsLoading(false)
		}
	}

	const startPvpMatch = async () => {
		if (pvpMatch.value) {
			try {
				setIsLoading(true)
				const response = await api.startPvpMatch({ userId: tgStore.userId })
				setPvpMatchResult(response)
				loadPvpCharacter()
			} catch (error) {
				console.warn(error)
				if (checkErrorMessage(error, ['match not found', 'insufficient energy'])) {
					clearPvp()
				} else {
					sentry.captureNetworkException(error)
				}
			} finally {
				setIsLoading(false)
			}
		}
	}

	const skipPvpMatch = async () => {
		if (pvpMatch.value) {
			try {
				setIsLoading(true)
				const response = await api.skipPvpMatch({ userId: tgStore.userId })
				setPvpMatch({ ...pvpMatch.value, opponent: response })
				userStore.loadUser()
			} catch (error) {
				console.warn(error)
				if (checkErrorMessage(error, ['match not found', 'insufficient coins'])) {
					clearPvp()
				} else {
					sentry.captureNetworkException(error)
				}
			} finally {
				setIsLoading(false)
			}
		}
	}

	const clearPvp = () => {
		userStore.loadUser()
		loadPvpCharacter()
		resetPvpMatch()
		resetPvpMatchResult()
		commonStore.setDisableNavigation(false)
	}

	return {
		isLoading,
		pvpCharacter,
		pvpCharacterAbilities,
		isCharacterPremium,
		pvpMatch,
		pvpMatchResult,
		timeToRestoreEnergy,
		loadPvpCharacter,
		upgradePvpCharacterAbility,
		searchPvpOpponent,
		resetPvpMatch,
		resetPvpMatchResult,
		startPvpMatch,
		skipPvpMatch,
		clearPvp
	}
})
