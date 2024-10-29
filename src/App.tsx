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
		const advertisingStore = useAdvertisingStore()
		const sentry = useSentry()
		const { i18n } = useLocalization()

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

		const disableDevTools = () => {
			const ctrlShiftKey = (e: KeyboardEvent, keyCode: string) =>
				e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0)

			const preventDefault = (e: Event) => e.preventDefault()

			const disableKeyboardShortcut = (e: KeyboardEvent) => {
				// Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + Shift + C
				if (
					e.code === 'F12' ||
					ctrlShiftKey(e, 'I') ||
					ctrlShiftKey(e, 'J') ||
					ctrlShiftKey(e, 'C')
				)
					preventDefault(e)
			}

			document.addEventListener('keydown', disableKeyboardShortcut)
			// Disable right-click
			document.addEventListener('contextmenu', preventDefault)

			document.addEventListener('keydown', (e) => {
				if (ctrlShiftKey(e, 'Z')) {
					document.removeEventListener('contextmenu', preventDefault)
				}
			})
		}

		const onCreated = async () => {
			if (envVariables.environment !== 'dev') {
				disableDevTools()
			}
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
			await userStore.loadUserLegacy(true)
			await Promise.all([userStore.loadUser(), pvpStore.loadPvpCharacter(true)])
			if (!userStore.user || !userStore.userLegacy || !pvpStore.pvpCharacter) {
				console.warn('Failed to get broski user information')
				return
			}
			isUserExist.value = true
			advertisingStore.init()
			tasksStore.getTasks()
			referralsStore.loadReferrals()
			userStore.switchRegion()
		}

		onCreated()

		return () => <div class={styles.app}>{getComponent.value}</div>
	}
})
