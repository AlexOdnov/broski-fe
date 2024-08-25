import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import styles from './styles.module.css'
import { useTasksStore } from '@/stores/tasks'
import { useTgSdkStore } from '@/stores/tg-sdk'

const TaskPage = defineComponent({
	name: 'TaskPage',
	setup: () => {
		const route = useRoute()
		const tasksStore = useTasksStore()
		const tgStore = useTgSdkStore()

		const taskId = computed(() => +route.params.taskId)
		const task = computed(() => tasksStore.tasks.find((t) => t.id === taskId.value))

		const whenStartClicked = async () => {
			await tasksStore.setTaskDone(taskId.value)

			tgStore.openLink(task.value?.links)
		}
		return () => (
			<div class={styles.taskWrapper}>
				<div class={styles.task}>
					<div class={styles.title}>{task.value?.description}</div>
					{/* <div class={styles.description}>{task.value?.description}</div> */}
					<div class={styles.frame}>
						<div class={styles.coins}>
							<img class={styles.icon} src="/images/bro-coin.png" />
							{task.value?.points && `${task.value.points} $BRO`}
						</div>
						<div class={styles.separator} />
						<div class={styles.tickets}>
							<img class={styles.icon} src="/images/ticket.png" />
							{task.value?.tickets && `${task.value.tickets} Tickets`}
						</div>
					</div>
					<div class={styles.duration}>{task.value?.duration}</div>
					<div class={styles.btnWrapper}>
						<button class={styles.startButton} onClick={whenStartClicked}>
							Start
						</button>
					</div>
				</div>
				<div class={styles.noCrooks}>
					No crooks allowed!
					<br />
					Cheaters will be punished 🪑
				</div>
			</div>
		)
	}
})

export default TaskPage
