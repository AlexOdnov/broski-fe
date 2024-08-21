import {
	Api,
	type UserCreatePayload,
	type TasksCreatePayload,
	type ScoreCreatePayload,
	type TicketsCreatePayload,
	type TasksCreateBody,
	type RefClaimCreatePayload
} from './generatedApi'
import type { UserCreateResponse, TasksCreateResponse } from './responseTypes'

const apiInstance = new Api({
	baseURL: window.appConfig.baseUrl
})

export const useApi = () => {
	const getUser = async (payload: UserCreatePayload): Promise<UserCreateResponse> => {
		return (await apiInstance.get.userCreate(payload)) as unknown as UserCreateResponse
	}

	const getTasks = async (payload: TasksCreatePayload): Promise<TasksCreateResponse> => {
		return (await apiInstance.get.tasksCreate(payload)) as unknown as TasksCreateResponse
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

	return {
		getUser,
		getTasks,
		addScore,
		addTickets,
		removeScore,
		removeTickets,
		doneTask,
		claimRefBonus
	}
}
