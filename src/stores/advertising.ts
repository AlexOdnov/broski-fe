import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AdController } from '../../adsgram'
import { useSentry } from '@/services/sentry'

const LAST_ADSGRAM_SHOW_TIME = 'lastAdsgramShowTime'

export const useAdvertisingStore = defineStore('advertising', () => {
	const sentry = useSentry()

	//Adsgram
	const _adController = ref<AdController | null>(null)
	//OnClicka
	let _showAdvOnClicka: (() => Promise<void>) | null = null

	const init = async () => {
		//OnClicka
		try {
			_showAdvOnClicka = await window.initCdTma({ id: '6029415' })
		} catch (e) {
			console.warn('failed adv init', e)
			sentry.captureException(e)
		}

		// Adsgram
		// try {
		// 	const adControllerInit = window.Adsgram?.init({ blockId: '2897' })
		// 	if (adControllerInit) {
		// 		_adController.value = adControllerInit
		// 	}
		// } catch (e) {
		// 	console.warn('failed adv init', e)
		// }
	}

	const showAdv = async () => {
		// const lastAdsgramShowTime =
		// 	window.localStorage.getItem(LAST_ADSGRAM_SHOW_TIME) != null
		// 		? Number.parseInt(window.localStorage.getItem(LAST_ADSGRAM_SHOW_TIME) ?? '')
		// 		: null
		// const currentTime = new Date().getTime()

		// if (
		// 	_adController.value &&
		// 	(lastAdsgramShowTime === null ||
		// 		(!Number.isNaN(lastAdsgramShowTime) && currentTime - lastAdsgramShowTime > 1000 * 60 * 3))
		// ) {
		// 	// прошло 3 минуты, показываем Adsgram
		// 	try {
		// 		const showResult = await _adController.value?.show()
		// 		if (showResult?.done) {
		// 			window.localStorage.setItem(LAST_ADSGRAM_SHOW_TIME, new Date().getTime().toString())
		// 			return true
		// 		}
		// 		console.warn(showResult?.error)
		// 		return false
		// 	} catch (e) {
		// 		console.warn('error when show adsgram adv', e)
		// 	}
		// }

		//OnClicka
		if (!_showAdvOnClicka) return false
		try {
			await _showAdvOnClicka()
			return true
		} catch (e) {
			console.warn('error when show onclicka adv', e)
			sentry.captureException(e)
			return false
		}
	}

	return {
		init,
		showAdv
	}
})
