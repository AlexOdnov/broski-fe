import { defineComponent, type PropType } from 'vue'
import styles from './task-list-item.module.css'
import type { TasksCreateResponseItem } from '@/api/responseTypes'
export const TaskListItem = defineComponent({
	name: 'TaskListItem',
	props: {
		task: { type: Object as PropType<TasksCreateResponseItem>, required: true },
		whenTaskSelected: { type: Function as PropType<(taskId: number) => void>, required: true }
	},
	setup: (props) => {
		return () => (
			<div class={styles.task} onClick={() => props.whenTaskSelected(props.task.id)}>
				{/* пока не починим хостинг картинок */}
				{props.task.image && <img class={styles.taskImg} src="/images/fist.png" alt="task image" />}
				<div class={[styles.text, props.task.complete && styles.opacity]}>
					<div class={styles.title}>{props.task.title}</div>
					<div class={styles.revard}>
						{props.task.points && (
							<>
								<img class={styles.icon} src="/images/bro-coin.png" />{' '}
								<span class={styles.yellow}>{`${props.task.points} $BRO`}</span>
							</>
						)}
						{props.task.tickets && (
							<>
								<img class={styles.icon} src="/images/ticket.png" /> {props.task.tickets}
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
