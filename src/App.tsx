import { computed, defineComponent, ref } from 'vue'
import styles from './style.module.css'
import { DailyComponent, LoadingScreen, MainComponent, OnboardingComponent } from './components'
import { useUserStore } from './stores/user'
import { useTgSdkStore } from './stores/tg-sdk'
import { useTasksStore } from './stores/tasks'
import { useCommonStore } from './stores/common'
import { useReferralsStore } from './stores/referrals'
import { useAdvertisingStore } from '@/stores/advertising'
import { envVariables } from './services/env'
import { useI18n } from "vue-i18n";

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

		const needRenderDaily = computed(() => userStore.user?.daily_claim === false)
		const needRenderOnboarding = computed(() => userStore.user?.first_login)

		const getComponent = computed(() => {
			if (isLoaderVisible.value) {
				return <LoadingScreen />
			}
			if (needRenderOnboarding.value) {
				return <OnboardingComponent />
			}
			if (needRenderDaily.value) {
				return <DailyComponent day={userStore.user?.daily_stric ?? 1} />
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
			await userStore.loadUser(true)
			if (!userStore.user) {
				console.warn('Failed to get broski user information')
				return
			}
			isUserExist.value = true
			tasksStore.getTasks()
			referralsStore.loadReferrals()
			userStore.startUpdateMiningString()
		}

		onCreated()

		return () => <div class={styles.app}>{getComponent.value}</div>
	}
})
