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
	first_login: boolean
	first_game: boolean
	advertising_limit: number
	advertising_total: number
	boxes: number
	region: string
	ton_balanse: number
	push_see: boolean
	daily_event: boolean
}

export interface UserStatsCreateResponse {
	ref_code: string
	first_login: boolean
	first_game: boolean
	push_view: boolean
	daily: {
		streak: number
		claim: boolean
	}
	duel: {
		wins: number
		loses: number
		total: number
		tons: number
		score: number
	}
	game: {
		wins: number
		loses: number
		total: number
		score: number
	}
	super_game: {
		wins: number
		loses: number
		total: number
		score: number
	}
	refs: {
		total: number
		score: number
		tickets: number
	}
	tasks: {
		total: number
		score: number
		tickets: number
	}
	mining: {
		total: number
		score: number
	}
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
	priority: number
}

export interface TasksCreateResponse {
	tasks: TasksCreateResponseItem[]
}

export interface ReferalsCreateResponse {
	username: string
	referals: Referral[]
	total_referals: number
	total_pages: number
	current_page: number
	total_score: number
}
