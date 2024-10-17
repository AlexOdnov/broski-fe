import { defineComponent } from 'vue'

export const TimerIcon = defineComponent({
	name: 'TimerIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/timer.webp"
			/>
		)
	}
})
