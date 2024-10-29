import { useTgSdkStore } from '@/stores/tg-sdk'
import event from '@/data/event-description/current-event.json'

export interface IEvent {
	title: {
		ru: string
		en: string
	}
	description: {
		ru: string[]
		en: string[]
	}
}

export const useEventDescription = () => {
	const updateDescription = event as IEvent
	const tgStore = useTgSdkStore()

	const title =
		updateDescription.title[tgStore.languageCode as 'ru' | 'en'] || updateDescription.title.en

	const description =
		updateDescription.description[tgStore.languageCode as 'ru' | 'en'] ||
		updateDescription.description.en

	return {
		title,
		description
	}
}
