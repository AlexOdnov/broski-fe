import { defineComponent, type PropType } from 'vue'
import styles from './player-ability.module.css'
import { CoinCounter, UiButton, UiText } from '@/components/ui'

import type { AbilityType } from '@/stores/pvp'
import { AbilityCounter } from '../../ability-counter'

export const PlayerAbility = defineComponent({
	name: 'PlayerAbility',
	props: {
		abilityType: { type: String as PropType<AbilityType>, required: true },
		currentValue: { type: Number, required: true },
		maximumValue: { type: Number, required: true },
		upgradeCost: { type: Number, required: true },
		loading: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		whenUpgrade: { type: Function as PropType<() => void>, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={styles.playerAbility}>
				<AbilityCounter
					abilityType={props.abilityType}
					currentValue={props.currentValue}
					maximumValue={props.maximumValue}
				/>
				<UiButton
					size={'sm'}
					mod={'primary'}
					font={'Roboto'}
					leftIcon={<UiText fontSize={'24px'}>+</UiText>}
					loading={!props.disabled && props.loading}
					disabled={props.disabled}
					icon
					shimmer
					whenClick={props.whenUpgrade}
				/>
				<CoinCounter coins={props.upgradeCost} />
			</div>
		)
	}
})
