import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { UserReferrals, Referral } from '@/api/generatedApi'
import { useApi } from '@/api/useApi'
import { useTgSdkStore } from './tg-sdk'
import { computed } from 'vue'
import { useUserStore } from './user'
import { useSentry } from '@/services/sentry'

export const useReferralsStore = defineStore('referrals', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()
	const userStore = useUserStore()
	const sentry = useSentry()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [referralsResponse, setReferralsResponse, resetReferralsResponse] =
		useState<UserReferrals | null>(null)
	const [referrals, setReferrals, resetReferrals] = useState<Referral[]>([])

	const totalReferrals = computed(() => referralsResponse.value?.total_referrals || 0)
	const sumReferralsReward = computed(() => referralsResponse.value?.total_score || 0)

	const resetStore = () => {
		resetReferrals()
		resetReferralsResponse()
	}

	const claimReferralsReward = async () => {
		try {
			await api.claimRefBonus({
				userId: tgStore.userId
			})
			resetStore()
			await userStore.loadUser()
			await loadReferrals()
		} catch (error) {
			console.warn(error)
			sentry.captureNetworkException(error)
		}
	}

	const loadReferrals = async () => {
		try {
			if (
				(referralsResponse.value &&
					referralsResponse.value?.total_pages === referralsResponse.value?.current_page) ||
				isLoading.value
			) {
				return
			}
			setIsLoading(true)
			const response = await api.getReferrals({
				userId: tgStore.userId,
				page: referralsResponse.value?.current_page || 0 + 1,
				per_page: 20
			})
			setReferralsResponse(response)
			setReferrals([...referrals.value, ...response.referrals])
			setIsLoading(false)
		} catch (error) {
			console.warn(error)
			sentry.captureNetworkException(error)
		}
	}

	return {
		referrals,
		totalReferrals,
		sumReferralsReward,
		claimReferralsReward,
		loadReferrals,
		resetStore
	}
})
