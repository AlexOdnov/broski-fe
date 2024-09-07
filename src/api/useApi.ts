import {
	Api,
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
	type FirstLoginCreatePayload
} from './generatedApi'
import type {
	UserCreateResponse,
	TasksCreateResponse,
	ReferalsCreateResponse
} from './responseTypes'

const apiInstance = new Api({
	baseURL: window.appConfig.baseUrl
})

export const useApi = () => {
	const getUser = async (payload: UserCreatePayload): Promise<UserCreateResponse> => {
		return (await apiInstance.get.userCreate(payload)).data as unknown as UserCreateResponse
	}

	const getTasks = async (payload: TasksCreatePayload): Promise<TasksCreateResponse> => {
		return (await apiInstance.get.tasksCreate(payload)).data as unknown as TasksCreateResponse
	}

	const addScore = async (payload: ScoreCreatePayload) => {
		return await apiInstance.add.scoreCreate(payload)
	}

	const addTickets = async (payload: TicketsCreatePayload) => {
		return await apiInstance.add.ticketsCreate(payload)
	}

	const removeScore = async (payload: ScoreCreatePayload) => {
		return await apiInstance.remove.scoreCreate(payload)
	}

	const removeTickets = async (payload: TicketsCreatePayload) => {
		return await apiInstance.remove.ticketsCreate(payload)
	}

	const doneTask = async (payload: TasksCreateBody) => {
		return await apiInstance.done.tasksCreate(payload)
	}

	const claimRefBonus = async (payload: RefClaimCreatePayload) => {
		return await apiInstance.get.refClaimCreate(payload)
	}

	const startMining = async (payload: MiningCreatePayload) => {
		return await apiInstance.start.miningCreate(payload)
	}

	const doneMining = async (payload: MiningCreateBody) => {
		return await apiInstance.done.miningCreate(payload)
	}

	const claimDailyReward = async (payload: DailyCreatePayload) => {
		return await apiInstance.done.dailyCreate(payload)
	}

	const getReferrals = async (payload: ReferalsCreatePayload): Promise<ReferalsCreateResponse> => {
		return (await apiInstance.get.referalsCreate(payload)).data as unknown as ReferalsCreateResponse
	}

	const doneFirstLogin = async (payload: FirstLoginCreatePayload) => {
		return await apiInstance.done.firstLoginCreate(payload)
	}

	return {
		getUser,
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
		doneFirstLogin
	}
}
