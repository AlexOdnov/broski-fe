import './assets/main.css'
import 'normalize.css'
import ru from '@/data/localization/ru.json'
import en from '@/data/localization/en.json'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App'
import router from './router'
import { createI18n } from 'vue-i18n'
import { ruPluralRule } from '@/utils/ru-plural-rule'

import * as Sentry from '@sentry/vue'
import { envVariables } from './services/env'
import type { LocaleType, MessageSchema } from './services/localization'

const app = createApp(App)
const i18n = createI18n<[MessageSchema], LocaleType>({
	legacy: false,
	locale: 'en' as LocaleType,
	messages: {
		ru: { ...ru },
		en: { ...en }
	},
	fallbackLocale: 'en' as LocaleType,
	pluralRules: {
		ru: ruPluralRule
	}
})

Sentry.init({
	app,
	dsn: envVariables.sentryDSN,
	enableTracing: false,
	allowUrls: ['broski.pages.dev', 'itsbrocoin.wtf', 'release.broski.pages.dev'],
	integrations: [
		Sentry.extraErrorDataIntegration({
			depth: 5
		})
	]
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
