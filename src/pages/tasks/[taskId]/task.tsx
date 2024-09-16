import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import styles from './task.module.css'
import { useTasksStore } from '@/stores/tasks'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { useUserStore } from '@/stores/user'
import { UiButton, RewardBlock } from '@/components'

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
					<img class={styles.img} src={task.value?.image || '/images/fist.webp'} alt="task image" />
					<div class={styles.title}>{task.value?.title}</div>
					<div class={styles.description}>{task.value?.description}</div>
					<RewardBlock coins={task.value?.points ?? 0} tickets={task.value?.tickets ?? 0} />
					<div class={styles.duration}>{task.value?.duration}</div>
					<div class={styles.btnWrapper}>
						<UiButton
							mod={'primary'}
							size={'lg'}
							disabled={task.value?.complete}
							text={task.value?.complete ? 'Completed' : 'Start'}
							whenClick={whenStartClicked}
						/>
						{!task.value?.complete && (
							<UiButton
								mod={'secondary'}
								size={'lg'}
								text={'Check'}
								disabled={isCheckingDisabled.value}
								loading={isChecking.value}
								whenClick={whenCheckClicked}
							/>
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
