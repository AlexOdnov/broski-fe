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
			tickets: 3
		},
		{
			day: 2,
			coins: 50,
			tickets: 6
		},
		{
			day: 3,
			coins: 75,
			tickets: 9
		},
		{
			day: 4,
			coins: 100,
			tickets: 9
		},
		{
			day: 5,
			coins: 150,
			tickets: 12
		},
		{
			day: 6,
			coins: 250,
			tickets: 15
		},
		{
			day: 7,
			coins: 500,
			tickets: 15
		}
	]
	if (day >= 7) return rewards[6]
	const reward = rewards.find((r) => r.day === day)
	return reward ?? rewards[0]
}
