function getRandomString(length: number) {
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	let counter = 0
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
		counter += 1
	}
	return result
}

const stringShift = (str: string, shiftLength: number) => {
	return [...str].reduce(
		(acc, val) => (acc += String.fromCharCode(val.charCodeAt(0) + shiftLength)),
		''
	)
}

export const handleHeader = (userId: string, shiftLength: number, randSymbolsLength: number) => {
	return stringShift(
		`${getRandomString(randSymbolsLength)}${userId}_${new Date().getUTCHours() + 5}${getRandomString(randSymbolsLength)}`,
		shiftLength
	)
}
