import { envVariables } from '@/services/env'
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
} from './generatedApi'

import { Api, type CreateUser } from './newGeneratedApi'
import type {
	UserCreateResponse,
	TasksCreateResponse,
	ReferalsCreateResponse,
	UserStatsCreateResponse
} from './responseTypes'

const legacyApiInstance = new LegacyApi({
	baseURL: envVariables.backendUrl
})

const apiInstance = new Api({
	baseURL: envVariables.backendUrl
})

export const useApi = () => {
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
		return await legacyApiInstance.add.scoreCreate(payload)
	}

	const addTickets = async (payload: TicketsCreatePayload) => {
		return await legacyApiInstance.add.ticketsCreate(payload)
	}

	const removeScore = async (payload: ScoreCreatePayload) => {
		return await legacyApiInstance.remove.scoreCreate(payload)
	}

	const removeTickets = async (payload: TicketsCreatePayload) => {
		return await legacyApiInstance.remove.ticketsCreate(payload)
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
		return await legacyApiInstance.done.miningCreate(payload)
	}

	const claimDailyReward = async (payload: DailyCreatePayload) => {
		return await legacyApiInstance.done.dailyCreate(payload)
	}

	const getReferrals = async (payload: ReferalsCreatePayload): Promise<ReferalsCreateResponse> => {
		return (await legacyApiInstance.get.referalsCreate(payload))
			.data as unknown as ReferalsCreateResponse
	}

	const claimAdvertisingReward = async (payload: AdvertisingSeeCreatePayload) => {
		return await legacyApiInstance.advertisingSee.advertisingSeeCreate(payload)
	}

	const doneFirstLogin = async (payload: FirstLoginCreatePayload) => {
		return await legacyApiInstance.done.firstLoginCreate(payload)
	}

	const claimBox = async (payload: BoxesCreatePayload) => {
		return await legacyApiInstance.get.boxesCreate(payload)
	}

	const doneUpdateNotification = async (payload: PushSeeCreatePayload) => {
		return await legacyApiInstance.pushSee.pushSeeCreate(payload)
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

	const loadCharacter = async (userId: string) => {
		return (await apiInstance.api.getCharacterApiV1UsersUserIdCharacterGet(userId)).data
	}
	const findPvpMatch = async (userId: string) => {
		return (await apiInstance.api.searchMatchApiV1UsersUserIdPvpPost(userId)).data
	}
	const startPvpMatch = async (matchId: string) => {
		return (await apiInstance.api.startMatchApiV1PvpMatchIdStartPost(matchId)).data
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
		switchRegion,
		// startGame,
		// finishGame,
		// finishSuperGame
		loadCharacter,
		findPvpMatch,
		startPvpMatch,
	}
}
