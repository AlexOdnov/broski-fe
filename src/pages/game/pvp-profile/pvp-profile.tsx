import { defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import {
	LevelCounter,
	EnergyCounter,
	PlayerInventory,
	PowerCounter,
	PlayerAbilities,
	BuyPremium
} from '@/components/pvp'
import { usePvpStore } from '@/stores/pvp'
import { UiButton, type UiBottomSheetMethods } from '@/components'
import { useLocalization } from '@/services/localization'

const PvpProfilePage = defineComponent({
	name: 'PvpProfilePage',
	setup() {
		const pvpStore = usePvpStore()
		const { t } = useLocalization()

		const premiumModal = ref<UiBottomSheetMethods | null>(null)

		return () => (
			<div class={styles.pvpProfile}>
				<LevelCounter
					level={pvpStore.pvpCharacter?.level ?? 1}
					experience={pvpStore.pvpCharacter?.experience.current_experience ?? 1}
					experienceLimit={pvpStore.pvpCharacter?.experience.maximum_experience ?? 1}
				/>
				{!pvpStore.isCharacterPremium && (
					<UiButton
						text={t('premium.getPremium')}
						loading={pvpStore.isLoading}
						whenClick={() => premiumModal.value?.open()}
					/>
				)}
				<PlayerInventory />
				<div class={styles.parameters}>
					<PowerCounter power={pvpStore.pvpCharacter?.power ?? 0} />
					<div class={styles.separator} />
					<EnergyCounter
						currentEnergy={pvpStore.pvpCharacter?.energy.remaining ?? 0}
						totalEnergy={pvpStore.pvpCharacter?.energy.maximum ?? 0}
						timeToRestore={pvpStore.timeToRestoreEnergy}
					/>
				</div>
				<PlayerAbilities />
				<BuyPremium ref={premiumModal} />
			</div>
		)
	}
})

export default PvpProfilePage
