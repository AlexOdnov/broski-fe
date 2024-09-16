import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import styles from './styles.module.css'

export const UiProgressBar = defineComponent({
	name: 'UiProgressBar',
	props: {
		duration: { type: Number, required: true }
	},
	setup: (props) => {
		const items = ref(Array(20).fill(null))
		const currentProgress = ref(0)
		const interval = ref<ReturnType<typeof setInterval> | null>(null)

		onMounted(() => {
			interval.value = setInterval(
				() => {
					if (currentProgress.value <= items.value.length - 3) {
						currentProgress.value += 1
					}
				},
				props.duration / (items.value.length - 1)
			)
		})
		onBeforeUnmount(() => interval.value && clearInterval(interval.value))

		return () => (
			<div class={styles.progressBar}>
				{items.value.map((el, index) => (
					<div
						key={index}
						class={styles.item}
						style={{ opacity: index <= currentProgress.value ? 1 : 0 }}
					/>
				))}
			</div>
		)
	}
})
