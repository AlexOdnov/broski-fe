import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import { useApi } from '@/api/useApi'
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

export const usePvpStore = defineStore('pvp', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()
	const commonStore = useCommonStore()
	const userStore = useUserStore()

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

	const setPvpCharacterAbilities = (abilities: AbilityScores) => {
		if (pvpCharacter.value) {
			setPvpCharacter({
				...pvpCharacter.value,
				abilities
			})
		}
	}

	const setEnergyTimer = (value: string) => {
		energyTimerInterval.value && clearInterval(energyTimerInterval.value)
		setEnergyTimerValue(Temporal.Duration.from(value))

		energyTimerInterval.value = setInterval(() => {
			if (energyTimer.value) {
				setEnergyTimerValue(energyTimer.value.add({ minutes: -1 }))
				if (energyTimer.value.minutes === 0) {
					loadPvpCharacter()
				}
			}
		}, 1000 * 60)
	}

	const timeToRestoreEnergy = computed(() =>
		energyTimer.value?.minutes ? `${energyTimer.value.minutes}m` : '0m'
	)

	const loadPvpCharacter = async (withLoader = false) => {
		try {
			withLoader && commonStore.setIsLoading(true)
			setIsLoading(true)
			const response = await api.loadPvpCharacter({ userId: `${tgStore.userId}` })
			setPvpCharacter(response)
			setEnergyTimer(response.energy.time_to_restore)
		} catch (error) {
			console.warn(error)
		} finally {
			withLoader && commonStore.setIsLoading(false)
			setIsLoading(false)
		}
	}

	const upgradePvpCharacterAbility = async (ability: Partial<AbilityScoresDelta>) => {
		try {
			setIsLoading(true)
			const response = await api.upgradePvpCharacterAbility({
				userId: `${tgStore.userId}`,
				...ability
			})
			setPvpCharacterAbilities(response)
		} catch (error) {
			console.warn(error)
		} finally {
			setIsLoading(false)
		}
	}

	const searchPvpOpponent = async () => {
		try {
			setIsLoading(true)
			const response = await api.searchPvpMatch({ userId: `${tgStore.userId}` })
			setPvpMatch(response)
			userStore.loadUser()
		} catch (error) {
			console.warn(error)
		} finally {
			setIsLoading(false)
		}
	}

	const startPvpMatch = async () => {
		if (pvpMatch.value) {
			try {
				setIsLoading(true)
				const response = await api.startPvpMatch({ matchId: pvpMatch.value?.match_id })
				setPvpMatchResult(response)
				userStore.loadUser()
			} catch (error) {
				console.warn(error)
			} finally {
				setIsLoading(false)
			}
		}
	}

	return {
		isLoading,
		pvpCharacter,
		pvpCharacterAbilities,
		pvpMatch,
		pvpMatchResult,
		timeToRestoreEnergy,
		loadPvpCharacter,
		upgradePvpCharacterAbility,
		searchPvpOpponent,
		resetPvpMatch,
		resetPvpMatchResult,
		startPvpMatch
	}
})
