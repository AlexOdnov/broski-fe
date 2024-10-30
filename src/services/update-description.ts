import { useTgSdkStore } from '@/stores/tg-sdk'
import update from '@/data/update-description/update-latest.json'

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

	const changes = updateDescription.changes[tgStore.languageCode] || updateDescription.changes.en

	return {
		version: updateDescription.version,
		changes
	}
}
