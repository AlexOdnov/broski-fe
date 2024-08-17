import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { UserCreateResponse } from '@/api/responseTypes'
import { useApi } from '@/api/useApi'

export const useUserStore = defineStore('user', () => {
	const api = useApi()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [user, setUser] = useState<UserCreateResponse | null>(null)

	const loadUser = async () => {
		try {
			setIsLoading(true)
			const userResponse = await api.getUser({
				user_id: 1111,
				username: 'name',
				ref_code: 'code'
			})
			setUser(userResponse)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		user,
		isLoading,
		loadUser
	}
})
