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
	user_id: string
	/** Ref Code */
	ref_code?: string | null
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
		 * @tags users
		 * @name GetUserApiV1UsersUserIdGet
		 * @summary Get User
		 * @request GET:/api/v1/users/{user_id}
		 */
		getUserApiV1UsersUserIdGet: (userId: string, params: RequestParams = {}) =>
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
			this.request<User, HTTPValidationError>({
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
			})
	}
}
