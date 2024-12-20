import { useApi } from '@/api/useApi'
import { defineStore } from 'pinia'
import { useState } from '@/utils/useState'
import type { Task } from '@/api/generatedApi'
import { useTgSdkStore } from './tg-sdk'
import { computed } from 'vue'
import { useSentry } from '@/services/sentry'

export const useTasksStore = defineStore('tasks', () => {
	const tgStore = useTgSdkStore()
	const api = useApi()
	const sentry = useSentry()

	const [tasks, setTasks] = useState<Task[]>([])

	const uncompletedTasks = computed(() =>
		tasks.value.sort((a, b) => a.priority - b.priority).filter((t) => !t.complete)
	)
	const completedTasks = computed(() =>
		tasks.value.sort((a, b) => a.priority - b.priority).filter((t) => t.complete)
	)

	const getTasks = async () => {
		try {
			const response = await api.getTasks({ userId: tgStore.userId })
			if (response?.tasks?.length > 0) {
				setTasks(response.tasks)
			}
		} catch (error) {
			console.warn(error)
			sentry.captureNetworkException(error)
		}
	}

	const setTaskDone = async (taskId: number) => {
		try {
			const response = await api.doneTask({ userId: tgStore.userId, task_id: taskId })
			if (response.status === 200) {
				const task = tasks.value.find((x) => x.id === taskId)
				if (!task) {
					return false
				}
				task.complete = true
				setTasks([...tasks.value.filter((t) => t.id !== taskId), task])
				return true
			}
			return false
		} catch (error) {
			console.warn(error)
			sentry.captureNetworkException(error)
			return false
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
