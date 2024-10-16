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
import { UiBottomSheet, UiButton, type UiBottomSheetMethods } from '@/components'
import { useI18n } from 'vue-i18n'

const PvpProfilePage = defineComponent({
	name: 'PvpProfilePage',
	setup() {
		const pvpStore = usePvpStore()
		const { t } = useI18n()

		const premiumModal = ref<UiBottomSheetMethods | null>(null)

		return () => (
			<div class={styles.pvpProfile}>
				<LevelCounter
					level={pvpStore.pvpCharacter?.level ?? 1}
					experience={pvpStore.pvpCharacter?.experience.current_experience ?? 1}
					experienceLimit={pvpStore.pvpCharacter?.experience.maximum_experience ?? 1}
				/>
				<UiButton
					text={t('premium.becomeSuperbro')}
					loading={pvpStore.isLoading}
					whenClick={() => premiumModal.value?.open()}
				/>
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
				<UiBottomSheet
					ref={premiumModal}
					body={<BuyPremium whenBuyPremium={() => premiumModal.value?.close()} />}
					fullscreen
					withExitButton
				/>
			</div>
		)
	}
})

export default PvpProfilePage
