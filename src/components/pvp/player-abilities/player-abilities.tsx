import { computed, defineComponent } from 'vue'
import styles from './player-abilities.module.css'
import { UiText } from '@/components/ui'
import { PlayerAbility } from './player-ability'
import { usePvpStore } from '@/stores/pvp'
import type { AbilityScores, AbilityScoresDelta } from '@/api/generatedApi'
import { useI18n } from 'vue-i18n'

export const PlayerAbilities = defineComponent({
	name: 'PlayerAbilities',
	setup: () => {
		const pvpStore = usePvpStore()
		const { t } = useI18n()

		const maximumAbilityValue = computed(() => {
			return Math.max(...Object.values(pvpStore.pvpCharacterAbilities)) ?? 1
		})

		const abilityUpgradeCosts = computed<Record<keyof AbilityScores, number>>(() => {
			return {
				combinations: Math.ceil(pvpStore.pvpCharacterAbilities.combinations ** 2.47),
				defence: Math.ceil(pvpStore.pvpCharacterAbilities.defence ** 2.3425),
				speed: Math.ceil(pvpStore.pvpCharacterAbilities.speed ** 2.27),
				strength: Math.ceil(pvpStore.pvpCharacterAbilities.strength ** 2.595),
				weight: Math.ceil(pvpStore.pvpCharacterAbilities.weight ** 2.38)
			}
		})

		const upgradeAbility = (key: keyof AbilityScoresDelta) => {
			pvpStore.upgradePvpCharacterAbility({
				[key]: 1
			})
		}

		return () => (
			<div class={styles.playerAbilities}>
				<UiText color={'#797979'} fontSize={'18px'} fontWeight={500} alignCenter>
					{t('pvp.upgrades')}
				</UiText>
				<PlayerAbility
					abilityType={'strength'}
					currentValue={pvpStore.pvpCharacterAbilities.strength}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={abilityUpgradeCosts.value.strength}
					loading={pvpStore.isLoading}
					whenUpgrade={() => upgradeAbility('strength')}
				/>
				<PlayerAbility
					abilityType={'defence'}
					currentValue={pvpStore.pvpCharacterAbilities.defence}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={abilityUpgradeCosts.value.defence}
					loading={pvpStore.isLoading}
					whenUpgrade={() => upgradeAbility('defence')}
				/>
				<PlayerAbility
					abilityType={'speed'}
					currentValue={pvpStore.pvpCharacterAbilities.speed}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={abilityUpgradeCosts.value.speed}
					loading={pvpStore.isLoading}
					whenUpgrade={() => upgradeAbility('speed')}
				/>
				<PlayerAbility
					abilityType={'weight'}
					currentValue={pvpStore.pvpCharacterAbilities.weight}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={abilityUpgradeCosts.value.weight}
					loading={pvpStore.isLoading}
					whenUpgrade={() => upgradeAbility('weight')}
				/>
				<PlayerAbility
					abilityType={'combinations'}
					currentValue={pvpStore.pvpCharacterAbilities.combinations}
					maximumValue={maximumAbilityValue.value}
					upgradeCost={abilityUpgradeCosts.value.combinations}
					loading={pvpStore.isLoading}
					whenUpgrade={() => upgradeAbility('combinations')}
				/>
			</div>
		)
	}
})
