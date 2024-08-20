export interface Referral {
	username: string
	refs: number
	bonus: number
}

export interface UserCreateResponse {
	username: string
	score: number
	last_tap: string
	referals: Referral[]
	ref_code: string
	position: number
	tickets: number
	start_mining: string
}

export interface TasksCreateResponseItem {
	id: number
	description: string
	points: number
	tickets: number
	duration: string
	links: string
	complete: boolean
}

export interface TasksCreateResponse {
	tasks: TasksCreateResponseItem[]
}
