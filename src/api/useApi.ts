import {
	Api,
	type AbilityScoresDelta,
	type CreateUser,
	type GetUserReferralsApiV1UsersUserIdReferralsGetParams,
	type LevelUpApiV1UsersUserIdLevelupPostPayload,
	type RegionRequest,
	type TaskRequest
} from './generatedApi'
import { handleHeader } from '@/utils/string-shift'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { envVariables } from '@/services/env'

export interface IUserIdRequest {
	userId: number
}

export type IUpgradeAbilityRequest = IUserIdRequest & Partial<AbilityScoresDelta>

export type IDoneTaskRequest = IUserIdRequest & TaskRequest

export type ISwitchRegionRequest = IUserIdRequest & RegionRequest

const apiInstance = new Api({
	baseURL: envVariables.backendUrl
})

export const useApi = () => {
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

	const getUser = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.getUserApiV1UsersUserIdGet(payload.userId)).data
	}

	const postUser = async (payload: CreateUser) => {
		return (await apiInstance.api.postUserApiV1UsersPost(payload)).data
	}

	const getTasks = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.getTasksApiV1UsersUserIdTasksGet(payload.userId)).data
	}

	const doneTask = async (payload: IDoneTaskRequest) => {
		return (
			await apiInstance.api.postTaskApiV1UsersUserIdCompleteTaskPost(payload.userId, {
				task_id: payload.task_id
			})
		).data
	}

	const claimRefBonus = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.refClaimApiV1UsersUserIdRefClaimPost(payload.userId)).data
	}

	const claimDailyReward = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.doneDailyApiV1UsersUserIdDoneDailyPost(payload.userId)).data
	}

	const getReferrals = async (payload: GetUserReferralsApiV1UsersUserIdReferralsGetParams) => {
		return (await apiInstance.api.getUserReferralsApiV1UsersUserIdReferralsGet(payload)).data
	}

	const claimAdvertisingReward = async (payload: IUserIdRequest) => {
		// return await legacyApiInstance.advertisingSee.advertisingSeeCreate(payload)
	}

	const doneFirstLogin = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.firstLoginApiV1UsersUserIdFirstLoginPost(payload.userId)).data
	}

	const doneUpdateNotification = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.seePushApiV1UsersUserIdSeePushPost(payload.userId)).data
	}

	const doneEventNotification = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.dailyEventApiV1UsersUserIdDailyEventPost(payload.userId)).data
	}

	const switchRegion = async (payload: ISwitchRegionRequest) => {
		return (
			await apiInstance.api.switchRegionApiV1UsersUserIdSwitchRegionPost(payload.userId, {
				region: payload.region
			})
		).data
	}

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

	const startPvpMatch = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.startMatchApiV1UsersUserIdStartPvpPost(payload.userId)).data
	}

	const skipPvpMatch = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.skipMatchApiV1UsersUserIdSkipPvpPost(payload.userId)).data
	}

	const getPrizes = async () => {
		return (await apiInstance.api.getPrizesApiV1PrizesGet()).data
	}

	const openLootbox = async (payload: IUserIdRequest) => {
		return (await apiInstance.api.spinApiV1UsersUserIdSpinPost(payload.userId)).data
	}

	return {
		getUser,
		postUser,
		getTasks,
		doneTask,
		claimRefBonus,
		claimDailyReward,
		claimAdvertisingReward,
		getReferrals,
		doneFirstLogin,
		doneUpdateNotification,
		doneEventNotification,
		switchRegion,
		loadPvpCharacter,
		upgradePvpCharacterAbility,
		searchPvpMatch,
		startPvpMatch,
		skipPvpMatch,
		getPrizes,
		openLootbox
	}
}
