import { RouterLink, RouterView } from 'vue-router'
import { computed, defineComponent, ref } from 'vue'
import style from './style.module.css'
import { LoadingScreen } from './components'
import { useUserStore } from './stores/user'
import { useTgSdkStore } from './stores/tg-sdk'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		const tgStore = useTgSdkStore()

		const isUserError = ref(false)

		const isLoaderVisible = computed(() => {
			return userStore.isLoading || isUserError.value
		})

		const onCreated = async () => {
			// tgStore.initTgApp()
			// if (!tgStore.user) {
			// 	isUserError.value = true
			// 	console.warn('Failed to get telegram user information')
			// 	return
			// }
			await userStore.loadUser()
			// if (!userStore.user) {
			// 	isUserError.value = true
			// 	console.warn('Failed to get broski user information')
			// }
		}

		onCreated()

		return () => (
			<>
				{isLoaderVisible.value ? (
					<LoadingScreen />
				) : (
					<div class={style.app}>
						<header>coin count component</header>

						<main class={style.pageContainer}>
							<RouterView class={style.page} />
						</main>

						<footer>
							<nav class={style.navigation}>
								<RouterLink to="/">game</RouterLink>
								<RouterLink to="/tasks">task</RouterLink>
								<RouterLink to="/referrals">refs</RouterLink>
							</nav>
						</footer>
					</div>
				)}
			</>
		)
	}
})
