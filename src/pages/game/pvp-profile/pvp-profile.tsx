import { computed, defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import { PlayerInventory } from '@/components/pvp/player-inventory'

const PvpProfilePage = defineComponent({
	name: 'PvpProfilePage',
	setup() {
		return () => (
			<div class={styles.pvpProfile}>
				<PlayerInventory />
			</div>
		)
	}
})

export default PvpProfilePage
