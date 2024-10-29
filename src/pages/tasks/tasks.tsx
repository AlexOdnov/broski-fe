import { defineComponent } from 'vue'

import styles from './styles.module.css'
import { useTasksStore } from '@/stores/tasks'
import { TaskListItem } from '@/components/tasks/task-list-item'
import { useRouter } from 'vue-router'
import { UserBalance } from '@/components/ui/user-balance'
import { RouteName } from '@/router'
import { useLocalization } from '@/services/localization'

const TasksPage = defineComponent({
	name: 'TasksPage',
	setup() {
		const router = useRouter()
		const tasksStore = useTasksStore()
		const { t } = useLocalization()

		const taskSelected = (selectedTaskId: number) => {
			router.push({ name: RouteName.Task, params: { taskId: selectedTaskId } })
		}

		return () => (
			<div>
				<UserBalance />
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
