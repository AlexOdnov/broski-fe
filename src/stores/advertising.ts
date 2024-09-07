import { defineStore } from 'pinia'

export const useAdvertisingStore = defineStore('advertising', () => {
	const showAdv = async () => {
		if (!_showAdv) return false
		try {
			await _showAdv()
			return true
		} catch (e) {
			console.warn('failed when show adv', e)
			return false
		}
	}

	let _showAdv: (() => Promise<void>) | null = null

	const init = async () => {
		try {
			_showAdv = await window.initCdTma({ id: '6029415' })
			console.log(_showAdv)
		} catch (e) {
			console.warn('failed adv init', e)
		}
	}
	return {
		init,
		showAdv
	}
})
