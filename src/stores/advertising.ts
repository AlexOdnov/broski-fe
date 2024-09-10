import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdvertisingStore = defineStore('advertising', () => {
	const showAdv = async () => {
		try {
			const showResult = await adController.value?.show()
			if (showResult?.done) {
				return true
			}
			console.warn(showResult?.error)
			return false
			// if (!_showAdv) return false
			// try {
			// 	await _showAdv()
			// 	return true
		} catch (e) {
			console.warn('failed when show adv', e)
			return false
		}
	}
	const adController = ref<AdController | null>(null)

	// let _showAdv: (() => Promise<void>) | null = null

	const init = async () => {
		// try {
		// 	_showAdv = await window.initCdTma({ id: '6029415' })
		// 	console.log(_showAdv)
		// } catch (e) {
		// 	console.warn('failed adv init', e)
		// }
		try {
			const adControllerInit = window.Adsgram.init({ blockId: '2897' })
			if (adControllerInit) {
				adController.value = adControllerInit
			}
		} catch (e) {
			console.warn('failed adv init', e)
		}
	}
	return {
		init,
		showAdv
	}
})
