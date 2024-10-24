import { computed, defineComponent, ref } from 'vue'
import styles from './style.module.css'
import {
	DailyComponent,
	EventNotificationComponent,
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
import { usePvpStore } from './stores/pvp'
import { SentryError, useSentry } from './services/sentry'
import { useLocalization } from './services/localization'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		const tasksStore = useTasksStore()
		const tgStore = useTgSdkStore()
		const commonStore = useCommonStore()
		const referralsStore = useReferralsStore()
		const pvpStore = usePvpStore()
		const { i18n } = useLocalization()
		const sentry = useSentry()

		const isUserExist = ref(false)

		const isLoaderVisible = computed(() => {
			return commonStore.isLoading || !isUserExist.value
		})

		const needRenderDaily = computed(() => userStore.userLegacy?.daily_claim === false)
		const needRenderOnboarding = computed(() => userStore.userLegacy?.first_login)
		const needRenderUpdateNotification = computed(() => userStore.userLegacy?.push_see === false)
		const needRenderEventNotification = computed(() => userStore.userLegacy?.daily_event === false)

		const getComponent = computed(() => {
			if (isLoaderVisible.value) {
				return <LoadingScreen />
			}
			if (needRenderOnboarding.value) {
				return <OnboardingComponent />
			}
			if (needRenderUpdateNotification.value) {
				return <UpdateNotificationComponent />
			}
			if (needRenderEventNotification.value) {
				return <EventNotificationComponent />
			}
			if (needRenderDaily.value) {
				return <DailyComponent day={userStore.userLegacy?.daily_stric ?? 1} />
			}
			return <MainComponent />
		})

		const onCreated = async () => {
			tgStore.initTgApp()
			if (!tgStore.user) {
				console.warn('Failed to get telegram user information')
				sentry.captureException(
					new SentryError('Tg sdk error', 'Failed to get telegram user information')
				)
				return
			}
			i18n.locale.value = tgStore.languageCode
			commonStore.setIsLoadingForTimeout(envVariables.loaderDuration)
			await useAdvertisingStore().init()
			await Promise.all([
				userStore.initUser(),
				userStore.loadUserLegacy(true),
				pvpStore.loadPvpCharacter(true)
			])
			if (!userStore.user || !userStore.userLegacy || !pvpStore.pvpCharacter) {
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
