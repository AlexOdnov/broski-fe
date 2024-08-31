export function msToTime(duration: number) {
	// const milliseconds = Math.floor((duration % 1000) / 100)
	// let seconds = Math.floor((duration / 1000) % 60)
	const minutes = Math.floor((duration / (1000 * 60)) % 60)
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

	hours = hours < 10 ? 0 + hours : hours
	// minutes = (minutes < 10) ? "0" + minutes : minutes;
	// seconds = (seconds < 10) ? 0 + seconds : seconds;

	return `${hours}h:${minutes}m`
}

export function addHours(date: number, hours: number): number {
	const dateTime = new Date(date)
	return dateTime.setHours(dateTime.getHours() + hours)
}

export function addMinutes(date: number, minutes: number): number {
	const dateTime = new Date(date)
	return dateTime.setMinutes(dateTime.getMinutes() + minutes)
}
