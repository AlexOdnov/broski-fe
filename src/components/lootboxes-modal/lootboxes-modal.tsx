import {computed, defineComponent, nextTick, onMounted, type PropType, ref, type VNode} from 'vue'
import {UiBottomSheet, type UiBottomSheetMethods, UiButton, UiText} from '@/components'

import styles from './lootboxes-modal.module.css'
import {OpenConveyorBelt, type OpenConveyorBeltMethods} from "@/components/lootboxes-modal/open-conveyor-belt";
import {GiftIcon, TicketIcon} from "@/components/icons";
import {useLootboxesStore} from "@/stores/lootboxes";

enum LootboxesModalState {
	default = 'default',
	boxOpen = 'boxOpen',
	rolling = 'rolling',
	prize = 'rolling',
}

export const LootboxesModal = defineComponent({
	props: { openButton: { type: Object as PropType<VNode>, required: false } },
	name: 'LootboxesModal',
	setup: (props) => {
		const lootboxesStore = useLootboxesStore()
		const openConveyorBeltRef = ref<OpenConveyorBeltMethods | null>(null)
		const lootboxModal = ref<UiBottomSheetMethods | null>(null)
		const currentState = ref(LootboxesModalState.default)
		const winIndex = ref(0)

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
					<>
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
									>You got:</UiText>
									<UiText
										color={"rgba(255, 184, 0, 1)"}
										fontSize="14px"
										fontWeight={400}
										lineHeight="14px"
										alignCenter
									>&nbsp;12&nbsp;</UiText>
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
							/>}
						</div>
						<UiButton mod={'primary'} size={'lg'} text={'опен'} whenClick={open}/>
						<UiButton mod={'secondary'} size={'lg'} text={'буй'} whenClick={() => null}/>
						<div class={styles.costsText}>
							<UiText
								color={"rgba(121, 121, 121, 1)"}
								fontSize="14px"
								fontWeight={400}
								lineHeight="14px"
								alignCenter
							>Opening costs:</UiText>
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
					</>
				}
			/>
		</>)
	}
})
