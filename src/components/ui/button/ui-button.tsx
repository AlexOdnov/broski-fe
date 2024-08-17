import { computed, defineComponent, type PropType } from 'vue'
import styles from './styles.module.css'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonMod = 'primary' | 'secondary' | 'inverse'

export const UiButton = defineComponent({
	name: 'UiButton',
	props: {
		text: { type: String, required: true },
		size: { type: String as PropType<ButtonSize>, default: 'md' },
		mod: { type: String as PropType<ButtonMod>, default: 'primary' },
		whenClick: { type: Function as PropType<(e: MouseEvent) => void>, required: true }
	},
	setup: (props) => {
		const sizeClass = computed(() => {
			switch (props.size) {
				case 'sm':
					return styles.sizeSm
				case 'md':
					return styles.sizeMd
				case 'lg':
					return styles.sizeLg
				default:
					return styles.sizeMd
			}
		})

		const modClass = computed(() => {
			switch (props.mod) {
				case 'primary':
					return styles.modPrimary
				case 'secondary':
					return styles.modSecondary
				case 'inverse':
					return styles.modInverse
				default:
					return styles.modPrimary
			}
		})

		return () => (
			<button
				class={[styles.button, sizeClass.value, modClass.value]}
				type="button"
				onClick={props.whenClick}
			>
				{props.text}
			</button>
		)
	}
})
