import { computed, defineComponent, ref } from 'vue'
import styles from './style.module.css'
import { DailyComponent, LoadingScreen, MainComponent } from './components'
import { useUserStore } from './stores/user'
import { useTgSdkStore } from './stores/tg-sdk'
import { useTasksStore } from './stores/tasks'
import { useReferralsStore } from './stores/referrals'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		const tasksStore = useTasksStore()
		const tgStore = useTgSdkStore()
		const referralsStore = useReferralsStore()

		const isUserError = ref(false)

		const isLoaderVisible = computed(() => {
			return userStore.isLoading || isUserError.value
		})

		const needRenderDaily = computed(() => userStore.user?.daily_claim === false)

		const getComponent = computed(() => {
			if (isLoaderVisible.value) {
				return <LoadingScreen />
			}
			if (needRenderDaily.value) {
				return <DailyComponent day={userStore.user?.daily_stric ?? 1} />
			}
			return <MainComponent />
		})

		const onCreated = async () => {
			tgStore.initTgApp()
			if (!tgStore.user) {
				isUserError.value = true
				console.warn('Failed to get telegram user information')
				return
			}
			await userStore.loadUser(true)
			if (!userStore.user) {
				isUserError.value = true
				console.warn('Failed to get broski user information')
			}
			tasksStore.getTasks()
			referralsStore.loadReferrals()
			userStore.startUpdateMiningString()
		}

		onCreated()

		return () => <div class={styles.app}>{getComponent.value}</div>
	}
})
