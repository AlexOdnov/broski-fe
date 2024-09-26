import { computed, defineComponent } from 'vue'
import styles from './half-circle-diagram.module.css'

export const HalfCircleDiagramm = defineComponent({
	name: 'HalfCircleDiagram',
	props: {
		value: { type: Number, required: true },
		width: { type: Number, required: true, default: 30 }
	},
	setup: (props) => {
		const halfCircleLang = computed(() => (Math.PI * (props.width - 6)) / 2)
		const filledPart = computed(() => (halfCircleLang.value / 100) * props.value)
		return () => (
			<div
				class={styles.position}
				style={{ width: `${props.width}px`, height: `${props.width / 2}px` }}
			>
				<svg
					viewBox={`${(-props.width * 0.166) / 2} ${(-props.width * 0.166) / 2} ${props.width + props.width * 0.166} ${props.width / 2}`}
					class={styles.svgPosition}
				>
					<path
						class={styles.arcBackgroundBorder}
						style={{ strokeWidth: `${props.width * 0.166 + 2}px` }}
						stroke="#35332E"
						d={`M3 ${props.width / 2} a ${(props.width - 6) / 2} ${(props.width - 6) / 2} 90 0 1 ${props.width - 6} 0`}
					/>
				</svg>
				<svg
					viewBox={`${(-props.width * 0.166) / 2} ${(-props.width * 0.166) / 2} ${props.width + props.width * 0.166} ${props.width / 2}`}
					class={styles.svgPosition}
				>
					<path
						class={styles.arcBackground}
						style={{ strokeWidth: `${props.width * 0.166}px` }}
						stroke="#35332E"
						d={`M3 ${props.width / 2} a ${(props.width - 6) / 2} ${(props.width - 6) / 2} 90 0 1 ${props.width - 6} 0`}
					/>
				</svg>
				<svg
					viewBox={`${(-props.width * 0.166) / 2} ${(-props.width * 0.166) / 2} ${props.width + props.width * 0.166} ${props.width / 2}`}
					class={styles.svgPosition}
					style={{ strokeDasharray: `${filledPart.value} ${halfCircleLang.value}` }}
				>
					<path
						class={styles.arc}
						style={{ strokeWidth: `${props.width * 0.166 - 5}px` }}
						d={`M3 ${props.width / 2} a ${(props.width - 6) / 2} ${(props.width - 6) / 2} 90 0 1 ${props.width - 6} 0`}
					/>
				</svg>
				<div class={styles.valueWrapper}>
					<div style={{ textAlign: 'center', fontSize: `${props.width/6}px`}}>{props.value}</div>
				</div>
			</div>
		)
	}
})
