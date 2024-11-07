import { computed, defineComponent } from 'vue'
import styles from './player-inventory.module.css'
import { UiText } from '@/components/ui'
import { StarsIcon } from '@/components/icons'
import { usePvpStore } from '@/stores/pvp'
import { useLocalization } from '@/services/localization'

export const PlayerInventory = defineComponent({
	name: 'PlayerInventory',
	setup: () => {
		const { t } = useLocalization()
		const pvpStore = usePvpStore()

		const items = new Array(8).fill(t('soon'))

		const imgSrc = computed(() =>
			pvpStore.isCharacterPremium ? '/images/user-prem.webp' : '/images/user.webp'
		)

		return () => (
			<div class={styles.playerInventory}>
				<div class={styles.avatarWrapper}>
					<img src={imgSrc.value} class={styles.playerAvatar} />
					{pvpStore.isCharacterPremium && <StarsIcon class={styles.premIcon} />}
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
