import { useTgSdkStore } from '@/stores/tg-sdk'
import update from '@/update-description/update-latest.json'

export interface IUpdate {
	version: string
	changes: {
		ru: string[]
		en: string[]
	}
}

export const useUpdateDescription = () => {
	const updateDescription = update as IUpdate
	const tgStore = useTgSdkStore()

	const changes =
		updateDescription.changes[tgStore.languageCode as 'ru' | 'en'] || updateDescription.changes.en

	return {
		version: updateDescription.version,
		changes
	}
}