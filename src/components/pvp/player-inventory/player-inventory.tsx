import { computed, defineComponent } from 'vue'
import styles from './player-inventory.module.css'
import { UiText } from '@/components/ui'
import { StarsIcon } from '@/components/icons'
import { usePvpStore } from '@/stores/pvp'
import { useLocalization } from '@/services/localization'
import { DefencePotionIcon } from '@/components/icons/defence-potion-icon'
import { CombinationPotionIcon } from '@/components/icons/combination-potion-icon'

export const PlayerInventory = defineComponent({
	name: 'PlayerInventory',
	setup: () => {
		const { t } = useLocalization()
		const pvpStore = usePvpStore()

		const defencePotion = computed(() => 14)
		const combinationPotion = computed(() => 88)
		const soonItems = computed(() => {
			let soonItemsQuantity = 8
			if (defencePotion.value > 0) {
				soonItemsQuantity--
			}
			if (combinationPotion.value > 0) {
				soonItemsQuantity--
			}
			return new Array(soonItemsQuantity).fill(t('soon'))
		})

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
					{defencePotion.value > 0 && (
						<div class={styles.item}>
							<DefencePotionIcon />
							<span>
								<UiText fontSize={'12px'} color="#F0F0F0" lineHeight="12px">
									{defencePotion.value}
								</UiText>&nbsp;
								<UiText fontSize={'8px'} color="#797979" lineHeight="8px">
									left
								</UiText>
							</span>
						</div>
					)}
					{combinationPotion.value > 0 && (
						<div class={styles.item}>
							<CombinationPotionIcon />
							<span>
								<UiText fontSize={'12px'} color="#F0F0F0" lineHeight="12px">
									{combinationPotion.value}
								</UiText>&nbsp;
								<UiText fontSize={'8px'} color="#797979" lineHeight="8px">
									left
								</UiText>
							</span>
						</div>
					)}
					{soonItems.value.map((el) => (
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
