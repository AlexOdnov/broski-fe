import { defineComponent, type PropType } from 'vue'
import styles from './styles.module.css'
import type { Referral } from '@/api/responseTypes'

export const ReferralElement = defineComponent({
	name: 'ReferralElement',
	props: {
		referralElement: { type: Object as PropType<Referral>, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={styles.wrapper}>
				<p class={styles.username}>@{props.referralElement.username}</p>
				<p class={styles.refs}>Refs: {props.referralElement.refs}</p>
				<p class={styles.bonus}>
					+ <img class={styles.icon} src="/images/bro-coin.png" />
					<span class={styles.yellow}>
						{Intl.NumberFormat('en-US').format(Number(props.referralElement.reward))} $BRO
					</span>
				</p>
			</div>
		)
	}
})
