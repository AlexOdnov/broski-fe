import { defineComponent } from 'vue'
import styles from './player-inventory.module.css'
import { UiText } from '@/components/ui'

export const PlayerInventory = defineComponent({
	name: 'PlayerInventory',
	setup: () => {
		const items = new Array(8).fill('soon')

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
