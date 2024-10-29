/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AbilityScores */
export interface AbilityScores {
	/** Strength */
	strength: number
	/** Defence */
	defence: number
	/** Speed */
	speed: number
	/** Weight */
	weight: number
	/** Combinations */
	combinations: number
}

/** AbilityScoresDelta */
export interface AbilityScoresDelta {
	/** Strength */
	strength?: number | null
	/** Defence */
	defence?: number | null
	/** Speed */
	speed?: number | null
	/** Weight */
	weight?: number | null
	/** Combinations */
	combinations?: number | null
}

/** CharacterEnergy */
export interface CharacterEnergy {
	/** Remaining */
	remaining: number
	/** Maximum */
	maximum: number
	/**
	 * Time To Restore
	 * @format duration
	 */
	time_to_restore: string
}

/** CharacterExperience */
export interface CharacterExperience {
	/** Current Experience */
	current_experience: number
	/** Maximum Experience */
	maximum_experience: number
}

/** CharacterProfile */
export interface CharacterProfile {
	abilities: AbilityScores
	energy: CharacterEnergy
	/** Level */
	level: number
	experience: CharacterExperience
	/** Power */
	power: number
	premium?: CharacterProfilePremium | null
	stats?: PVPStats | null
}

/** CharacterProfilePremium */
export interface CharacterProfilePremium {
	/** Active */
	active: boolean
	/**
	 * Until
	 * @format date
	 */
	until: string
}

/** CreateUser */
export interface CreateUser {
	/** Username */
	username: string
	/** User Id */
	user_id: number
	/** Ref Code */
	ref_code?: number | null
	/** Premium */
	premium?: boolean | null
}

/** GetEnergy */
export interface GetEnergy {
	/** Energy */
	energy: number
}

/** GetEnergyResponse */
export interface GetEnergyResponse {
	/** Link */
	link: string
}

/** HTTPValidationError */
export interface HTTPValidationError {
	/** Detail */
	detail?: ValidationError[]
}

/** LegacyUser */
export interface LegacyUser {
	/** Username */
	username: string
	/** Score */
	score: number
	/** Left Mining */
	left_mining: string
	/** Mining Claim */
	mining_claim: boolean
	/** Ref Code */
	ref_code: string
	/** Position */
	position: number
	/** Tickets */
	tickets: number
	/** Boxes */
	boxes: number
	/** Daily Stric */
	daily_stric: number
	/** Daily Claim */
	daily_claim: boolean
	/** First Login */
	first_login: boolean
	/** Region */
	region: string
	/** First Game */
	first_game: boolean
	/** Advertising Limit */
	advertising_limit: number
	/** Advertising Total */
	advertising_total: number
	/** Ton Balanse */
	ton_balanse: number
	/** Push See */
	push_see: boolean
	/** Daily Event */
	daily_event: boolean
}

/** LevelupResponse */
export interface LevelupResponse {
	abilities: AbilityScores
	/** Power */
	power: number
}

/** MatchCompetitioner */
export interface MatchCompetitioner {
	/** User Id */
	user_id: number
	/** Username */
	username: string
	/** Level */
	level: number
	/** Power */
	power: number
	abilities: AbilityScores
	/** Premium */
	premium: boolean
	stats?: PVPStats | null
}

/** MatchLoot */
export interface MatchLoot {
	/** Coins */
	coins: number
}

/** MatchResult */
export enum MatchResult {
	Win = 'win',
	Lose = 'lose'
}

/** PVPMatch */
export interface PVPMatch {
	/**
	 * Match Id
	 * @format uuid
	 */
	match_id: string
	player: MatchCompetitioner
	opponent: MatchCompetitioner
}

/** PVPMatchResult */
export interface PVPMatchResult {
	result: MatchResult
	loot?: MatchLoot | null
}

/** PVPStats */
export interface PVPStats {
	/** Total */
	total: number
	/** Won */
	won: number
	/** Loot */
	loot: number
}

/** PostTaskRequest */
export interface PostTaskRequest {
	/** User Id */
	user_id: number
	/** Task Id */
	task_id: number
}

/** Prize */
export interface Prize {
	/** Idx */
	idx: number
	/** Item */
	item: string
	/** Probability */
	probability: number
	/** Rarity */
	rarity: string
	/** Description */
	description: string
	/** Image */
	image: string
}

