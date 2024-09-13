import { defineComponent } from 'vue'
import styles from './reward-block.module.css'

export const RewardBlock = defineComponent({
	name: 'RewardBlock',
	props: {
		coins: { type: Number, required: true },
		tickets: { type: Number, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={styles.frame}>
				<div class={styles.coins}>
					<img src="/images/bro-coin.webp" />
					{`${props.coins} $BRO`}
				</div>
				<div class={styles.separator} />
				<div class={styles.tickets}>
					<img src="/images/ticket.webp" />
					{`${props.tickets} Tickets`}
				</div>
			</div>
		)
	}
})
