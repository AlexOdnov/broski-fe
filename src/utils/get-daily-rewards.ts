export interface Reward {
	day: number
	coins?: number
	tickets?: number
	lootboxes?: number
	superbro?: number
}

export const getRewardByDay = (day: number) => {
	const rewards: Reward[] = [
		{
			day: 1,
			coins: 30,
			lootboxes: 1
		},
		{
			day: 2,
			coins: 5000
		},
		{
			day: 3,
			superbro: 1
		},
		{
			day: 4,
			coins: 2000,
			lootboxes: 1
		},
		{
			day: 5,
			coins: 5000
		},
		{
			day: 6,
			coins: 10000
		},
		{
			day: 7,
			lootboxes: 2
		},
		{
			day: 8,
			superbro: 3
		}
	]
	if (day >= 9) {
		if (day % 3 === 2) {
			return {
				day,
				lootboxes: 2
			}
		} else {
			return {
				day,
				tickets: 10000
			}
		}
	}
	const reward = rewards.find((r) => r.day === day)
	return reward ?? rewards[0]
}
