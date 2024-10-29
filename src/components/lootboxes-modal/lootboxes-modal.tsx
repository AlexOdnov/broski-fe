import {computed, defineComponent, nextTick, onMounted, type PropType, ref, type VNode} from 'vue'
import {UiBottomSheet, type UiBottomSheetMethods, UiButton, UiText} from '@/components'

import styles from './lootboxes-modal.module.css'
import {OpenConveyorBelt, type OpenConveyorBeltMethods} from "@/components/lootboxes-modal/open-conveyor-belt";
import {GiftIcon, TicketIcon} from "@/components/icons";
import {useLootboxesStore} from "@/stores/lootboxes";
import {useLocalization} from "@/services/localization";
import {useUserStore} from "@/stores/user";

enum LootboxesModalState {
	default = 'default',
	boxOpen = 'boxOpen',
	rolling = 'rolling',
	prize = 'prize',
}

export const LootboxesModal = defineComponent({
	props: { openButton: { type: Object as PropType<VNode>, required: false } },
	name: 'LootboxesModal',
	setup: (props) => {
		const lootboxesStore = useLootboxesStore()
		const userStore = useUserStore()
		const openConveyorBeltRef = ref<OpenConveyorBeltMethods | null>(null)
		const lootboxModal = ref<UiBottomSheetMethods | null>(null)
		const currentState = ref(LootboxesModalState.default)
		const winIndex = ref(0)
		const { t } = useLocalization()

		const prizes = computed(() => lootboxesStore.prizes)

		onMounted(async () => {
			currentState.value = LootboxesModalState.default
		})

		const openModal = () => {
			lootboxModal.value?.open()
		}
		const open = () => {
			currentState.value = LootboxesModalState.boxOpen
		}
		const claim = async () => {
			await userStore.loadUser()
			currentState.value = LootboxesModalState.default
		}

		const rollConveyor = async () => {
			try {
				const result = await lootboxesStore.openLootbox()
				if (result) {
					const idx = lootboxesStore.prizes.findIndex( p => p.item === result)
					if( idx !== -1 ) {
						winIndex.value = idx
					}
				}
				openConveyorBeltRef.value?.open()
			} catch (error) { console.warn(error) }
		}

		return () => (<>
			{props.openButton && <div onClick={openModal}>{props.openButton}</div>}
			<UiBottomSheet
				ref={lootboxModal}
				fullscreen
				withExitButton
				body={
					<div class={styles.content}>
						<div class={styles.card} style={currentState.value === LootboxesModalState.boxOpen && {padding: 0}}>
							{currentState.value === LootboxesModalState.default && <>
								<img class={styles.lootboxImage} src="/images/lootbox-open-static.webp"/>
								<UiText
									color="rgba(240, 240, 240, 1)"
									fontFamily="barcadeBrawl"
									fontSize="16px"
									fontWeight={400}
									lineHeight="16px"
									shadow
									alignCenter>bronze</UiText>
								<div class={styles.darkCard}>
									<UiText
										color={"rgba(121, 121, 121, 1)"}
										fontSize="14px"
										fontWeight={400}
										lineHeight="14px"
										alignCenter
									>{t('lootboxes.youHave')}:</UiText>
									<UiText
										color={"rgba(255, 184, 0, 1)"}
										fontSize="14px"
										fontWeight={400}
										lineHeight="14px"
										alignCenter
									>&nbsp;{userStore.user?.boxes}&nbsp;</UiText>
									<GiftIcon height={14}/>
								</div>
							</>}
							{currentState.value === LootboxesModalState.boxOpen &&
								<video
									class={styles.lootboxImageVideo}
									src="/videos/lootbox-open.mp4"
									autoplay
									onEnded={async () => {
										currentState.value = LootboxesModalState.rolling
										await nextTick()
										rollConveyor()
									}}
								/>}
							{currentState.value === LootboxesModalState.rolling && <OpenConveyorBelt
								class={styles.conveyor}
								ref={openConveyorBeltRef}
								items={prizes.value}
								winIndex={winIndex.value}
								onAnimationEnd={() => {
									currentState.value = LootboxesModalState.prize
								}}
							/>}
							{currentState.value === LootboxesModalState.prize && <>
								<img class={styles.prizeShowImg} src={prizes.value?.at(winIndex.value)?.image ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuwAjENpDBsnhb91rzlQxF39KqlCZxHqHVig&s'} />
							</>}
						</div>
						{currentState.value === LootboxesModalState.prize && <UiButton mod={'primary'} size={'lg'} text={t('lootboxes.claim')} whenClick={claim}/>}
						{currentState.value !== LootboxesModalState.prize && <UiButton disabled={currentState.value !== LootboxesModalState.default} mod={'primary'} size={'lg'} text={t('lootboxes.open')} whenClick={open}/>}
						<UiButton disabled={currentState.value !== LootboxesModalState.default} mod={'secondary'} size={'lg'} text={t('lootboxes.buy')} whenClick={() => null}/>
						<div class={styles.costsText}>
							<UiText
								color={"rgba(121, 121, 121, 1)"}
								fontSize="14px"
								fontWeight={400}
								lineHeight="14px"
								alignCenter
							>{t('lootboxes.openingCosts')}:</UiText>
							<UiText
								color={"rgba(255, 184, 0, 1)"}
								fontSize="14px"
								fontWeight={400}
								lineHeight="14px"
								alignCenter
							>&nbsp;1&nbsp;</UiText>
							<TicketIcon height={14}/>
						</div>
						<div class={styles.prizes}>{prizes.value.map(prize => (<img class={styles.prize} src={prize.image} />))}</div>
					</div>
				}
			/>
		</>)
	}
})
