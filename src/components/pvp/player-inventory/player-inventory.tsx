import { computed, defineComponent } from 'vue'
import styles from './player-inventory.module.css'
import { UiButton, UiText } from '@/components/ui'
import { StarsIcon, TgIcon } from '@/components/icons'
import { usePvpStore } from '@/stores/pvp'
import { useLocalization } from '@/services/localization'
import { DefencePotionIcon } from '@/components/icons/defence-potion-icon'
import { CombinationPotionIcon } from '@/components/icons/combination-potion-icon'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { envVariables } from '@/services/env'

export const PlayerInventory = defineComponent({
	name: 'PlayerInventory',
	setup: () => {
		const { t } = useLocalization()
		const pvpStore = usePvpStore()
		const tgStore = useTgSdkStore()

		const defencePotion = computed(() => pvpStore.pvpCharacter?.tonic.red_tonic ?? 0)
		const combinationPotion = computed(() => pvpStore.pvpCharacter?.tonic.green_tonic ?? 0)

		const soonItems = computed(() => new Array(2).fill(t('soon')))

		const imgSrc = computed(() =>
			pvpStore.isCharacterPremium ? '/images/user-prem.webp' : '/images/user.webp'
		)

		return () => (
			<div class={styles.playerInventory}>
				<div class={styles.items}>
					{soonItems.value.map((el) => (
						<div class={styles.item}>
							<UiText fontWeight={400} fontSize={'12px'}>
								{el}
							</UiText>
						</div>
					))}
					<UiButton
						disabled
						bordered
						mod={'secondary'}
						text={t('soon')}
						whenClick={() => {}}
						size={'sm'}
						class={styles.button}
					/>
				</div>
				<div class={styles.separator} />
				<div class={styles.avatarWrapper}>
					<img src={imgSrc.value} class={styles.playerAvatar} />
					{pvpStore.isCharacterPremium && <StarsIcon class={styles.premIcon} />}
				</div>
				<div class={styles.separator} />
				<div class={styles.items}>
					{defencePotion.value > 0 ? (
						<div class={styles.item}>
							<DefencePotionIcon />
							<span>
								<UiText fontSize={'12px'} color="#F0F0F0" lineHeight="12px">
									{defencePotion.value}
								</UiText>
								&nbsp;
								<UiText fontSize={'8px'} color="#797979" lineHeight="8px">
									left
								</UiText>
							</span>
						</div>
					) : (
						<div class={styles.item}>
							<UiText fontWeight={400} fontSize={'12px'}></UiText>
						</div>
					)}
					{combinationPotion.value > 0 ? (
						<div class={styles.item}>
							<CombinationPotionIcon />
							<span>
								<UiText fontSize={'12px'} color="#F0F0F0" lineHeight="12px">
									{combinationPotion.value}
								</UiText>
								&nbsp;
								<UiText fontSize={'8px'} color="#797979" lineHeight="8px">
									left
								</UiText>
							</span>
						</div>
					) : (
						<div class={styles.item}>
							<UiText fontWeight={400} fontSize={'12px'}></UiText>
						</div>
					)}
					<UiButton
						bordered
						mod={'secondary'}
						text={t('chat')}
						whenClick={() => {
							tgStore.openLink(envVariables.chatUrl)
						}}
						size={'sm'}
						leftIcon={
							<UiText isAccent>
								<TgIcon />
							</UiText>
						}
						class={styles.button}
					/>
				</div>
			</div>
		)
	}
})
