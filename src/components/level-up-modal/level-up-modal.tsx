import { defineComponent, ref, watch } from 'vue'
import styles from './level-up-modal.module.css'
import { UiBottomSheet, UiButton, UiText, type UiBottomSheetMethods } from '@/components/ui'
import { usePvpStore } from '@/stores/pvp'
import { useLocalization } from '@/services/localization'
import { dropConfetti } from '@/utils/drop-confetti'

export const LevelUpModal = defineComponent({
	name: 'LevelUpModal',
	setup: () => {
		const { t } = useLocalization()
		const pvpStore = usePvpStore()

		const levelUpModal = ref<UiBottomSheetMethods | null>(null)

		watch(
			() => pvpStore.isLevelUp,
			() => {
				if (pvpStore.isLevelUp) {
					openModal()
				}
			}
		)

		const openModal = () => {
			levelUpModal.value?.open()
			dropConfetti()
		}

		const closeModal = () => {
			levelUpModal.value?.close()
			pvpStore.setIsLevelUp(false)
		}

		return () => (
			<UiBottomSheet
				ref={levelUpModal}
				fullscreen
				body={
					<div class={styles.levelUp}>
						<img class={styles.image} src="/images/level-up.webp" />
						<UiText color={'#F0F0F0'} fontSize={'22px'} fontWeight={500} alignCenter>
							{t('levelUp.newLevel')} {pvpStore.pvpCharacter?.level}
						</UiText>
						<UiText color={'#CBCBCB'} fontSize={'16px'}>
							{t('levelUp.congratulation')}
						</UiText>
					</div>
				}
				footer={<UiButton size={'lg'} whenClick={closeModal} text={t('levelUp.next')} />}
			/>
		)
	}
})
