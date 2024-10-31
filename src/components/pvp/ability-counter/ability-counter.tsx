import { computed, defineComponent, type PropType } from 'vue'
import styles from './ability-counter.module.css'
import { UiProgressBar, UiText } from '@/components/ui'
import {
	CombinationsIcon,
	DefenceIcon,
	SpeedIcon,
	StrengthIcon,
	WeightIcon
} from '@/components/icons'
import type { AbilityType } from '@/stores/pvp'

export type AbilityCounterSize = 'sm' | 'md'

export const AbilityCounter = defineComponent({
	name: 'AbilityCounter',
	props: {
		abilityType: { type: String as PropType<AbilityType>, required: true },
		currentValue: { type: Number, required: true },
		maximumValue: { type: Number, required: true },
		disabled: { type: Boolean, default: false },
		reverse: { type: Boolean, default: false },
		size: { type: String as PropType<AbilityCounterSize>, default: 'md' }
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

		const iconSize = computed(() => (props.size === 'sm' ? 12 : 16))
		const progressBarSize = computed(() => (props.size === 'sm' ? 8 : 20))
		const fillerColor = computed(() => (props.disabled ? '#CBCBCB' : undefined))
		const totalItems = computed(() =>
			props.disabled ? (props.size === 'sm' ? 25 : 50) : props.maximumValue
		)
		const filledItems = computed(() => (props.disabled ? 1 : props.currentValue))

		return () => (
			<div class={[styles.abilityCounter, props.reverse && styles.abilityCounterReverse]}>
				<iconComponent.value
					height={iconSize.value}
					class={props.disabled && styles.iconDisabled}
				/>
				<UiProgressBar
					totalItems={totalItems.value}
					filledItems={filledItems.value}
					height={progressBarSize.value}
					withCounter={props.size === 'md'}
					fillerColor={fillerColor.value}
				/>
				{props.size === 'sm' && (
					<UiText fontSize={'12px'} color={props.disabled ? '#4E4F4F' : '#CBCBCB'}>
						{props.currentValue}
					</UiText>
				)}
			</div>
		)
	}
})
