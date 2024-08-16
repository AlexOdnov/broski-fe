import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'

export const useTgSdkStore = defineStore('tgSdk', () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	return {
		isLoading,
		setIsLoading
	}
})
