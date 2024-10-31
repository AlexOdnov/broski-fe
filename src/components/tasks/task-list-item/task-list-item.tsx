import { defineComponent, type PropType } from 'vue'
import styles from './task-list-item.module.css'
import type { Task } from '@/api/generatedApi'
import { UiText } from '@/components/ui'
export const TaskListItem = defineComponent({
	name: 'TaskListItem',
	props: {
		task: { type: Object as PropType<Task>, required: true },
		whenTaskSelected: { type: Function as PropType<(taskId: number) => void>, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={styles.task} onClick={() => props.whenTaskSelected(props.task.id)}>
				<img
					class={styles.taskImg}
					src={props.task.image || '/images/fist.webp'}
					alt="task image"
				/>
				<div class={[styles.text, props.task.complete && styles.opacity]}>
					<div class={styles.title}>{props.task.title}</div>
					<div class={styles.revard}>
						{props.task.points && (
							<>
								<img class={styles.icon} src="/images/bro-coin.webp" />{' '}
								<UiText isAccent>{`${props.task.points} $BRO`}</UiText>
							</>
						)}
						{props.task.tickets && (
							<>
								<img class={styles.icon} src="/images/ticket.webp" /> {props.task.tickets}
							</>
						)}
					</div>
					<div class={styles.duration}>{props.task.duration}</div>
				</div>
				<div class={styles.chevronRight}>
					{props.task.complete ? (
						<span class={styles.ok}>👌</span>
					) : (
						<img src="/images/chevronRight.svg" />
					)}
				</div>
			</div>
		)
	}
})
