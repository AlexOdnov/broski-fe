import { defineComponent } from 'vue'

export const TicketIcon = defineComponent({
	name: 'TicketIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/ticket.webp"
			/>
		)
	}
})
