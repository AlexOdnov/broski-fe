import {defineComponent, onMounted, onUnmounted, type PropType, ref, type VNode} from 'vue'
import {UiBottomSheet, type UiBottomSheetMethods, UiButton} from '@/components'

import styles from './lootboxes-modal.module.css'
import {OpenConveyorBelt, type OpenConveyorBeltMethods} from "@/components/lootboxes-modal/open-conveyor-belt";

const items = [
	{text: 'item 1', img: ''},
	{text: 'item 2', img: ''},
	{text: 'item 3', img: ''},
	{text: 'item 4', img: ''},
	{text: 'item 5', img: ''},
	{text: 'item 6', img: ''},
	{text: 'item 7', img: ''},
	{text: 'item 8', img: ''},
	{text: 'item 9', img: ''},
	{text: 'item 10', img: ''},
	{text: 'item 11', img: ''},
	{text: 'item 12', img: ''},
	{text: 'item 13', img: ''},
	{text: 'item 14', img: ''},
	{text: 'item 15', img: ''},
	{text: 'item 16', img: ''},
	{text: 'item 17', img: ''},
	{text: 'item 18', img: ''},
	{text: 'item 19', img: ''},
	{text: 'item 20', img: ''},
	{text: 'item 21', img: ''},
	{text: 'item 22', img: ''},
	{text: 'item 23', img: ''},
	{text: 'item 24', img: ''},
	{text: 'item 25', img: ''},
	{text: 'item 26', img: ''},
	{text: 'item 27', img: ''},
	{text: 'item 28', img: ''},
	{text: 'item 29', img: ''},
	{text: 'item 30', img: ''},
	{text: 'item 31', img: ''},
	{text: 'item 32', img: ''},
	{text: 'item 33', img: ''},
	{text: 'item 34', img: ''},
	{text: 'item 35', img: ''},
	{text: 'item 36', img: ''},
	{text: 'item 37', img: ''},
	{text: 'item 38', img: ''},
	{text: 'item 39', img: ''},
	{text: 'item 40', img: ''},
]

export const LootboxesModal = defineComponent({
	props: {
		openButton: {type: Object as PropType<VNode>, required: false},
	},
	name: 'LootboxesModal',
	setup: (props) => {
		const openConveyorBeltRef = ref<OpenConveyorBeltMethods | null>(null)
		const lootboxModal = ref<UiBottomSheetMethods | null>(null)

		const openModal = () => {
			lootboxModal.value?.open()
		}
		const open = () => {
			openConveyorBeltRef.value?.open()
		}

		return () => (<>
			{props.openButton && <div onClick={openModal}>{props.openButton}</div>}
			<UiBottomSheet
				ref={lootboxModal}
				fullscreen
				withExitButton
				body={
					<>
						<OpenConveyorBelt
							ref={openConveyorBeltRef}
							items={items}
							targetElementIdx={32}
						/>
						<UiButton mod={'primary'} size={'lg'} text={'опен'} whenClick={open}/>
					</>
				}
			/>
		</>)
	}
})
