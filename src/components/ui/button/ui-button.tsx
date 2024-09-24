import { computed, defineComponent, type PropType, type VNode } from 'vue'
import styles from './ui-button.module.css'

export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonMod = 'primary' | 'secondary' | 'inverse'
export type FontVariant = 'Roboto' | 'BarcadeBrawlRegular'

export const UiButton = defineComponent({
	name: 'UiButton',
	props: {
		text: { type: String, required: true },
		leftIcon: { type: Object as PropType<VNode>, required: false },
		size: { type: String as PropType<ButtonSize>, default: 'md' },
		mod: { type: String as PropType<ButtonMod>, default: 'primary' },
		font: { type: String as PropType<FontVariant>, default: 'BarcadeBrawlRegular' },
		disabled: { type: Boolean, default: false },
		loading: { type: Boolean, default: false },
		minWidth: { type: String, default: 'auto' },
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

		const fontVariantClass = computed(() => {
			switch (props.font) {
				case 'Roboto':
					return styles.fontRoboto
				case 'BarcadeBrawlRegular':
					return styles.fontBarcadeBrawlRegular
				default:
					return styles.fontBarcadeBrawlRegular
			}
		})

		const handleClick = (e: MouseEvent) => {
			if (props.disabled || props.loading) {
				return
			}
			props.whenClick(e)
		}

		return () => (
			<button
				class={[styles.button, sizeClass.value, modClass.value, fontVariantClass.value]}
				type="button"
				disabled={props.disabled}
				onClick={handleClick}
				style={{ minWidth: props.minWidth }}
			>
				{props.loading ? (
					<div class={styles.loader} />
				) : (
					<>
						{<div class={styles.leftIcon}>{props.leftIcon}</div>}
						{props.text}
					</>
				)}
			</button>
		)
	}
})
