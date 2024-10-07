import { computed, defineComponent, type PropType } from 'vue'
import styles from './ui-text.module.css'

export type UiTextFontWeight = 400 | 500 | 600 | 700
export type UiTextFontFamily = 'roboto' | 'barcadeBrawl'

export const UiText = defineComponent({
	name: 'UiText',
	props: {
		color: { type: String, required: false },
		fontSize: { type: String, required: false },
		fontWeight: { type: Number as PropType<UiTextFontWeight>, default: 400 },
		lineHeight: { type: String, required: false },
		fontFamily: { type: String as PropType<UiTextFontFamily>, default: 'roboto' },
		isAccent: { type: Boolean, default: false },
		alignCenter: { type: Boolean, default: false },
		shadow: {type: Boolean, default: false},
	},
	setup: (props, { slots }) => {
		const fontFamilyClass = computed(() =>
			props.fontFamily === 'barcadeBrawl' ? styles.fontBarcadeBrawlRegular : styles.fontRoboto
		)

		const textStyle = computed(() => ({
			color: props.color,
			fontSize: props.fontSize,
			lineHeight: props.lineHeight,
			fontWeight: props.fontWeight
		}))

		return () => (
			<span
				class={[
					fontFamilyClass.value,
					props.isAccent && styles.accent,
					props.alignCenter && styles.alignCenter,
					props.shadow && styles.shadow,
				]}
				style={textStyle.value}
			>
				{slots.default?.()}
			</span>
		)
	}
})
