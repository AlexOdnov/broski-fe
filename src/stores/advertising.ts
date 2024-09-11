import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
// import { ref } from 'vue'

export const useAdvertisingStore = defineStore('advertising', () => {
	const userStore = useUserStore()

	const showAdv = async () => {
		//Adsgram
		// try {
		// 	const showResult = await adController.value?.show()
		// 	if (showResult?.done) {
		// 		return true
		// 	}
		// 	console.warn(showResult?.error)
		// 	return false
		//OnClicka
		if (!_showAdv) return false
		try {
			await _showAdv()
			return true
		} catch (e) {
			console.warn('failed when show adv', e)
			return false
		}
	}
	//Adsgram
	// const adController = ref<AdController | null>(null)

	//OnClicka
	let _showAdv: (() => Promise<void>) | null = null

	const init = async () => {
		//OnClicka
		try {
			_showAdv = await window.initCdTma({ id: '6029415' })
			console.log(_showAdv)
		} catch (e) {
			console.warn('failed adv init', e)
		}

		//Adsgram
		// try {
		// 	const adControllerInit = window.Adsgram.init({ blockId: '2897', debug: true })
		// 	if (adControllerInit) {
		// 		adController.value = adControllerInit
		// 	}
		// } catch (e) {
		// 	console.warn('failed adv init', e)
		// }
	}
	return {
		init,
		showAdv
	}
})