/** Referral */
export interface Referral {
	/** Username */
	username: string
	/** Refs */
	refs: number
	/** Bonus */
	bonus: number
	/** Reward */
	reward: number
}

/** RegionRequest */
export interface RegionRequest {
	/** Region */
	region: string
}

/** SpinResult */
export interface SpinResult {
	/** Result */
	result: string
}

/** Task */
export interface Task {
	/** Id */
	id: number
	/** Title */
	title: string
	/** Points */
	points: number
	/** Tickets */
	tickets: number
	/** Experience */
	experience: number
	/** Duration */
	duration: string
	/** Links */
	links: string
	/** Complete */
	complete: boolean
	/** Description */
	description: string
	/** Image */
	image: string
	/** Priority */
	priority: number
}

/** TaskRequest */
export interface TaskRequest {
	/** Task Id */
	task_id: number
}

/** Tasks */
export interface Tasks {
	/** Tasks */
	tasks: Task[]
}

/** User */
export interface User {
	/** Score */
	score: number
	/** Tickets */
	tickets: number
	/** Boxes */
	boxes: number
	/** Ton Balance */
	ton_balance: number
	mining: UserMining
	advertising: UserAdvertising
}

/** UserAdvertising */
export interface UserAdvertising {
	/** Limit */
	limit: number
	/** Total */
	total: number
}

/** UserMining */
export interface UserMining {
	/** Left */
	left: string
	/** Claim */
	claim: boolean
}

/** UserReferrals */
export interface UserReferrals {
	/** Username */
	username: string
	/** Referrals */
	referrals: Referral[]
	/** Total Referrals */
	total_referrals: number
	/** Total Pages */
	total_pages: number
	/** Current Page */
	current_page: number
	/** Total Score */
	total_score: number
}

/** ValidationError */
export interface ValidationError {
	/** Location */
	loc: (string | number)[]
	/** Message */
	msg: string
	/** Error Type */
	type: string
}

/** Delta */
export type LevelUpApiV1UsersUserIdLevelupPostPayload = AbilityScoresDelta | null

export interface GetUserReferralsApiV1UsersUserIdReferralsGetParams {
	/**
	 * Page
	 * @default 1
	 */
	page?: number
	/**
	 * Per Page
	 * @default 10
	 */
	per_page?: number
	/** User Id */
	userId: number
}

import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	HeadersDefaults,
	ResponseType
} from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
	extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean
	/** request path */
	path: string
	/** content type of request body */
	type?: ContentType
	/** query params */
	query?: QueryParamsType
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseType
	/** request body */
	body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown>
	extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
	secure?: boolean
	format?: ResponseType
}

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
	public instance: AxiosInstance
	private securityData: SecurityDataType | null = null
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
	private secure?: boolean
	private format?: ResponseType

	constructor({
		securityWorker,
		secure,
		format,
		...axiosConfig
	}: ApiConfig<SecurityDataType> = {}) {
		this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
		this.secure = secure
		this.format = format
		this.securityWorker = securityWorker
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data
	}

	protected mergeRequestParams(
		params1: AxiosRequestConfig,
		params2?: AxiosRequestConfig
	): AxiosRequestConfig {
		const method = params1.method || (params2 && params2.method)

		return {
			...this.instance.defaults,
			...params1,
			...(params2 || {}),
			headers: {
				...((method &&
					this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
					{}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {})
			}
		}
	}

	protected stringifyFormItem(formItem: unknown) {
		if (typeof formItem === 'object' && formItem !== null) {
			return JSON.stringify(formItem)
		} else {
			return `${formItem}`
		}
	}

	protected createFormData(input: Record<string, unknown>): FormData {
		if (input instanceof FormData) {
			return input
		}
		return Object.keys(input || {}).reduce((formData, key) => {
			const property = input[key]
			const propertyContent: any[] = property instanceof Array ? property : [property]

			for (const formItem of propertyContent) {
				const isFileType = formItem instanceof Blob || formItem instanceof File
				formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
			}

			return formData
		}, new FormData())
	}

	public request = async <T = any, _E = any>({
		secure,
		path,
		type,
		query,
		format,
		body,
		...params
	}: FullRequestParams): Promise<AxiosResponse<T>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{}
		const requestParams = this.mergeRequestParams(params, secureParams)
		const responseFormat = format || this.format || undefined

		if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
			body = this.createFormData(body as Record<string, unknown>)
		}

		if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
			body = JSON.stringify(body)
		}

		return this.instance.request({
			...requestParams,
			headers: {
				...(requestParams.headers || {}),
				...(type ? { 'Content-Type': type } : {})
			},
			params: query,
			responseType: responseFormat,
			data: body,
			url: path
		})
	}
}

