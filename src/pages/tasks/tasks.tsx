import { defineComponent } from 'vue'

import styles from './styles.module.css'
import { useTasksStore } from '@/stores/tasks'
import { TaskListItem } from '@/components/tasks/task-list-item'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { LuckyButtons } from '@/utils/lucky-buttons'

const TasksPage = defineComponent({
	name: 'TasksPage',
	setup() {
		const router = useRouter()
		const tasksStore = useTasksStore()
		const userStore = useUserStore()
		const { t } = useI18n()

		const taskSelected = (selectedTaskId: number) => {
			userStore.clickLuckyButton(LuckyButtons.TaskInfo)
			router.push({ name: 'task', params: { taskId: selectedTaskId } })
		}

		return () => (
			<div>
				<div class={styles.tasks}>
					<span class={styles.listTitle}>{t('task.tasks')}</span>
					{tasksStore.uncompletedTasks.map((task, index) => {
						return (
							<TaskListItem task={task} whenTaskSelected={taskSelected} key={`task-${index}`} />
						)
					})}
					{<span class={[styles.listTitle, styles.opacity]}>{t('task.completed')}</span>}
					{tasksStore.completedTasks?.length > 0 &&
						tasksStore.completedTasks.map((task, index) => {
							return (
								<TaskListItem
									task={task}
									whenTaskSelected={taskSelected}
									key={`completed-task-${index}`}
								/>
							)
						})}
				</div>
			</div>
		)
	}
})

export default TasksPage
