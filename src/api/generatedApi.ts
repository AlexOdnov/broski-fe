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

export interface UserCreatePayload {
	/** @example "antonprox" */
	username: string
	/** @example "624161982" */
	user_id: number
	/** @example "None" */
	ref_code?: string
}

export interface TasksCreatePayload {
	/** @example "antonprox" */
	username: string
}

export interface TasksCreateBody {
	/** @example "antonprox" */
	username: string
	/**
	 * Id таски
	 * @example "1"
	 */
	task_id: number
}

export interface ScoreCreatePayload {
	/** @example "antonprox" */
	username: string
	/** @example "1000" */
	score: number
}

export interface TicketsCreatePayload {
	/** @example "antonprox" */
	username: string
	/** @example "1" */
	tickets: number
}

export interface ScoreCreateBody {
	/** @example "antonprox" */
	username: string
	/** @example "1000" */
	score: number
}

export interface TicketsCreateBody {
	/** @example "antonprox" */
	username: string
	/** @example "1" */
	tickets: number
}

export interface RefClaimCreatePayload {
	/** @example "antonprox" */
	username: string
}

export interface MiningCreatePayload {
	/** @example "antonprox" */
	username: string
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
		this.instance = axios.create({
			...axiosConfig,
			baseURL: axiosConfig.baseURL || 'http://127.0.0.1:8000'
		})
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
 * @title Brocoin
 * @version 1.0.0
 * @baseUrl http://127.0.0.1:8000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	get = {
		/**
		 * No description
		 *
		 * @tags default
		 * @name UserCreate
		 * @summary /get/user/
		 * @request POST:/get/user/
		 */
		userCreate: (data: UserCreatePayload, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/get/user/`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags default
		 * @name TasksCreate
		 * @summary /get/tasks/
		 * @request POST:/get/tasks/
		 */
		tasksCreate: (data: TasksCreatePayload, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/get/tasks/`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags default
		 * @name RefClaimCreate
		 * @summary /get/ref_claim/
		 * @request POST:/get/ref_claim/
		 */
		refClaimCreate: (data: RefClaimCreatePayload, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/get/ref_claim/`,
				method: 'POST',
				body: data,
				type: ContentType.UrlEncoded,
				format: 'json',
				...params
			})
	}
	done = {
		/**
		 * No description
		 *
		 * @tags default
		 * @name TasksCreate
		 * @summary /done/tasks/
		 * @request POST:/done/tasks/
		 */
		tasksCreate: (data: TasksCreateBody, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/done/tasks/`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params
			})
	}
	add = {
		/**
		 * No description
		 *
		 * @tags default
		 * @name ScoreCreate
		 * @summary /add/score/
		 * @request POST:/add/score/
		 */
		scoreCreate: (data: ScoreCreatePayload, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/add/score/`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags default
		 * @name TicketsCreate
		 * @summary /add/tickets/
		 * @request POST:/add/tickets/
		 */
		ticketsCreate: (data: TicketsCreatePayload, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/add/tickets/`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params
			})
	}
	remove = {
		/**
		 * No description
		 *
		 * @tags default
		 * @name ScoreCreate
		 * @summary /remove/score/
		 * @request POST:/remove/score/
		 */
		scoreCreate: (data: ScoreCreateBody, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/remove/score/`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags default
		 * @name TicketsCreate
		 * @summary remove/tickets/
		 * @request POST:/remove/tickets/
		 */
		ticketsCreate: (data: TicketsCreateBody, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/remove/tickets/`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params
			})
	}
	start = {
		/**
		 * No description
		 *
		 * @tags default
		 * @name MiningCreate
		 * @summary /start/mining/
		 * @request POST:/start/mining/
		 */
		miningCreate: (data: MiningCreatePayload, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/start/mining/`,
				method: 'POST',
				body: data,
				type: ContentType.UrlEncoded,
				format: 'json',
				...params
			})
	}
}
