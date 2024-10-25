import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { UiButton } from '@/components'

import styles from './lootboxes.module.css'

const item_size = 75
const item_gap = 5
const target_elem = 24

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const LootboxesPage = defineComponent({
	name: 'LootboxesPage',
	setup: () => {
		const divRef = ref<HTMLDivElement | null>(null)
		const width = ref(-1)
		const setWidth = () => {
			const _width = divRef.value?.clientWidth ?? window.innerWidth
			width.value = _width > 320 ? _width : 320
		}

		onMounted(() => {
			setWidth()
			window.addEventListener('resize', setWidth, true)
		})
		onUnmounted(() => {
			window.removeEventListener('resize', setWidth)
		})
		const items = [
			{ text: 'item 1', img: '' },
			{ text: 'item 2', img: '' },
			{ text: 'item 3', img: '' },
			{ text: 'item 4', img: '' },
			{ text: 'item 5', img: '' },
			{ text: 'item 6', img: '' },
			{ text: 'item 7', img: '' },
			{ text: 'item 8', img: '' },
			{ text: 'item 9', img: '' },
			{ text: 'item 10', img: '' },
			{ text: 'item 11', img: '' },
			{ text: 'item 12', img: '' },
			{ text: 'item 13', img: '' },
			{ text: 'item 14', img: '' },
			{ text: 'item 15', img: '' },
			{ text: 'item 16', img: '' },
			{ text: 'item 17', img: '' },
			{ text: 'item 18', img: '' },
			{ text: 'item 19', img: '' },
			{ text: 'item 20', img: '' },
			{ text: 'item 21', img: '' },
			{ text: 'item 22', img: '' },
			{ text: 'item 23', img: '' },
			{ text: 'item 24', img: '' },
			{ text: 'item 25', img: '' },
			{ text: 'item 26', img: '' },
			{ text: 'item 27', img: '' },
			{ text: 'item 28', img: '' },
			{ text: 'item 29', img: '' },
			{ text: 'item 30', img: '' }
		]

		const open = () => {
			const current = Math.floor(width.value / 2 / (item_size + item_gap)) + 1
			const randomDx = getRandomInt(1, item_size - 1)
			const dx = (current*(item_size + item_gap) - (width.value / 2)) + (target_elem - current)*(item_size + item_gap) + randomDx
			const a = window.document.querySelectorAll('.'+styles.item)
			a.forEach( (item, i) => {
				(item as HTMLDivElement).style.transform = '';
				item.animate(
					{ transform: `translateX(${-dx}px)` },
					{
						duration: 2000,
						easing: 'ease-out',
					}
				).onfinish = () => {
					(item as HTMLDivElement).style.transform = `translateX(${-dx}px)`
				};
			})
			console.log('test')
		}
		return () => (
			<div ref={divRef} class={styles.lootboxes}>
				<div id='items' class={styles.boxesWrapper}>
					<div class={styles.itemsWrapper}>
						{items.map((item, idx) => {
							return <div
								key={'lootboxItem-' + idx}
								style={idx === target_elem ? 'border: solid 1px red' : ''}
								class={styles.item}
							>
								{item.text}
							</div>
						})}
					</div>
				</div>
				<UiButton mod={'primary'} size={'lg'} text={'опен'} whenClick={open} />
			</div>
		)
	}
})
export default LootboxesPage
