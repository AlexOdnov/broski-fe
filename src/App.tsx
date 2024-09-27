import { computed, defineComponent, ref } from 'vue'
import styles from './style.module.css'
import {
	DailyComponent,
	LoadingScreen,
	MainComponent,
	OnboardingComponent,
	UpdateNotificationComponent
} from './components'
import { useUserStore } from './stores/user'
import { useTgSdkStore } from './stores/tg-sdk'
import { useTasksStore } from './stores/tasks'
import { useCommonStore } from './stores/common'
import { useReferralsStore } from './stores/referrals'
import { useAdvertisingStore } from '@/stores/advertising'
import { envVariables } from './services/env'
import { useI18n } from 'vue-i18n'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		const tasksStore = useTasksStore()
		const tgStore = useTgSdkStore()
		const commonStore = useCommonStore()
		const referralsStore = useReferralsStore()
		const i18n = useI18n()

		const isUserExist = ref(false)

		const isLoaderVisible = computed(() => {
			return commonStore.isLoading || !isUserExist.value
		})

		const needRenderDaily = computed(() => userStore.userStats?.daily.claim === false)
		const needRenderOnboarding = computed(() => userStore.userStats?.first_login)
		// const needRenderUpdateNotification = computed(() => userStore.userStats?.push_view === false)

		const getComponent = computed(() => {
			if (isLoaderVisible.value) {
				return <LoadingScreen />
			}
			if (needRenderOnboarding.value) {
				return <OnboardingComponent />
			}
			// недоступно до релиза с профилем
			// if (needRenderUpdateNotification.value) {
			// 	return <UpdateNotificationComponent />
			// }
			if (needRenderDaily.value) {
				return <DailyComponent day={userStore.userStats?.daily.streak ?? 1} />
			}
			return <MainComponent />
		})

		const onCreated = async () => {
			tgStore.initTgApp()
			if (!tgStore.user) {
				console.warn('Failed to get telegram user information')
				return
			}
			i18n.locale.value = tgStore.languageCode
			commonStore.setIsLoadingForTimeout(envVariables.loaderDuration)
			await useAdvertisingStore().init()
			await Promise.all([userStore.initUser(), userStore.loadUserStats()])
			if (!userStore.user) {
				console.warn('Failed to get broski user information')
				return
			}
			isUserExist.value = true
			tasksStore.getTasks()
			referralsStore.loadReferrals()
			userStore.startUpdateMiningString()
			userStore.switchRegion()
		}

		onCreated()

		return () => <div class={styles.app}>{getComponent.value}</div>
	}
})
