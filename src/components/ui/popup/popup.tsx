import styles from './popup.module.css'
import { defineComponent, type PropType, type VNode } from 'vue'
import { UiButton, type ButtonMod } from '@/components/ui'

export const UiPopup = defineComponent({
	name: 'UiPopup',
	props: {
		header: { type: null as unknown as PropType<VNode | string>, required: false },
		body: { type: null as unknown as PropType<VNode | string>, required: false },
		buttonText: { type: String, default: 'ok' },
		buttonMod: { type: String as PropType<ButtonMod>, required: false },
		image: { type: String, required: false },
		whenClick: { type: Function as PropType<(e: MouseEvent) => void>, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={styles.popup}>
				{props.image && <img class={styles.image} src={props.image} />}
				<div class={styles.header}>{props.header}</div>
				<div class={styles.body}>{props.body}</div>
				<UiButton
					text={props.buttonText}
					mod={props.buttonMod}
					size={'lg'}
					minWidth={'280px'}
					whenClick={props.whenClick}
				/>
			</div>
		)
	}
})
