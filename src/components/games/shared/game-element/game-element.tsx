import { defineComponent, type PropType } from 'vue'
import styles from './styles.module.css'
import type { IGameElement } from '@/utils/games'

export const GameElement = defineComponent({
	name: 'GameElement',
	props: {
		placeholder: { type: String, required: true },
		gameElement: { type: Object as PropType<IGameElement>, required: true },
		whenClick: { type: Function as PropType<(e: MouseEvent) => void>, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={styles.wrapper} onClick={props.whenClick}>
				{props.gameElement.isOpen ? (
					<div class={[styles.block, styles.opened]}>{props.gameElement.value}</div>
				) : (
					<div class={[styles.block, styles.closed]}>{props.placeholder}</div>
				)}
			</div>
		)
	}
})
