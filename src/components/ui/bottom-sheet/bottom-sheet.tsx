import styles from './bottom-sheet.module.css'
import { defineComponent, ref, Teleport, Transition, type PropType, type VNode } from 'vue'
import { UiButton } from '@/components/ui'
import { useLocalization } from '@/services/localization'

export interface UiBottomSheetMethods {
	open: () => void
	close: () => void
}

export const UiBottomSheet = defineComponent({
	name: 'UiBottomSheet',
	props: {
		body: { type: null as unknown as PropType<VNode | string>, required: true },
		footer: { type: null as unknown as PropType<VNode>, required: false },
		withBackground: { type: Boolean, default: true },
		fullscreen: { type: Boolean, default: false },
		withExitButton: { type: Boolean, default: false },
		whenOpen: { type: Function as PropType<() => void>, required: false },
		whenClose: { type: Function as PropType<() => void>, required: false }
	},
	setup: (props, { expose }) => {
		const { t } = useLocalization()

		const isOpen = ref(false)

		const open = () => {
			isOpen.value = true
			props.whenOpen && props.whenOpen()
		}

		const close = () => {
			isOpen.value = false
			props.whenClose && props.whenClose()
		}

		const publicApi: UiBottomSheetMethods = {
			open,
			close
		}

		expose(publicApi)

		return () => (
			<Teleport to={'body'}>
				<Transition
					enterActiveClass={styles.slideBottomEnterActive}
					enterFromClass={styles.slideBottomEnterFrom}
					leaveActiveClass={styles.slideBottomLeaveActive}
					leaveToClass={styles.slideBottomLeaveTo}
				>
					{isOpen.value && (
						<div class={styles.uiBottomSheet}>
							{props.withBackground && (
								<div tabindex="-1" class={styles.background} onClick={close} />
							)}
							<div class={[styles.dialog, props.fullscreen && styles.fullscreen]}>
								<div class={styles.body}>{props.body}</div>
								<div class={styles.footer}>
									{props.footer}
									{(props.withExitButton || props.fullscreen) && (
										<UiButton
											text={t('pvp.exit')}
											mod={'inverse'}
											bordered
											size={'md'}
											whenClick={close}
										/>
									)}
								</div>
							</div>
						</div>
					)}
				</Transition>
			</Teleport>
		)
	}
})
