import { useApi } from '@/api/useApi'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useState } from '@/utils/useState'
import type { TasksCreateResponseItem } from '@/api/responseTypes'
export const useTasksStore = defineStore('tasks', () => {
	const userStore = useUserStore()
	const api = useApi()

	const [tasks, setTasks] = useState<TasksCreateResponseItem[]>([])

	const getTasks = async () => {
		if (!userStore.user?.username) return
		const response = await api.getTasks({ username: userStore.user.username })
		if (response?.tasks?.length > 0) {
			setTasks(response.tasks)
		}
	}

	const setTaskDone = async (taskId: number) => {
		if (!userStore.user?.username) return
		const response = await api.doneTask({ username: userStore.user.username, task_id: taskId })
		if (response.status === 200) {
			const task = tasks.value.find((x) => x.id === taskId)
			if (!task) {
				return
			}
			task.complete = true
			setTasks([...tasks.value.filter((t) => t.id !== taskId), task])
		}
	}

	return {
		tasks,
		getTasks,
		setTaskDone
	}
})
