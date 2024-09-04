import styles from './daily.module.css'
import { computed, defineComponent } from 'vue'
import { RewardBlock, UiButton } from '@/components'
import { useUserStore } from '@/stores/user'

interface Reward {
	day: number
	coins: number
	tickets: number
}

const getRewardByDay = (day: number) => {
	const rewards: Reward[] = [
		{
			day: 1,
			coins: 30,
			tickets: 6
		},
		{
			day: 2,
			coins: 50,
			tickets: 12
		},
		{
			day: 3,
			coins: 75,
			tickets: 18
		},
		{
			day: 4,
			coins: 100,
			tickets: 18
		},
		{
			day: 5,
			coins: 150,
			tickets: 24
		},
		{
			day: 6,
			coins: 250,
			tickets: 30
		},
		{
			day: 7,
			coins: 500,
			tickets: 30
		}
	]
	if (day >= 7) return rewards[6]
	const reward = rewards.find((r) => r.day === day)
	return reward ?? rewards[0]
}

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
				days.push({ ...getRewardByDay(i), claimed: false })
			}
			return days
		})

		const getDailyReward = async () => {
			await userStore.getDailyReward()
		}
		return () => (
			<>
				<div class={styles.rewards}>
					<span class={styles.day}>{day.value}</span>
					<span class={styles.dayText}>daily rewards</span>
					<RewardBlock coins={currentReward.value.coins} tickets={currentReward.value.tickets} />
					<div class={styles.message}>
						<span>{`Come back tomorrow for check-in day ${props.day + 1}`}</span>
						<br />
						<span class={styles.tip}>Tip: Skipping a day resets your check-in</span>
					</div>
					<div class={styles.daysBlock}>
						{visibleDays.value.map((d) => (
							<div class={styles.dayBlockWrapper}>
								{props.day === d.day && <div class={styles.okBlock}>👌</div>}
								<div class={[styles.dayBlock, props.day === d.day && styles.currentDayBlock]}>
									<div class={styles.dayBlockTitle}>{`Day ${d.day}`}</div>
									<div class={styles.dayBlockCoins}>
										<img src="/images/bro-coin.png" />
										{`${d.coins} $BRO`}
									</div>
									<div class={styles.dayBlockTickets}>
										{`${d.tickets} Tickets`}
										<img src="/images/ticket.png" />
									</div>
								</div>
							</div>
						))}
					</div>
					<UiButton
						mod={'primary'}
						size={'lg'}
						text="Claim"
						whenClick={getDailyReward}
					/>
				</div>
			</>
		)
	}
})
