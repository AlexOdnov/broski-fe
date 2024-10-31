import { defineComponent } from 'vue'
import styles from './power-counter.module.css'
import { UiProgressBar, UiText } from '@/components/ui'
import { FistIcon } from '@/components/icons'
import { useLocalization } from '@/services/localization'

export const PowerCounter = defineComponent({
	name: 'PowerCounter',
	props: {
		power: { type: Number, required: true },
		totalPower: { type: Number, required: false },
		hideProgressBar: { type: Boolean, default: false }
	},
	setup: (props) => {
		const { t } = useLocalization()

		return () => (
			<div>
				<div class={styles.powerWrapper}>
					<UiText class={styles.power} fontSize={'14px'} color={'#797979'}>
						<FistIcon height={14} />
						&nbsp;{t('pvp.battlePower')}:
					</UiText>
					<UiText
						fontSize={'14px'}
						fontWeight={700}
						isAccent={!!props.power}
						color={!props.power ? '#4E4F4F' : undefined}
					>
						{props.power ? Math.round(props.power) : '000'}
					</UiText>
				</div>
				{!props.hideProgressBar && (
					<UiProgressBar
						totalItems={props.totalPower ? props.totalPower : props.power}
						filledItems={props.power}
						height={10}
						fillerColor={props.power ? '#A955DD' : '#4E4F4F'}
					/>
				)}
			</div>
		)
	}
})
