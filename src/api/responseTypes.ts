export interface Referral {
	username: string
	refs: number
	bonus: number | string
	reward: number
}

export interface UserCreateResponse {
	username: string
	score: number
	last_tap: string
	ref_code: string
	position: number
	tickets: number
	left_mining: string
	mining_claim: boolean
	daily_stric: number
	daily_claim: boolean
}

export interface TasksCreateResponseItem {
	id: number
	title: string
	description: string
	points: number
	tickets: number
	duration: string
	links: string
	complete: boolean
	image: string
}

export interface TasksCreateResponse {
	tasks: TasksCreateResponseItem[]
}

export interface ReferalsCreateResponse {
	username: string
	referals: Referral[]
	total_referals: number
}
