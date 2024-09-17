import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
	const loadingState = ref(0)

	const setIsLoading = (isLoading: boolean) =>
		isLoading ? (loadingState.value += 1) : (loadingState.value -= 1)

	const isLoading = computed(() => loadingState.value > 0)

	const setIsLoadingForTimeout = (timeout: number) => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, timeout)
	}

	return {
		isLoading,
		setIsLoading,
		setIsLoadingForTimeout
	}
})
