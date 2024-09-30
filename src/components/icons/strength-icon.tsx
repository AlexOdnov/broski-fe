import { defineComponent } from 'vue'

export const StrengthIcon = defineComponent({
	name: 'StrengthIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/strength.webp"
			/>
		)
	}
})
