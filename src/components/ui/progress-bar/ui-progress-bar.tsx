import { computed, defineComponent, type PropType } from 'vue'
import styles from './ui-progress-bar.module.css'
import { UiText } from '../ui-text'

export type ProgressBarMod = 'filled' | 'segmented' | 'round-segmented'

export const UiProgressBar = defineComponent({
	name: 'UiProgressBar',
	props: {
		totalItems: { type: Number, required: true },
		filledItems: { type: Number, required: true },
		height: { type: Number, required: true },
		mod: { type: String as PropType<ProgressBarMod>, default: 'filled' },
		fillerColor: { type: String, default: '#ffb800' },
		borderColor: { type: String, default: '#35332e' },
		padding: { type: Number, default: 1 },
		withCounter: { type: Boolean, default: false },
		rounded: { type: Boolean, default: true },
		counterColor: { type: String, default: '#141517' }
	},
	setup: (props) => {
		const items = computed(() => Array(props.totalItems).fill(null))

		const progressBarBorderStyle = computed(() => ({
			padding: props.mod === 'segmented' ? '0' : `${props.padding + 1}px`,
			'--borderColor': props.borderColor,
			'--borderRadius': props.rounded ? '9999px' : `${props.height / 4}px`,
			'--fillerHeight': `${props.height - 2 - props.padding * 2}px`,
			'--fillerRadius': props.rounded ? '9999px' : `calc(var(--fillerHeight) / 4)`,
			'--borderStyle': '1px solid var(--borderColor)'
		}))

		const progressBarStyle = computed(() => ({
			gridTemplateColumns: props.mod === 'filled' ? 'auto' : `repeat(${props.totalItems}, 1fr)`,
			border: props.mod === 'segmented' ? 'var(--borderStyle)' : 'none',
			gap: `${props.padding}px`
		}))

		const fillerStyle = computed(() => ({
			backgroundColor: props.fillerColor,
			width: `${(props.filledItems / props.totalItems) * 100}%`
		}))

		const counterStyle = computed(() => ({
			left: `${props.height / 2}px`
		}))

		const getSegmentStyle = (index: number) => ({
			opacity: index < props.filledItems || props.mod === 'round-segmented' ? 1 : 0,
			backgroundColor:
				index >= props.filledItems && props.mod === 'round-segmented'
					? '#35332e'
					: props.fillerColor
		})

		return () => (
			<div class={styles.progressBarBorder} style={progressBarBorderStyle.value}>
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
						<UiText
							fontWeight={700}
							color={props.counterColor}
							fontSize={`${props.height / 2}px`}
							class={styles.counter}
							style={counterStyle.value}
						>
							{props.filledItems}
						</UiText>
					)}
				</div>
			</div>
		)
	}
})
