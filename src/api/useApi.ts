import {
	Api as LegacyApi,
	type UserCreatePayload,
	type TasksCreatePayload,
	type ScoreCreatePayload,
	type TicketsCreatePayload,
	type TasksCreateBody,
	type RefClaimCreatePayload,
	type MiningCreatePayload,
	type MiningCreateBody,
	type DailyCreatePayload,
	type ReferalsCreatePayload,
	type FirstLoginCreatePayload,
	type AdvertisingSeeCreatePayload,
	type BoxesCreatePayload,
	type PushSeeCreatePayload,
	type SwitchRegionCreatePayload
} from './legacyGeneratedApi'

import {
	Api,
	type AbilityScoresDelta,
	type CreateUser,
	type LevelUpApiV1UsersUserIdLevelupPostPayload
} from './generatedApi'
import type {
	UserCreateResponse,
	TasksCreateResponse,
	ReferalsCreateResponse,
	UserStatsCreateResponse
} from './responseTypes'
import { handleHeader } from '@/utils/string-shift'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { envVariables } from '@/services/env'

export type IUpgradeAbilityRequest = {
	userId: number
} & Partial<AbilityScoresDelta>

export interface IUserIdRequest {
	userId: number
}

const legacyApiInstance = new LegacyApi({
	baseURL: envVariables.backendUrl
})

const apiInstance = new Api({
	baseURL: envVariables.backendUrl
})

