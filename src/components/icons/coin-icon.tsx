import { defineComponent } from 'vue'

export const CoinIcon = defineComponent({
	name: 'CoinIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => <img style={{ height: `${props.height}px`, width: `${props.height}px` }} src="/images/bro-coin.webp" />
	}
})
