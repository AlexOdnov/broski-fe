import { computed, defineComponent, type PropType } from 'vue'
import styles from './player-ability.module.css'
import { CoinCounter, UiButton, UiProgressBar, UiText } from '@/components/ui'
import {
	CombinationsIcon,
	DefenceIcon,
	SpeedIcon,
	StrengthIcon,
	WeightIcon
} from '@/components/icons'

export type AbilityType = 'combinations' | 'defence' | 'speed' | 'strength' | 'weight'

export const PlayerAbility = defineComponent({
	name: 'PlayerAbility',
	props: {
		abilityType: { type: String as PropType<AbilityType>, required: true },
		currentValue: { type: Number, required: true },
		maximumValue: { type: Number, required: true },
		upgradeCost: { type: Number, required: true },
		loading: { type: Boolean, default: false },
		whenUpgrade: { type: Function as PropType<() => void>, required: true }
	},
	setup: (props) => {
		const iconComponent = computed(() => {
			switch (props.abilityType) {
				case 'combinations':
					return CombinationsIcon
				case 'defence':
					return DefenceIcon
				case 'speed':
					return SpeedIcon
				case 'strength':
					return StrengthIcon
				case 'weight':
					return WeightIcon
				default:
					return WeightIcon
			}
		})

		return () => (
			<div class={styles.playerAbility}>
				<div class={styles.barWrapper}>
					<iconComponent.value height={16} />
					<UiProgressBar
						totalItems={props.currentValue}
						filledItems={props.maximumValue}
						height={20}
						withCounter
					/>
				</div>
				<UiButton
					size={'sm'}
					mod={'inverse'}
					font={'Roboto'}
					leftIcon={<UiText fontSize={'24px'}>+</UiText>}
					loading={props.loading}
					bordered
					icon
					whenClick={props.whenUpgrade}
				/>
				<CoinCounter coins={props.upgradeCost} />
			</div>
		)
	}
})
