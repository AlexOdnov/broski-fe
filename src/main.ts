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
	dsn: process.env.SENTRY_DSN,
	enableTracing: false,
	release: 'broski-fe@' + process.env.CF_PAGES_COMMIT_SHA
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
