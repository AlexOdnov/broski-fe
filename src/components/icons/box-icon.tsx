import { defineComponent } from 'vue'

export const BoxIcon = defineComponent({
	name: 'BoxIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => <img style={{ height: `${props.height}px`, width: `${props.height}px` }} src="/images/box.webp" />
	}
})
