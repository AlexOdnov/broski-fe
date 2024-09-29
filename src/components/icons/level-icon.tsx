import { defineComponent } from 'vue'

export const LevelIcon = defineComponent({
	name: 'LevelIcon',
	props: {
		height: { type: Number, default: 24 }
	},
	setup: (props) => {
		return () => (
			<img
				style={{ height: `${props.height}px`, width: `${props.height}px` }}
				src="/images/level.webp"
			/>
		)
	}
})
