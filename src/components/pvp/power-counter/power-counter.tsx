import { defineComponent } from 'vue'
import styles from './power-counter.module.css'
import { UiProgressBar, UiText } from '@/components/ui'
import { FistIcon } from '@/components/icons'

export const PowerCounter = defineComponent({
	name: 'PowerCounter',
	props: {
		power: { type: Number, required: true }
	},
	setup: (props) => {
		return () => (
			<div>
				<div class={styles.powerWrapper}>
					<UiText class={styles.power} fontSize={'14px'} color={'#797979'}>
						<FistIcon height={14} />
						&nbsp;Power:
					</UiText>
					<UiText fontSize={'14px'} fontWeight={700} isAccent>
						{props.power}
					</UiText>
				</div>
				<UiProgressBar
					totalItems={props.power}
					filledItems={props.power}
					height={10}
					color={'#A955DD'}
				/>
			</div>
		)
	}
})
