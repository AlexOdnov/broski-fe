import { computed, defineComponent } from 'vue'

import styles from './styles.module.css'
import { useTasksStore } from '@/stores/tasks'
import { TaskListItem } from '@/components/tasks/task-list-item'
import { useRouter } from 'vue-router'

const TasksPage = defineComponent({
	name: 'TasksPage',
	setup() {
		const router = useRouter()
		const tasksStore = useTasksStore()
		const taskSelected = (selectedTaskId: number) => {
			router.push({ name: 'task', params: { taskId: selectedTaskId } })
		}
		return () => (
			<div>
				<div class={styles.tasks}>
					<span class={styles.listTitle}>Tasks</span>
					{tasksStore.uncompletedTasks.map((task) => {
						return <TaskListItem task={task} whenTaskSelected={taskSelected} />
					})}
					<span class={[styles.listTitle, styles.opacity]}>Completed</span>
					{tasksStore.completedTasks.map((task) => {
						return <TaskListItem task={task} whenTaskSelected={taskSelected} />
					})}
				</div>
			</div>
		)
	}
})

export default TasksPage
