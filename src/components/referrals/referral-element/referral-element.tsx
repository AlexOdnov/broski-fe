import { defineComponent, type PropType } from 'vue'
import styles from './styles.module.css'
import type { Referral } from '@/api/generatedApi'
import { UiText } from '@/components/ui'
import { CoinIcon } from '@/components/icons'

export const ReferralElement = defineComponent({
	name: 'ReferralElement',
	props: {
		referralElement: { type: Object as PropType<Referral>, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={styles.wrapper}>
				<UiText class={styles.username} fontWeight={500} fontSize={'18px'}>
					@{props.referralElement.username}
				</UiText>
				<UiText fontWeight={400} fontSize={'14px'} color={'#797979'}>
					Refs: {props.referralElement.refs}
				</UiText>
				<p class={styles.bonus}>
					+ <CoinIcon height={12} />
					<UiText isAccent>
						{Intl.NumberFormat('en-US').format(Number(props.referralElement.reward))} $BRO
					</UiText>
				</p>
			</div>
		)
	}
})
