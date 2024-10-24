import { defineComponent } from 'vue'
import styles from './reward-block.module.css'
import { useLocalization } from '@/services/localization'

export const RewardBlock = defineComponent({
	name: 'RewardBlock',
	props: {
		coins: { type: Number, required: true },
		tickets: { type: Number, required: true }
	},
	setup: (props) => {
		const { t } = useLocalization()

		return () => (
			<div class={styles.frame}>
				<div class={styles.coins}>
					<img src="/images/bro-coin.webp" />
					{`${props.coins} $BRO`}
				</div>
				<div class={styles.separator} />
				<div class={styles.tickets}>
					<img src="/images/ticket.webp" />
					{t('ticket', props.tickets)}
				</div>
			</div>
		)
	}
})
