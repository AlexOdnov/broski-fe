import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import { useApi } from '@/api/useApi'
import { useTgSdkStore } from './tg-sdk'
import {
	type CharacterProfile,
	type PVPMatch,
	type PVPMatchResult
} from '@/api/newGeneratedApi'

export const usePvpStore = defineStore('pvp', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()

	const [character, setCharacter] = useState<CharacterProfile | null>(null)
	const [pvpMatch, setPvpMatch] = useState<PVPMatch | null>(null)
	const [matchResult, setMatchResult] = useState<PVPMatchResult | null>(null)
	const loadCharacter = async () => {
		try {
			const char = await api.loadCharacter(tgStore.userId.toString())
			setCharacter(char)
		} catch (error) {
			console.error(error)
		}
	}
	const findMath = async () => {
		try {
			const match = await api.findPvpMatch(tgStore.userId.toString())
			setPvpMatch(match)
		} catch (error) {
			console.error(error)
		}
	}
	const startPvpMatch = async () => {
		try {
			if (!pvpMatch.value) {
				throw new Error('first need find match')
			}
			const result = await api.startPvpMatch(pvpMatch.value.match_id)
			setMatchResult(result)
		} catch (error) {
			console.error(error)
		}
	}
	return {
		character,
		loadCharacter,
		pvpMatch,
		findMath,
		startPvpMatch,
		matchResult,
	}
})
