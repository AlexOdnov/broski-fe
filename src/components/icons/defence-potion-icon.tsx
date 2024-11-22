import { defineComponent } from 'vue'

export const DefencePotionIcon = defineComponent({
	name: 'DefencePotionIcon',
	props: {
		width: { type: String, default: '100%' }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ aspectRatio: `39 / 20`, width: props.width }}
				src="/images/defence-potion.webp"
			/>
		)
	}
})
