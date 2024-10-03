import { defineComponent } from 'vue'

export const DefenceIcon = defineComponent({
	name: 'DefenceIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/defence.webp"
			/>
		)
	}
})
