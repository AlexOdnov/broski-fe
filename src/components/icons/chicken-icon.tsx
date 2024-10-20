import { defineComponent } from 'vue'

export const ChickenIcon = defineComponent({
	name: 'ChhickenIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/chicken-halloween.webp"
			/>
		)
	}
})
