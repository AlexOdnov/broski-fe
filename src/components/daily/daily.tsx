import styles from './daily.module.css'
import { computed, defineComponent } from 'vue'
import { RewardBlock, UiButton } from '@/components'
import { useUserStore } from '@/stores/user'
import { getRewardByDay, type Reward } from '@/utils/get-daily-rewards'
import { UiText } from '../ui'
import { useLocalization } from '@/services/localization'

export const DailyComponent = defineComponent({
	name: 'DailyComponent',
	props: {
		day: { type: Number, required: true }
	},
	setup: (props) => {
		const userStore = useUserStore()
		const { t } = useLocalization()

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

		const claimDailyReward = async () => {
			await userStore.claimDailyReward()
		}

		return () => (
			<div class={styles.rewards}>
				<UiText
					class={styles.day}
					fontSize={'42px'}
					lineHeight={'42px'}
					fontFamily={'barcadeBrawl'}
				>
					{day.value}
				</UiText>
				<UiText fontFamily={'barcadeBrawl'} fontSize={'16px'} lineHeight={'16px'}>
					{t('dailyRewards')}
				</UiText>
				<RewardBlock coins={currentReward.value.coins} tickets={currentReward.value.tickets} />
				<div class={styles.message}>
					<span>{`${t('comeBackTomorrow')} ${props.day + 1}`}</span>
					<br />
					<span class={styles.tip}>{t('tipSkipping')}</span>
				</div>
				<div class={styles.daysBlock}>
					{visibleDays.value.map((d) => (
						<div class={styles.dayBlockWrapper}>
							{props.day === d.day && <div class={styles.okBlock}>👌</div>}
							<div class={[styles.dayBlock, props.day === d.day && styles.currentDayBlock]}>
								<UiText color={'#f0f0f0'} fontWeight={600} fontSize={'14px'} lineHeight={'14px'}>
									{`${t('day')} ${d.day}`}
								</UiText>
								<UiText
									class={styles.dayBlockCoins}
									isAccent
									fontWeight={400}
									fontSize={'12px'}
									lineHeight={'12px'}
								>
									<img src="/images/bro-coin.webp" />
									{`${d.coins} $BRO`}
								</UiText>
								<UiText
									class={styles.dayBlockTickets}
									fontWeight={400}
									fontSize={'12px'}
									lineHeight={'12px'}
								>
									{t('ticket', d.tickets)}
									<img src="/images/ticket.webp" />
								</UiText>
							</div>
						</div>
					))}
				</div>
				<UiButton mod={'primary'} size={'lg'} text={t('claim')} whenClick={claimDailyReward} />
			</div>
		)
	}
})
