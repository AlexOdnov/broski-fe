import { defineComponent, onMounted, ref } from 'vue'

import styles from './pvp.module.css'
import { EnergyCounter } from '@/components/pvp/energy-counter'
import { usePvpStore } from '@/stores/pvp'
import { ProfileIcon } from '@/components/icons'
import { useTgSdkStore } from '@/stores/tg-sdk'

const PvpPage = defineComponent({
	name: 'PvpPage',
	setup() {
		const pvpStore = usePvpStore()
		const loading = ref(true)
		const tgStore = useTgSdkStore()
		onMounted(async () => {
			await pvpStore.loadPvpCharacter()
			loading.value = false
		})
		return () => (
			<div class={styles.pvp}>
				{!loading.value && (
					<EnergyCounter
						class={styles.fullWidth}
						currentEnergy={pvpStore.pvpCharacter?.energy.remaining ?? 0}
						totalEnergy={pvpStore.pvpCharacter?.energy.maximum ?? 0}
					/>
				)}
				<div class={styles.card}>
					<div class={styles.flexRow}>
						<div class={styles.profileIconWrapper}>
							<ProfileIcon size={10} />
						</div>
						{tgStore.user?.username ?? 'user'}
					</div>
					<div class={[styles.you, styles.profile, styles.yellowBorder]} />
				</div>
				<div class={styles.card}>
					<div class={styles.flexRow}>
						<div class={styles.profileIconWrapper}>
							<ProfileIcon size={10} />
						</div>
						{pvpStore.pvpMatch?.opponent.username ?? 'looking for enemy'}
					</div>
					<div class={[styles.enemy, styles.profile, styles.yellowBorder]} />
				</div>
			</div>
		)
	}
})

export default PvpPage
