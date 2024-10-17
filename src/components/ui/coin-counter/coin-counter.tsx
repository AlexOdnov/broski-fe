import { defineComponent } from 'vue'
import styles from './coin-counter.module.css'
import { UiText } from '@/components/ui'
import { CoinIcon } from '@/components/icons'

export const CoinCounter = defineComponent({
	name: 'CoinCounter',
	props: {
		coins: { type: Number, required: true },
		size: { type: Number, default: 14 },
		reverse: { type: Boolean, default: false }
	},
	setup: (props) => {
		return () => (
			<UiText
				class={[styles.coins, props.reverse && styles.reverse]}
				fontSize={`${props.size}px`}
				fontWeight={700}
				isAccent
			>
				<CoinIcon height={props.size} />
				{Intl.NumberFormat('en-US').format(Number(props.coins))}
			</UiText>
		)
	}
})
