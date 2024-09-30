import { defineComponent } from 'vue'
import styles from './player-inventory.module.css'
import { UiText } from '@/components/ui'
import { useI18n } from 'vue-i18n'

export const PlayerInventory = defineComponent({
	name: 'PlayerInventory',
	setup: () => {
		const { t } = useI18n()
		const items = new Array(8).fill(t('soon'))

		return () => (
			<div class={styles.playerInventory}>
				<img src="/images/pvp-avatar.webp" class={styles.playerAvatar} />
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
