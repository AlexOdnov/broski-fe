import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import styles from './styles.module.css'
import { useTasksStore } from '@/stores/tasks'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { useUserStore } from '@/stores/user'

const TaskPage = defineComponent({
	name: 'TaskPage',
	setup: () => {
		const route = useRoute()
		const tasksStore = useTasksStore()
		const tgStore = useTgSdkStore()
		const userStore = useUserStore()

		const taskId = computed(() => +route.params.taskId)
		const task = computed(() => tasksStore.tasks.find((t) => t.id === taskId.value))

		const isChecking = ref(false)
		const isCheckingDisabled = ref(true)

		const whenStartClicked = async () => {
			tgStore.openLink(task.value?.links)
			isCheckingDisabled.value = false
		}

		const whenCheckClicked = async () => {
			isChecking.value = true
			await tasksStore.setTaskDone(taskId.value)
			await userStore.loadUser()
			isChecking.value = false
		}
		return () => (
			<div class={styles.taskWrapper}>
				<div class={styles.task}>
					<div class={styles.title}>{task.value?.title}</div>
					<div class={styles.description}>{task.value?.description}</div>
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
						<button
							class={[styles.button, task.value?.complete ? styles.greyBtn : styles.yellowBtn]}
							onClick={whenStartClicked}
							disabled={task.value?.complete}
						>
							{task.value?.complete ? 'Completed' : 'Start'}
						</button>
						{!task.value?.complete && (
							<button
								class={[styles.button, styles.greyBtn, isCheckingDisabled.value && styles.btnDisabled]}
								onClick={whenCheckClicked}
								disabled={isCheckingDisabled.value}
							>
								{isChecking.value ? <div class={styles.loader} /> : 'Check'}
							</button>
						)}
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
