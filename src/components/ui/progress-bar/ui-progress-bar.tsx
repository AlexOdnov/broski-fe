import { computed, defineComponent, ref, type PropType } from 'vue'
import styles from './styles.module.css'

export type ProgressBarMod = 'filled' | 'segmented' | 'round-segmented'

export const UiProgressBar = defineComponent({
	name: 'UiProgressBar',
	props: {
		totalItems: { type: Number, required: true },
		filledItems: { type: Number, required: true },
		height: { type: Number, required: true },
		mod: { type: String as PropType<ProgressBarMod>, default: 'filled' },
		color: { type: String, default: '#ffb800' },
		padding: { type: Number, default: 1 },
		withCounter: { type: Boolean, default: false },
		counterColor: { type: String, default: '#141517' }
	},
	setup: (props) => {
		const items = ref(Array(props.totalItems).fill(null))

		const progressBarStyle = computed(() => ({
			gridTemplateColumns: props.mod === 'filled' ? 'auto' : `repeat(${props.totalItems}, 1fr)`,
			padding: props.mod === 'segmented' ? '0' : `${props.padding}px`,
			height: `${props.height}px`,
			gap: `${props.padding}px`
		}))

		const fillerStyle = computed(() => ({
			backgroundColor: props.color,
			width: `${(props.filledItems / props.totalItems) * 100}%`
		}))

		const counterStyle = computed(() => ({
			fontSize: `${props.height / 2}px`,
			left: `${props.height / 2}px`,
			color: props.counterColor
		}))

		const getSegmentStyle = (index: number) => ({
			opacity: index < props.filledItems || props.mod === 'round-segmented' ? 1 : 0,
			backgroundColor:
				index >= props.filledItems && props.mod === 'round-segmented' ? '#35332e' : props.color
		})

		return () => (
			<div class={styles.progressBar} style={progressBarStyle.value}>
				{props.mod === 'filled' ? (
					<div class={styles.filler} style={fillerStyle.value} />
				) : (
					items.value.map((el, index) => (
						<div
							key={index}
							class={[styles.segment, props.mod === 'round-segmented' && styles.roundSegment]}
							style={getSegmentStyle(index)}
						/>
					))
				)}
				{props.withCounter && props.mod === 'filled' && (
					<span class={styles.counter} style={counterStyle.value}>
						{((props.filledItems / props.totalItems) * 100).toFixed()}
					</span>
				)}
			</div>
		)
	}
})
