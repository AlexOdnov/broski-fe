import { defineComponent } from 'vue'

export const EnergyShadowedIcon = defineComponent({
	name: 'EnergyShadowedIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/energy-shadowed.webp"
			/>
		)
	}
})
