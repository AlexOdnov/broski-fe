import './assets/main.css'
import 'normalize.css'
import ru from '@/localization/ru.json'
import en from '@/localization/en.json'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App'
import router from './router'
import { createI18n } from 'vue-i18n'
import { ruPluralRule } from '@/utils/ru-plural-rule'

import * as Sentry from '@sentry/vue'
import { envVariables } from './services/env'

const app = createApp(App)
const i18n = createI18n({
	legacy: false,
	locale: 'en',
	messages: {
		ru: { ...ru },
		en: { ...en }
	},
	fallbackLocale: 'en',
	pluralRules: {
		ru: ruPluralRule
	}
})

Sentry.init({
	app,
	dsn: envVariables.sentryDSN,
	enableTracing: false,
	allowUrls: ['broski.pages.dev', 'itsbrocoin.wtf', 'release.broski.pages.dev']
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
