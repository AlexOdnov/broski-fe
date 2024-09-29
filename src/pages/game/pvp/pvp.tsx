import { defineComponent, onMounted, ref } from 'vue'

import styles from './pvp.module.css'
import { EnergyCounter } from '@/components/pvp/energy-counter'
import { usePvpStore } from '@/stores/pvp'

const PvpPage = defineComponent({
	name: 'PvpPage',
	setup() {
		const pvpStore = usePvpStore()
		const loading = ref(true)
		onMounted(async () => {
			await pvpStore.loadCharacter()
			loading.value = false
		})
		return () => (
			<div class={styles.pvp}>
				{!loading.value && (
					<EnergyCounter
						class={styles.fullWidth}
						currentEnergy={pvpStore.character?.energy.remaining ?? 0}
						totalEnergy={pvpStore.character?.energy.maximum ?? 0}
					/>
				)}
			</div>
		)
	}
})

export default PvpPage