/**
 * @title FastAPI
 * @version 0.1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	api = {
		/**
		 * No description
		 *
		 * @tags pvp
		 * @name GetCharacterApiV1UsersUserIdCharacterGet
		 * @summary Get Character
		 * @request GET:/api/v1/users/{user_id}/character
		 */
		getCharacterApiV1UsersUserIdCharacterGet: (userId: number, params: RequestParams = {}) =>
			this.request<CharacterProfile, HTTPValidationError>({
				path: `/api/v1/users/${userId}/character`,
				method: 'GET',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags pvp
		 * @name LevelUpApiV1UsersUserIdLevelupPost
		 * @summary Level Up
		 * @request POST:/api/v1/users/{user_id}/levelup
		 */
		levelUpApiV1UsersUserIdLevelupPost: (
			userId: number,
			data: LevelUpApiV1UsersUserIdLevelupPostPayload,
			params: RequestParams = {}
		) =>
			this.request<LevelupResponse, HTTPValidationError>({
				path: `/api/v1/users/${userId}/levelup`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags pvp
		 * @name SearchMatchApiV1UsersUserIdPvpPost
		 * @summary Search Match
		 * @request POST:/api/v1/users/{user_id}/pvp
		 */
		searchMatchApiV1UsersUserIdPvpPost: (userId: number, params: RequestParams = {}) =>
			this.request<PVPMatch, HTTPValidationError>({
				path: `/api/v1/users/${userId}/pvp`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags pvp
		 * @name SkipMatchApiV1PvpMatchIdSkipPost
		 * @summary Skip Match
		 * @request POST:/api/v1/pvp/{match_id}/skip
		 */
		skipMatchApiV1PvpMatchIdSkipPost: (matchId: string, params: RequestParams = {}) =>
			this.request<MatchCompetitioner, HTTPValidationError>({
				path: `/api/v1/pvp/${matchId}/skip`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags pvp
		 * @name StartMatchApiV1PvpMatchIdStartPost
		 * @summary Start Match
		 * @request POST:/api/v1/pvp/{match_id}/start
		 */
		startMatchApiV1PvpMatchIdStartPost: (matchId: string, params: RequestParams = {}) =>
			this.request<PVPMatchResult, HTTPValidationError>({
				path: `/api/v1/pvp/${matchId}/start`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name GetTasksApiV1UsersUserIdTasksGet
		 * @summary Get Tasks
		 * @request GET:/api/v1/users/{user_id}/tasks
		 */
		getTasksApiV1UsersUserIdTasksGet: (userId: number, params: RequestParams = {}) =>
			this.request<Tasks, HTTPValidationError>({
				path: `/api/v1/users/${userId}/tasks`,
				method: 'GET',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name PostTaskApiV1TasksPost
		 * @summary Post Task
		 * @request POST:/api/v1/tasks
		 */
		postTaskApiV1TasksPost: (data: PostTaskRequest, params: RequestParams = {}) =>
			this.request<any, HTTPValidationError>({
				path: `/api/v1/tasks`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name FirstLoginApiV1UsersUserIdFirstLoginPost
		 * @summary First Login
		 * @request POST:/api/v1/users/{user_id}/first-login
		 */
		firstLoginApiV1UsersUserIdFirstLoginPost: (userId: number, params: RequestParams = {}) =>
			this.request<any, HTTPValidationError>({
				path: `/api/v1/users/${userId}/first-login`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name SwitchRegionApiV1UsersUserIdSwitchRegionPost
		 * @summary Switch Region
		 * @request POST:/api/v1/users/{user_id}/switch-region
		 */
		switchRegionApiV1UsersUserIdSwitchRegionPost: (
			userId: number,
			data: RegionRequest,
			params: RequestParams = {}
		) =>
			this.request<any, HTTPValidationError>({
				path: `/api/v1/users/${userId}/switch-region`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name SeePushApiV1UsersUserIdSeePushPost
		 * @summary See Push
		 * @request POST:/api/v1/users/{user_id}/see-push
		 */
		seePushApiV1UsersUserIdSeePushPost: (userId: number, params: RequestParams = {}) =>
			this.request<any, HTTPValidationError>({
				path: `/api/v1/users/${userId}/see-push`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name DailyEventApiV1UsersUserIdDailyEventPost
		 * @summary Daily Event
		 * @request POST:/api/v1/users/{user_id}/daily-event
		 */
		dailyEventApiV1UsersUserIdDailyEventPost: (userId: number, params: RequestParams = {}) =>
			this.request<any, HTTPValidationError>({
				path: `/api/v1/users/${userId}/daily-event`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name DoneDailyApiV1UsersUserIdDoneDailyPost
		 * @summary Done Daily
		 * @request POST:/api/v1/users/{user_id}/done-daily
		 */
		doneDailyApiV1UsersUserIdDoneDailyPost: (userId: number, params: RequestParams = {}) =>
			this.request<any, HTTPValidationError>({
				path: `/api/v1/users/${userId}/done-daily`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name CheckTaskApiV1UsersUserIdCheckTaskPost
		 * @summary Check Task
		 * @request POST:/api/v1/users/{user_id}/check-task
		 */
		checkTaskApiV1UsersUserIdCheckTaskPost: (
			userId: number,
			data: TaskRequest,
			params: RequestParams = {}
		) =>
			this.request<any, HTTPValidationError>({
				path: `/api/v1/users/${userId}/check-task`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags users
		 * @name GetUserApiV1UsersUserIdGet
		 * @summary Get User
		 * @request GET:/api/v1/users/{user_id}
		 */
		getUserApiV1UsersUserIdGet: (userId: number, params: RequestParams = {}) =>
			this.request<User, HTTPValidationError>({
				path: `/api/v1/users/${userId}`,
				method: 'GET',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags users
		 * @name PostUserApiV1UsersPost
		 * @summary Post User
		 * @request POST:/api/v1/users
		 */
		postUserApiV1UsersPost: (data: CreateUser, params: RequestParams = {}) =>
			this.request<LegacyUser, HTTPValidationError>({
				path: `/api/v1/users`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags users
		 * @name GetUserReferralsApiV1UsersUserIdReferralsGet
		 * @summary Get User Referrals
		 * @request GET:/api/v1/users/{user_id}/referrals
		 */
		getUserReferralsApiV1UsersUserIdReferralsGet: (
			{ userId, ...query }: GetUserReferralsApiV1UsersUserIdReferralsGetParams,
			params: RequestParams = {}
		) =>
			this.request<UserReferrals, HTTPValidationError>({
				path: `/api/v1/users/${userId}/referrals`,
				method: 'GET',
				query: query,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name RefClaimApiV1UsersUserIdRefClaimPost
		 * @summary Ref Claim
		 * @request POST:/api/v1/users/{user_id}/ref-claim
		 */
		refClaimApiV1UsersUserIdRefClaimPost: (userId: number, params: RequestParams = {}) =>
			this.request<any, HTTPValidationError>({
				path: `/api/v1/users/${userId}/ref-claim`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags users
		 * @name GetStarsLinkApiV1StarsPost
		 * @summary Get Stars Link
		 * @request POST:/api/v1/stars
		 */
		getStarsLinkApiV1StarsPost: (data: GetEnergy, params: RequestParams = {}) =>
			this.request<GetEnergyResponse, HTTPValidationError>({
				path: `/api/v1/stars`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params
			}),

		/**
		 * @description Эндпоинт для запуска рулетки и получения результата.
		 *
		 * @tags spin
		 * @name SpinApiV1UsersUserIdSpinPost
		 * @summary Spin
		 * @request POST:/api/v1/users/{user_id}/spin
		 */
		spinApiV1UsersUserIdSpinPost: (userId: number, params: RequestParams = {}) =>
			this.request<SpinResult, HTTPValidationError>({
				path: `/api/v1/users/${userId}/spin`,
				method: 'POST',
				format: 'json',
				...params
			}),

		/**
		 * @description Эндпоинт для получения списка предметов с их id и редкостью.
		 *
		 * @tags prizes
		 * @name GetPrizesApiV1PrizesGet
		 * @summary Get Prizes
		 * @request GET:/api/v1/prizes
		 */
		getPrizesApiV1PrizesGet: (params: RequestParams = {}) =>
			this.request<Prize[], any>({
				path: `/api/v1/prizes`,
				method: 'GET',
				format: 'json',
				...params
			})
	}
}
