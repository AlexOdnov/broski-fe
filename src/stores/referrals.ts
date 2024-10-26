import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { ReferalsCreateResponse, Referral } from '@/api/responseTypes'
import { useApi } from '@/api/useApi'
import { useTgSdkStore } from './tg-sdk'
import { computed } from 'vue'
import { useUserStore } from './user'

export const useReferralsStore = defineStore('referrals', () => {
	const api = useApi()
	const tgStore = useTgSdkStore()
	const userStore = useUserStore()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [referralsResponse, setReferralsResponse, resetReferralsResponse] =
		useState<ReferalsCreateResponse | null>(null)
	const [referrals, setReferrals, resetReferrals] = useState<Referral[]>([
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		},
		{
			username: 'das',
			refs: 123,
			bonus: 321,
			reward: 123
		}
	])

	const totalReferrals = computed(() => referralsResponse.value?.total_referals || 0)
	const sumReferralsReward = computed(() => referralsResponse.value?.total_score || 0)

	const resetStore = () => {
		resetReferrals()
		resetReferralsResponse()
	}

	const claimReferralsReward = async () => {
		try {
			await api.claimRefBonus({
				user_id: tgStore.userId
			})
			resetStore()
			await userStore.loadUser()
			await loadReferrals()
		} catch (error) {
			console.warn(error)
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
				user_id: tgStore.userId,
				page: referralsResponse.value?.current_page || 0 + 1,
				limit: 20
			})
			setReferralsResponse(response)
			setReferrals([...referrals.value, ...response.referals])
			setIsLoading(false)
		} catch (error) {
			console.warn(error)
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
