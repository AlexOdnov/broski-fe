export const randomValue = (min: number, max: number): number => {
	return min + Math.random() * (max - min)
}

export const randomValueByChance = (chance: number): boolean => {
	const value = randomValue(0, 100)
	return value < chance
}
