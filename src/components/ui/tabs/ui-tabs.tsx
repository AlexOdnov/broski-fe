import { defineComponent, type PropType } from 'vue'
import styles from './ui-tabs.module.css'
import { UiButton } from '../button'
import { NoticeIcon } from '@/components/icons'

export interface ITabOption {
	label: string
	value: string
	disabled?: boolean
	notice?: boolean
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
					<div class={styles.tab} style={{ width: `${100 / props.options.length}%` }}>
						{el.notice && <NoticeIcon height={20} class={styles.notice} />}
						<UiButton
							size={'sm'}
							font={'Roboto'}
							text={el.label}
							disabled={props.disabled || el.disabled}
							minWidth={'100%'}
							mod={props.selected === el.value ? 'primary' : 'inverse'}
							whenClick={() => props.whenChange(el.value)}
						/>
					</div>
				))}
			</div>
		)
	}
})
