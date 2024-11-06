import { defineComponent } from 'vue'

export const CombinationPotionIcon = defineComponent({
	name: 'CombinationPotionIcon',
	props: {
		width: { type: String, default: '100%' }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ aspectRatio: `39 / 20`, width: props.width }}
				src="/images/combination-potion.webp"
			/>
		)
	}
})
