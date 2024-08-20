import { computed, defineComponent } from 'vue'

import styles from './styles.module.css'
import { useTasksStore } from '@/stores/tasks'
import { TaskListItem } from '@/components/tasks/task-list-item'

const TasksPage = defineComponent({
	name: 'TasksPage',
	setup() {
		const tasksStore = useTasksStore()
		const uncompletedTasks = computed(() => tasksStore.tasks.filter((t) => !t.complete))
		const completedTasks = computed(() => tasksStore.tasks.filter((t) => t.complete))
		return () => (
			<div>
				<div class={styles.tasks}>
					<span class={styles.listTitle}>Tasks</span>
					{uncompletedTasks.value.map((task) => {
						return <TaskListItem task={task} />
					})}
					<span class={[styles.listTitle, styles.opacity]}>Completed</span>
					{completedTasks.value.map((task) => {
						return <TaskListItem task={task} />
					})}
				</div>
			</div>
		)
	}
})

export default TasksPage
