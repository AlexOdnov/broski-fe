import { defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import { PlayerInventory, PlayerAbilities, BuyPremium } from '@/components/pvp'
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
				<PlayerInventory />
				{!pvpStore.isCharacterPremium && (
					<UiButton
						text={t('premium.getPremium')}
						loading={pvpStore.isLoading}
						whenClick={() => premiumModal.value?.open()}
					/>
				)}
				<PlayerAbilities />
				<BuyPremium ref={premiumModal} />
			</div>
		)
	}
})

export default PvpProfilePage
