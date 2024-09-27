import { computed, defineComponent } from 'vue'
import styles from './user-balance.module.css'
import { useUserStore } from '@/stores/user'
import { BoxIcon, CoinIcon, TicketIcon, TonIcon } from '@/components/icons'

export const UserBalance = defineComponent({
	name: 'UserBalance',
	setup: () => {
		const userStore = useUserStore()
		const coins = computed(() => Intl.NumberFormat('en-US').format(userStore.userScore))
		const tonBalance = computed(() => userStore.user?.ton_balance ?? 0)
		const boxes = computed(() => userStore.user?.boxes ?? 0)

		return () => (
			<div>
				<div class={styles.coins}>
					<CoinIcon class={styles.coinIcon} />
					{coins.value}
				</div>
				<div class={styles.secondRow}>
					<div class={styles.itemBlock}>
						<TonIcon class={styles.smallIcon} />
						{tonBalance.value}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.itemBlock}>
						<BoxIcon height={18} class={styles.smallIcon} />
						{boxes.value}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.itemBlock}>
						<TicketIcon height={18} class={styles.smallIcon} />
						{userStore.userTickets}
					</div>
				</div>
			</div>
		)
	}
})
