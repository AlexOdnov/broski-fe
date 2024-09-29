import { defineComponent } from 'vue'
import styles from './player-abilities.module.css'
import { UiText } from '@/components/ui'
import { PlayerAbility } from './player-ability'

export const PlayerAbilities = defineComponent({
	name: 'PlayerAbilities',
	setup: () => {
		return () => (
			<div class={styles.playerAbilities}>
				<UiText color={'#797979'} fontSize={'18px'} fontWeight={500} alignCenter>
					Upgrades
				</UiText>
				<PlayerAbility
					abilityType={'strength'}
					currentValue={12}
					maximumValue={55}
					upgradeCost={999999}
					whenUpgrade={() => {}}
				/>
				<PlayerAbility
					abilityType={'defence'}
					currentValue={12}
					maximumValue={55}
					upgradeCost={999999}
					whenUpgrade={() => {}}
				/>
				<PlayerAbility
					abilityType={'speed'}
					currentValue={12}
					maximumValue={55}
					upgradeCost={999999}
					whenUpgrade={() => {}}
				/>
				<PlayerAbility
					abilityType={'weight'}
					currentValue={12}
					maximumValue={55}
					upgradeCost={999999}
					whenUpgrade={() => {}}
				/>
				<PlayerAbility
					abilityType={'combinations'}
					currentValue={12}
					maximumValue={55}
					upgradeCost={999999}
					whenUpgrade={() => {}}
				/>
			</div>
		)
	}
})
