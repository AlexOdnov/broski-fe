import styles from './open-conveyor-belt.module.css'
import {computed, defineComponent, onMounted, onUnmounted, ref} from "vue";
import type {Prize} from "@/api/generatedApi";

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
export type OpenConveyorBeltMethods = {
	open: () => void
}

export const OpenConveyorBelt = defineComponent({
	name: "OpenConveyorBelt",
	props: {
		items: { type: Array<Prize>, default: () => [], required: true },
		itemSize: { type: Number, default: 75 },
		itemGap: { type: Number, default: 5 },
		rollingTime: { type: Number, default: 4000 },
		targetElementIdx: { type: Number, default: 32 },
		beltLength: { type: Number, default: 40 },
		winIndex: { type: Number, required: true },
	},
	setup: (props, { expose }) => {
		const divRef = ref<HTMLDivElement | null>(null)
		const width = ref(-1)
		const setWidth = () => {
			const _width = divRef.value?.clientWidth ?? window.innerWidth
			width.value = _width > 320 ? _width : 320
		}
		const belt = computed(() => {
			const result: Prize[] = []
			for(let idx = 0; idx < props.beltLength; idx++) {
				if(idx === props.targetElementIdx) {
					result.push(props.items[props.winIndex])
				} else {
					result.push(props.items[getRandomInt(0, props.items.length - 1)])
				}
			}
			return result
		})
		onMounted(() => {
			setWidth()
			window.addEventListener('resize', setWidth, true)
		})
		onUnmounted(() => {
			window.removeEventListener('resize', setWidth)
		})
		const open = () => {
			const current = Math.floor(width.value / 2 / (props.itemSize + props.itemGap)) + 1
			const randomDx = getRandomInt(1, props.itemSize - 1)
			const dx = (current*(props.itemSize + props.itemGap) - (width.value / 2)) + (props.targetElementIdx - current)*(props.itemSize + props.itemGap) + randomDx
			const a = window.document.querySelectorAll('.'+styles.item)
			a.forEach( (item, i) => {
				(item as HTMLDivElement).style.transform = '';
				item.animate(
					{ transform: `translateX(${-dx}px)` },
					{
						duration: props.rollingTime,
						easing: 'ease-out',
					}
				).onfinish = () => {
					(item as HTMLDivElement).style.transform = `translateX(${-dx}px)`
				};
			})
			console.log('test')
		}

		expose({
			open,
		})

		 return () => (
			 <div ref={divRef} class={styles.lootboxes}>
				 <div id='items' class={styles.boxesWrapper}>
					 <div class={styles.itemsWrapper}>
						 {belt.value?.map((item, idx) => {
							 return <div
								 key={'lootboxItem-' + idx}
								 style={idx === props.targetElementIdx ? 'border: solid 1px red' : ''}
								 class={styles.item}
							 >
								 <img src={item?.image ?? ''} class={styles.beltBlock}/>
							 </div>
						 })}
					 </div>
				 </div>
			 </div>
		 )
	},
})
