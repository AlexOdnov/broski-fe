import styles from './daily.module.css'
import { computed, defineComponent } from 'vue'
import { RewardBlock, UiButton } from '@/components'
import { useUserStore } from '@/stores/user'
import { getRewardByDay, type Reward } from '@/utils/get-daily-rewards'
import { useI18n } from 'vue-i18n'

export const DailyComponent = defineComponent({
	name: 'DailyComponent',
	props: {
		day: { type: Number, required: true }
	},
	setup: (props) => {
		const userStore = useUserStore()
		const currentReward = computed(() => getRewardByDay(props.day))
		const day = computed(() =>
			props.day.toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false
			})
		)
		const visibleDays = computed(() => {
			const days: (Reward & { claimed: boolean })[] = []
			for (let i = props.day; i < props.day + 6; i++) {
				days.push({ ...getRewardByDay(i), day: i, claimed: false })
			}
			return days
		})
		const { t } = useI18n()

		const claimDailyReward = async () => {
			await userStore.claimDailyReward()
		}
		return () => (
			<div class={styles.rewards}>
				<span class={styles.day}>{day.value}</span>
				<span class={styles.dayText}>daily rewards</span>
				<RewardBlock coins={currentReward.value.coins} tickets={currentReward.value.tickets} />
				<div class={styles.message}>
					<span>{`${t('message.comeBackTomorrow')} ${props.day + 1}`}</span>
					<br />
					<span class={styles.tip}>{t('message.tipSkipping')}</span>
				</div>
				<div class={styles.daysBlock}>
					{visibleDays.value.map((d) => (
						<div class={styles.dayBlockWrapper}>
							{props.day === d.day && <div class={styles.okBlock}>👌</div>}
							<div class={[styles.dayBlock, props.day === d.day && styles.currentDayBlock]}>
								<div class={styles.dayBlockTitle}>{`${t('message.day')} ${d.day}`}</div>
								<div class={styles.dayBlockCoins}>
									<img src="/images/bro-coin.webp" />
									{`${d.coins} $BRO`}
								</div>
								<div class={styles.dayBlockTickets}>
									{`${d.tickets} Tickets`}
									<img src="/images/ticket.webp" />
								</div>
							</div>
						</div>
					))}
				</div>
				<UiButton mod={'primary'} size={'lg'} text={t('message.claim')} whenClick={claimDailyReward} />
			</div>
		)
	}
})
