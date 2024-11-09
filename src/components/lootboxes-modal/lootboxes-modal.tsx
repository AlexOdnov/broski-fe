import { computed, defineComponent, nextTick, onMounted, type PropType, ref, type VNode } from 'vue'
import { UiBottomSheet, type UiBottomSheetMethods, UiButton, UiText } from '@/components'

import styles from './lootboxes-modal.module.css'
import {
	OpenConveyorBelt,
	type OpenConveyorBeltMethods
} from '@/components/lootboxes-modal/open-conveyor-belt'
import { GiftIcon, StarsIcon, TicketIcon } from '@/components/icons'
import { useLootboxesStore } from '@/stores/lootboxes'
import { useLocalization } from '@/services/localization'
import { useUserStore } from '@/stores/user'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { envVariables } from '@/services/env'
import { usePvpStore } from '@/stores/pvp'

enum LootboxesModalState {
	default = 'default',
	boxOpen = 'boxOpen',
	rolling = 'rolling',
	prize = 'prize'
}

export const LootboxesModal = defineComponent({
	props: { openButton: { type: Object as PropType<VNode>, required: false } },
	name: 'LootboxesModal',
	setup: (props) => {
		const lootboxesStore = useLootboxesStore()
		const userStore = useUserStore()
		const pvpStore = usePvpStore()
		const tgStore = useTgSdkStore()
		const openConveyorBeltRef = ref<OpenConveyorBeltMethods | null>(null)
		const lootboxModal = ref<UiBottomSheetMethods | null>(null)
		const currentState = ref(LootboxesModalState.default)
		const winIndex = ref(0)
		const { t } = useLocalization()

		const prizes = computed(() => lootboxesStore.prizes)

		onMounted(async () => {
			await lootboxesStore.loadPrizes()
			currentState.value = LootboxesModalState.default
		})

		const openModal = () => {
			lootboxModal.value?.open()
		}
		const open = () => {
			currentState.value = LootboxesModalState.boxOpen
			setTimeout(async () => {
				currentState.value = LootboxesModalState.rolling
				await nextTick()
				rollConveyor()
			}, 3000)
		}
		const claim = async () => {
			await Promise.all([userStore.loadUser(), pvpStore.loadPvpCharacter()])
			currentState.value = LootboxesModalState.default
			openConveyorBeltRef.value?.reset()
		}
		const buy = async () => {
			tgStore.openInvoice(envVariables.imvoiceLootboxBuy, (status) => {
				if (status === 'cancelled') {
					return
				}
				setTimeout(() => {
					userStore.loadUser()
					tgStore.hapticFeedback('soft')
				}, 500)
			})
		}

		const rollConveyor = async () => {
			try {
				const result = await lootboxesStore.openLootbox()
				if (result) {
					const idx = lootboxesStore.prizes.findIndex((p) => p.item === result)
					if (idx !== -1) {
						winIndex.value = idx
					}
					await nextTick()
					openConveyorBeltRef.value?.open()
				} else {
					currentState.value = LootboxesModalState.default
				}
			} catch (error) {
				console.warn(error)
			}
		}

		return () => (
			<>
				{props.openButton && <div onClick={openModal}>{props.openButton}</div>}
				<UiBottomSheet
					ref={lootboxModal}
					fullscreen
					withExitButton
					body={
						<div class={styles.content}>
							<div
								class={styles.card}
								style={
									currentState.value === LootboxesModalState.boxOpen &&
									'padding: 0; min-height: min-content;'
								}
							>
								{currentState.value === LootboxesModalState.default && (
									<>
										<img class={styles.lootboxImage} src="/images/lootbox-open-static.webp" />
										<UiText
											color="rgba(240, 240, 240, 1)"
											fontFamily="barcadeBrawl"
											fontSize="16px"
											fontWeight={400}
											lineHeight="16px"
											shadow
											alignCenter
										>
											bronze
										</UiText>
										<div class={styles.darkCard}>
											<UiText
												color={'rgba(121, 121, 121, 1)'}
												fontSize="14px"
												fontWeight={400}
												lineHeight="14px"
												alignCenter
											>
												{t('lootboxes.youHave')}:
											</UiText>
											<UiText
												color={'rgba(255, 184, 0, 1)'}
												fontSize="14px"
												fontWeight={400}
												lineHeight="14px"
												alignCenter
											>
												&nbsp;{userStore.user?.boxes}&nbsp;
											</UiText>
											<GiftIcon height={14} />
										</div>
									</>
								)}
								{currentState.value === LootboxesModalState.boxOpen && (
									<video
										class={styles.lootboxImageVideo}
										src="/videos/lootbox-open.mp4"
										autoplay
										playsinline
										onEnded={async () => {}}
									/>
								)}
								{currentState.value === LootboxesModalState.rolling && (
									<div class={styles.conveyorWrapper}>
										<OpenConveyorBelt
											class={styles.conveyor}
											ref={openConveyorBeltRef}
											items={prizes.value}
											winIndex={winIndex.value}
											onAnimationEnd={() => {
												currentState.value = LootboxesModalState.prize
												tgStore.hapticFeedback('soft')
											}}
										/>
									</div>
								)}
								{currentState.value === LootboxesModalState.prize && (
									<>
										<img
											class={styles.prizeShowImg}
											src={
												prizes.value?.at(winIndex.value)?.image ??
												'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuwAjENpDBsnhb91rzlQxF39KqlCZxHqHVig&s'
											}
										/>
										<div class={styles.darkCard}>
											<UiText
												color={'rgba(121, 121, 121, 1)'}
												fontSize="14px"
												fontWeight={400}
												lineHeight="14px"
												alignCenter
											>
												{prizes.value?.at(winIndex.value)?.description}
											</UiText>
										</div>
									</>
								)}
							</div>
							{currentState.value === LootboxesModalState.prize && (
								<UiButton
									mod={'primary'}
									size={'lg'}
									text={t('lootboxes.claim')}
									whenClick={claim}
								/>
							)}
							{currentState.value !== LootboxesModalState.prize && (
								<UiButton
									disabled={
										currentState.value !== LootboxesModalState.default ||
										userStore.user?.boxes === 0
									}
									mod={'primary'}
									size={'lg'}
									text={t('lootboxes.open')}
									whenClick={open}
								/>
							)}
							<UiButton
								disabled={currentState.value !== LootboxesModalState.default}
								leftIcon={<StarsIcon />}
								mod={'inverse'}
								size={'lg'}
								text={t('lootboxes.buy')}
								whenClick={buy}
							/>
							<div class={styles.prizes}>
								{prizes.value.map((prize) => (
									<img key={prize.item} class={styles.prize} src={prize.image} />
								))}
							</div>
						</div>
					}
				/>
			</>
		)
	}
})
