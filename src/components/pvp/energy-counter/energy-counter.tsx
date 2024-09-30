import { defineComponent } from 'vue'
import styles from './energy-counter.module.css'
import { UiProgressBar, UiText } from '@/components/ui'
import { EnergyIcon } from '@/components/icons'

export const EnergyCounter = defineComponent({
	name: 'EnergyCounter',
	props: {
		totalEnergy: { type: Number, required: true },
		currentEnergy: { type: Number, required: true },
		timeToRestore: { type: String, required: true }
	},
	setup: (props) => {
		return () => (
			<div>
				<div class={styles.energyWrapper}>
					<UiText class={styles.energy} fontSize={'14px'} color={'#797979'}>
						<EnergyIcon height={14} />
						&nbsp;Energy:
					</UiText>
					<div class={styles.counter}>
						<UiText fontSize={'14px'} color={'#797979'}>
							{props.currentEnergy}/{props.totalEnergy}
						</UiText>
						<div class={styles.separator} />
						<UiText fontSize={'14px'} color={'#F0F0F0'}>
							{props.timeToRestore}
						</UiText>
					</div>
				</div>
				<UiProgressBar
					totalItems={props.totalEnergy}
					filledItems={props.currentEnergy}
					mod={'round-segmented'}
					height={10}
					color={'#55AEDD'}
				/>
			</div>
		)
	}
})
