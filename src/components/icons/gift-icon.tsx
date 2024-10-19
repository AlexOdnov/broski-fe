import { defineComponent } from 'vue'

export const GiftIcon = defineComponent({
	name: 'GiftIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/gift.webp"
			/>
		)
	}
})
