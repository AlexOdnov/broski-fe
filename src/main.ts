import './assets/main.css'
import 'normalize.css'
import ru from '@/localization/ru.json'
import en from '@/localization/en.json'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App'
import router from './router'
import {createI18n} from 'vue-i18n';
import { ruPluralRule } from '@/utils/ru-plural-rule'

const app = createApp(App)
const i18n = createI18n({
	legacy: false,
	locale: 'en',
	messages: {
		ru: {
			message: ru,
		},
		en: {
			message: en,
		}
	},
	fallbackLocale: 'en',
	pluralRules: {
		'ru': ruPluralRule
	}
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
