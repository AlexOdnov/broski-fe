import { defineComponent } from 'vue'

export const UiHeightPlaceholder = defineComponent({
	name: 'UiHeightPlaceholder',
	props: {
		height: { type: String, required: true }
	},
	setup: (props) => {
		return () => (
			<div
				style={{
					height: props.height
				}}
			/>
		)
	}
})