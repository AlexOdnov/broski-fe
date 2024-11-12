import { defineComponent } from 'vue'

export const GiftIcon = defineComponent({
	name: 'GiftIcon',
	props: {
		height: { type: Number, default: 24 },
		border: { type: Number, default: 2 }
	},
	setup: (props) => {
		return () => (
			<img
				style={`height: ${props.height}px; width: ${props.height}px; transform: rotate(-7deg);
				filter: drop-shadow(${props.border}px 0 0 #FFB800) drop-shadow(0 ${props.border}px 0 #FFB800) drop-shadow(0 -${props.border}px 0 #FFB800) drop-shadow(-${props.border}px 0 0 #FFB800);`}
				src="/images/gift.webp"
			/>
		)
	}
})
