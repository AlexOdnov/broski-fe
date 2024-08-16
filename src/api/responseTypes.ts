export interface Referrals {
	id: string[]
}

export interface UserCreateResponse {
	username: string
	score: number
	last_tap: string
	referals: Referrals
	ref_code: string
	position: number
	tickets: number
}

export interface TasksCreateResponse {
	id: number
	description: string
	points: number
	links: string
	complete: boolean
}
