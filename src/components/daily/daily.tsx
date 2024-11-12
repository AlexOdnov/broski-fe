import styles from './daily.module.css'
import { computed, defineComponent } from 'vue'
import { RewardBlock, UiButton } from '@/components'
import { useUserStore } from '@/stores/user'
import { getRewardByDay, type Reward } from '@/utils/get-daily-rewards'
import { UiText } from '../ui'
import { useLocalization } from '@/services/localization'
import { CoinIcon, GiftIcon, StarsIcon, TicketIcon } from '@/components/icons'

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
				<RewardBlock
					coins={currentReward.value.coins ?? 0}
					tickets={currentReward.value.tickets ?? 0}
					lootboxes={currentReward.value.lootboxes ?? 0}
					premium={currentReward.value.superbro ?? 0}
				/>
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
								<div>
									<UiText color={'#f0f0f0'} fontWeight={600} fontSize={'14px'} lineHeight={'14px'}>
										{`${t('day')} ${d.day}`}
									</UiText>
								</div>
								<div />
								<div class={styles.content}>
									{d.coins && (
										<UiText
											class={styles.dayBlockCoins}
											isAccent
											fontWeight={400}
											fontSize={'12px'}
											lineHeight={'12px'}
										>
											<CoinIcon height={18} />
											&nbsp;
											{`${d.coins > 1000 ? Math.trunc(d.coins / 1000) + 'k' : d.coins} $BRO`}
										</UiText>
									)}
									{d.tickets && (
										<UiText
											class={styles.dayBlockTickets}
											fontWeight={400}
											fontSize={'12px'}
											lineHeight={'12px'}
										>
											{t('ticket', d.tickets)}&nbsp;
											<TicketIcon height={18} />
										</UiText>
									)}
									{d.lootboxes && (
										<UiText
											class={styles.dayBlockTickets}
											fontWeight={400}
											fontSize={'12px'}
											lineHeight={'12px'}
										>
											{`${d.lootboxes}`}&nbsp;
											<GiftIcon height={18} border={1} />
										</UiText>
									)}
									{d.superbro && (
										<UiText
											class={styles.dayBlockCoins}
											fontWeight={400}
											fontSize={'12px'}
											lineHeight={'12px'}
										>
											<StarsIcon height={18} style={{ color: '#ffb800' }} />
											&nbsp;
											{`${t('days', d.superbro)} ${t('superBro')}`}
										</UiText>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
				<UiButton mod={'primary'} size={'lg'} text={t('claim')} whenClick={claimDailyReward} />
			</div>
		)
	}
})
