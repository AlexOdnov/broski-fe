import { defineComponent } from 'vue'

import styles from './styles.module.css'
import {
	LevelCounter,
	EnergyCounter,
	PlayerInventory,
	PowerCounter,
	PlayerAbilities
} from '@/components/pvp'
import { usePvpStore } from '@/stores/pvp'

const PvpProfilePage = defineComponent({
	name: 'PvpProfilePage',
	setup() {
		const pvpStore = usePvpStore()

		return () => (
			<div class={styles.pvpProfile}>
				<LevelCounter
					level={pvpStore.pvpCharacter?.level ?? 1}
					expirience={1}
					expirienceLimit={10}
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
			</div>
		)
	}
})

export default PvpProfilePage
