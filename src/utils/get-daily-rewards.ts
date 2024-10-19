export interface Reward {
	day: number
	coins: number
	tickets: number
}

export const getRewardByDay = (day: number) => {
	const rewards: Reward[] = [
		{
			day: 1,
			coins: 30,
			tickets: 1
		},
		{
			day: 2,
			coins: 50,
			tickets: 2
		},
		{
			day: 3,
			coins: 75,
			tickets: 3
		},
		{
			day: 4,
			coins: 100,
			tickets: 4
		},
		{
			day: 5,
			coins: 150,
			tickets: 5
		},
		{
			day: 6,
			coins: 250,
			tickets: 6
		},
		{
			day: 7,
			coins: 500,
			tickets: 6
		}
	]
	if (day >= 7) return rewards[6]
	const reward = rewards.find((r) => r.day === day)
	return reward ?? rewards[0]
}
