import { useApi } from '@/api/useApi'
import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { TasksCreateResponseItem } from '@/api/responseTypes'
import { useTgSdkStore } from './tg-sdk'
import { computed } from 'vue'
export const useTasksStore = defineStore('tasks', () => {
	const tgStore = useTgSdkStore()
	const api = useApi()

	const [tasks, setTasks] = useState<TasksCreateResponseItem[]>([])

	const uncompletedTasks = computed(() => tasks.value.filter((t) => !t.complete))
	const completedTasks = computed(() => tasks.value.filter((t) => t.complete))

	const getTasks = async () => {
		const response = await api.getTasks({ username: tgStore.username })
		if (response?.tasks?.length > 0) {
			setTasks(response.tasks)
		}
		setTasks([
			{
				id: 1,
				description: 'asdsad sadasd sadasd asdasd asdas d',
				points: 100,
				tickets: 3,
				duration: '100',
				complete: false,
				links: 'https://t.me/itsbrocoin'
			}
		])
	}

	const setTaskDone = async (taskId: number) => {
		const response = await api.doneTask({ username: tgStore.username, task_id: taskId })
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
		uncompletedTasks,
		completedTasks,
		getTasks,
		setTaskDone
	}
})
