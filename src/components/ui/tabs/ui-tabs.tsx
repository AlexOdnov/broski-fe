import { defineComponent, type PropType } from 'vue'
import styles from './ui-tabs.module.css'
import { UiButton } from '../button'

export interface ITabOption {
	label: string
	value: string
}

export const UiTabs = defineComponent({
	name: 'UiTabs',
	props: {
		selected: { type: String, required: true },
		options: { type: Array as PropType<ITabOption[]>, required: true },
		disabled: { type: Boolean, default: false },
		whenChange: { type: Function as PropType<(value: string) => void>, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={[styles.tabs, props.disabled && styles.tabsDisabled]}>
				{props.options.map((el) => (
					<UiButton
						size={'sm'}
						font={'Roboto'}
						text={el.label}
						disabled={props.disabled}
						minWidth={`${100 / props.options.length}%`}
						mod={props.selected === el.value ? 'primary' : 'secondary'}
						whenClick={() => props.whenChange(el.value)}
					/>
				))}
			</div>
		)
	}
})