export const useApi = () => {
	legacyApiInstance.instance.interceptors.request.use((config) => {
		!config.headers.get('google-metric-id') &&
			config.headers.set(
				'google-metric-id',
				handleHeader(
					useTgSdkStore()?.userId?.toString() ?? '',
					envVariables.symbolsShift,
					envVariables.symbolsQuantity
				)
			)
		return config
	})
	apiInstance.instance.interceptors.request.use((config) => {
		!config.headers.get('google-metric-id') &&
			config.headers.set(
				'google-metric-id',
				handleHeader(
					useTgSdkStore()?.userId?.toString() ?? '',
					envVariables.symbolsShift,
					envVariables.symbolsQuantity
				)
			)
		return config
	})

	const getUser = async (payload: UserCreatePayload): Promise<UserCreateResponse> => {
		return (await legacyApiInstance.gets.userCreate(payload)).data as unknown as UserCreateResponse
	}

	const getUserStats = async (payload: UserCreatePayload): Promise<UserStatsCreateResponse> => {
		return null as unknown as UserStatsCreateResponse
		// return (await legacyApiInstance.gets.userCreate(payload)).data as unknown as UserStatsCreateResponse
	}

	const getUserV2 = async (payload: { userId: string }) => {
		return (await apiInstance.api.getUserApiV1UsersUserIdGet(payload.userId)).data
	}

	const postUser = async (payload: CreateUser) => {
		return (await apiInstance.api.postUserApiV1UsersPost(payload)).data
	}

	const getTasks = async (payload: TasksCreatePayload): Promise<TasksCreateResponse> => {
		return (await legacyApiInstance.get.tasksCreate(payload)).data as unknown as TasksCreateResponse
	}

	const addScore = async (payload: ScoreCreatePayload) => {
		// return await legacyApiInstance.add.scoreCreate(payload)
	}

	const addTickets = async (payload: TicketsCreatePayload) => {
		// return await legacyApiInstance.add.ticketsCreate(payload)
	}

	const removeScore = async (payload: ScoreCreatePayload) => {
		// return await legacyApiInstance.remove.scoreCreate(payload)
	}

	const removeTickets = async (payload: TicketsCreatePayload) => {
		// return await legacyApiInstance.remove.ticketsCreate(payload)
	}

	const doneTask = async (payload: TasksCreateBody) => {
		return await legacyApiInstance.done.tasksCreate(payload)
	}

	const claimRefBonus = async (payload: RefClaimCreatePayload) => {
		return await legacyApiInstance.get.refClaimCreate(payload)
	}

	const startMining = async (payload: MiningCreatePayload) => {
		return await legacyApiInstance.start.miningCreate(payload)
	}

	const doneMining = async (payload: MiningCreateBody) => {
		// return await legacyApiInstance.done.miningCreate(payload)
	}

	const claimDailyReward = async (payload: DailyCreatePayload) => {
		// return await legacyApiInstance.done.dailyCreate(payload)
	}

	const getReferrals = async (payload: ReferalsCreatePayload): Promise<ReferalsCreateResponse> => {
		return (await legacyApiInstance.get.referalsCreate(payload))
			.data as unknown as ReferalsCreateResponse
	}

	const claimAdvertisingReward = async (payload: AdvertisingSeeCreatePayload) => {
		// return await legacyApiInstance.advertisingSee.advertisingSeeCreate(payload)
	}

	const doneFirstLogin = async (payload: FirstLoginCreatePayload) => {
		return await legacyApiInstance.done.firstLoginCreate(payload)
	}

	const claimBox = async (payload: BoxesCreatePayload) => {
		// return await legacyApiInstance.get.boxesCreate(payload)
	}

	const doneUpdateNotification = async (payload: PushSeeCreatePayload) => {
		return await legacyApiInstance.pushSee.pushSeeCreate(payload)
	}

	const doneEventNotification = async (payload: PushSeeCreatePayload) => {
		return await legacyApiInstance.dailyEvent.dailyEventCreate(payload)
	}

	const switchRegion = async (payload: SwitchRegionCreatePayload) => {
		return await legacyApiInstance.switchRegion.switchRegionCreate(payload)
	}

	// const startGame = async (payload: { user_id: number }) => {
	// 	// return await apiInstance.switchRegion.switchRegionCreate(payload)
	// }

	// const finishGame = async (payload: { user_id: number; claim: boolean }) => {
	// 	// return await apiInstance.switchRegion.switchRegionCreate(payload)
	// }

	// const finishSuperGame = async (payload: {
	// 	user_id: number
	// 	result: 'win' | 'nothing' | 'lose'
	// }) => {
	// 	// return await apiInstance.switchRegion.switchRegionCreate(payload)
	// }

	const loadPvpCharacter = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.getCharacterApiV1UsersUserIdCharacterGet(payload.userId)).data
	}

	const upgradePvpCharacterAbility = async (payload: IUpgradeAbilityRequest) => {
		const data: LevelUpApiV1UsersUserIdLevelupPostPayload = {
			combinations: payload.combinations,
			defence: payload.defence,
			speed: payload.speed,
			strength: payload.strength,
			weight: payload.weight
		}
		return (await apiInstance.api.levelUpApiV1UsersUserIdLevelupPost(payload.userId, data)).data
	}

	const searchPvpMatch = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.searchMatchApiV1UsersUserIdPvpPost(payload.userId)).data
	}

	const startPvpMatch = async (payload: { matchId: string }) => {
		return (await apiInstance.api.startMatchApiV1PvpMatchIdStartPost(payload.matchId)).data
	}

	const skipPvpMatch = async (payload: { matchId: string }) => {
		return (await apiInstance.api.skipMatchApiV1PvpMatchIdSkipPost(payload.matchId)).data
	}

	return {
		getUser,
		getUserV2,
		postUser,
		getUserStats,
		getTasks,
		addScore,
		addTickets,
		removeScore,
		removeTickets,
		doneTask,
		claimRefBonus,
		startMining,
		doneMining,
		claimDailyReward,
		getReferrals,
		doneFirstLogin,
		claimAdvertisingReward,
		claimBox,
		doneUpdateNotification,
		doneEventNotification,
		switchRegion,
		// startGame,
		// finishGame,
		// finishSuperGame
		loadPvpCharacter,
		upgradePvpCharacterAbility,
		searchPvpMatch,
		startPvpMatch,
		skipPvpMatch
	}
}
