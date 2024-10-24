import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Temporal } from 'temporal-polyfill'

interface IEventTimeFrame {
	start: Temporal.ZonedDateTime
	end: Temporal.ZonedDateTime
}

const EVENT_TIME_FRAME: IEventTimeFrame = {
	start: Temporal.ZonedDateTime.from({
		timeZone: 'UTC',
		year: 2024,
		month: 10,
		day: 22,
		hour: 0,
		minute: 0
	}),
	end: Temporal.ZonedDateTime.from({
		timeZone: 'UTC',
		year: 2024,
		month: 10,
		day: 22,
		hour: 0,
		minute: 0
	})
}

export const useEventTimerStore = defineStore('eventTimer', () => {
	const currentDate = ref<Temporal.ZonedDateTime>(Temporal.Now.zonedDateTimeISO('UTC'))
	const isInitiated = ref(false)

	const initTimer = () => {
		if (!isInitiated.value) {
			setInterval(() => {
				currentDate.value = Temporal.Now.zonedDateTimeISO('UTC')
			}, 1000)
			isInitiated.value = true
		}
	}

	const isEventActive = (date: Temporal.ZonedDateTime, eventTimeFrame: IEventTimeFrame) => {
		initTimer()

		const isAfter = Temporal.PlainDateTime.compare(date, eventTimeFrame.start)
		const isBefore = Temporal.PlainDateTime.compare(eventTimeFrame.end, date)

		return isAfter === 1 && isBefore === 1
	}

	const isDailyEventActive = computed(() => isEventActive(currentDate.value, EVENT_TIME_FRAME))

	return {
		isDailyEventActive
	}
})
