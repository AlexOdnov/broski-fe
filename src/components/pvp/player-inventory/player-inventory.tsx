import { computed, defineComponent } from 'vue'
import styles from './player-inventory.module.css'
import { UiText } from '@/components/ui'
import { useI18n } from 'vue-i18n'
import { StarsIcon } from '@/components/icons'
import { usePvpStore } from '@/stores/pvp'

export const PlayerInventory = defineComponent({
	name: 'PlayerInventory',
	setup: () => {
		const { t } = useI18n()
		const pvpStore = usePvpStore()

		const items = new Array(8).fill(t('soon'))

		const imgSrc = computed(() =>
			pvpStore.pvpCharacter?.premium?.active
				? '/images/user-prem.webp'
				: '/images/user-halloween.webp'
		)

		return () => (
			<div class={styles.playerInventory}>
				<div class={styles.avatarWrapper}>
					<img src={imgSrc.value} class={styles.playerAvatar} />
					{pvpStore.pvpCharacter?.premium?.active && <StarsIcon class={styles.premIcon} />}
				</div>
				<div class={styles.separator} />
				<div class={styles.items}>
					{items.map((el) => (
						<div class={styles.item}>
							<UiText fontWeight={400} fontSize={'12px'}>
								{el}
							</UiText>
						</div>
					))}
				</div>
			</div>
		)
	}
})
