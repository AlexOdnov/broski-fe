import { defineComponent } from 'vue'

import styles from './styles.module.css'
import { LevelCounter, EnergyCounter, PlayerInventory, PowerCounter } from '@/components/pvp'

const PvpProfilePage = defineComponent({
	name: 'PvpProfilePage',
	setup() {
		return () => (
			<div class={styles.pvpProfile}>
				<LevelCounter level={1} expirience={1} expirienceLimit={1} levelName={'Newbie'} />
				<PlayerInventory />
				<div class={styles.parameters}>
					<PowerCounter power={322} />
					<div class={styles.separator} />
					<EnergyCounter currentEnergy={1} totalEnergy={2} />
				</div>
			</div>
		)
	}
})

export default PvpProfilePage
