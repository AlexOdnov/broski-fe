import { defineComponent } from 'vue'

export const FistIcon = defineComponent({
	name: 'FistIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/fist-small.webp"
			/>
		)
	}
})