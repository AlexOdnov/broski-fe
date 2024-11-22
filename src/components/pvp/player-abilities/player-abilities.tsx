import { computed, defineComponent } from 'vue'
import styles from './player-abilities.module.css'
import { UiText } from '@/components/ui'
import { PlayerAbility } from './player-ability'
import { usePvpStore } from '@/stores/pvp'
import type { AbilityScores, AbilityScoresDelta } from '@/api/generatedApi'
import { useUserStore } from '@/stores/user'
import { useLocalization } from '@/services/localization'
import { PowerCounter } from '../power-counter'

export const PlayerAbilities = defineComponent({
	name: 'PlayerAbilities',
	setup: () => {
		const pvpStore = usePvpStore()
		const userStore = useUserStore()
		const { t } = useLocalization()

		const maximumAbilityValue = computed(() => {
			return Math.max(...Object.values(pvpStore.pvpCharacterAbilities)) ?? 1
		})

		const upgradeAbility = (key: keyof AbilityScoresDelta) => {
			pvpStore.upgradePvpCharacterAbility({
				[key]: 1
			})
		}

		const isDisabled = (key: keyof AbilityScores) => {
			return pvpStore.abilityUpgradeCosts[key] > userStore.userScore
		}

		return () => (
			<div class={styles.playerAbilities}>
				<div class={styles.header}>
					<PowerCounter
						hideProgressBar
						power={pvpStore.pvpCharacter?.power || 0}
						totalPower={pvpStore.pvpCharacter?.power}
					/>
					<UiText color={'#797979'} fontSize={'18px'} fontWeight={500}>
						{t('pvp.upgrades')}
					</UiText>
				</div>
				<PlayerAbility
					abilityType={'strength'}
					currentValue={pvpStore.pvpCharacterAbilities.strength}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={pvpStore.abilityUpgradeCosts.strength}
					loading={pvpStore.isLoading}
					disabled={isDisabled('strength')}
					whenUpgrade={() => upgradeAbility('strength')}
				/>
				<PlayerAbility
					abilityType={'defence'}
					currentValue={pvpStore.pvpCharacterAbilities.defence}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={pvpStore.abilityUpgradeCosts.defence}
					loading={pvpStore.isLoading}
					disabled={isDisabled('defence')}
					whenUpgrade={() => upgradeAbility('defence')}
				/>
				<PlayerAbility
					abilityType={'speed'}
					currentValue={pvpStore.pvpCharacterAbilities.speed}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={pvpStore.abilityUpgradeCosts.speed}
					loading={pvpStore.isLoading}
					disabled={isDisabled('speed')}
					whenUpgrade={() => upgradeAbility('speed')}
				/>
				<PlayerAbility
					abilityType={'weight'}
					currentValue={pvpStore.pvpCharacterAbilities.weight}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={pvpStore.abilityUpgradeCosts.weight}
					loading={pvpStore.isLoading}
					disabled={isDisabled('weight')}
					whenUpgrade={() => upgradeAbility('weight')}
				/>
				<PlayerAbility
					abilityType={'combinations'}
					currentValue={pvpStore.pvpCharacterAbilities.combinations}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={pvpStore.abilityUpgradeCosts.combinations}
					loading={pvpStore.isLoading}
					disabled={isDisabled('combinations')}
					whenUpgrade={() => upgradeAbility('combinations')}
				/>
			</div>
		)
	}
})
