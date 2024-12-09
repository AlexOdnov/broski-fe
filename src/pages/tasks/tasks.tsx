import { defineComponent } from 'vue'

import styles from './styles.module.css'
import { useTasksStore } from '@/stores/tasks'
import { TaskListItem } from '@/components/tasks/task-list-item'
import { useRouter } from 'vue-router'
import { RouteName } from '@/router'
import { useLocalization } from '@/services/localization'
import { UiBanner, UiHeader } from '@/components/ui'
import { usePvpStore } from '@/stores/pvp'

const TasksPage = defineComponent({
	name: 'TasksPage',
	setup() {
		const router = useRouter()
		const tasksStore = useTasksStore()
		const pvpStore = usePvpStore()
		const { t } = useLocalization()

		const taskSelected = (selectedTaskId: number) => {
			router.push({ name: RouteName.Task, params: { taskId: selectedTaskId } })
		}

		return () => (
			<>
				<UiHeader />
				<div
					class={styles.tasks}
					style={{
						height: pvpStore.isCharacterPremium
							? 'calc(100% - var(--headerHeight))'
							: 'calc(100% - var(--headerHeight) - var(--bannerHeight))'
					}}
				>
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
				<UiBanner />
			</>
		)
	}
})

export default TasksPage
