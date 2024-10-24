import { useI18n } from 'vue-i18n'

import en from '@/data/localization/en.json'

export type MessageSchema = typeof en

export type LocaleType = 'en' | 'ru'

export const useLocalization = () => {
	const i18n = useI18n<{ message: MessageSchema }, LocaleType>()

	return { i18n, t: i18n.t<keyof MessageSchema> }
}
