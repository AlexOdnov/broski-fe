import { RouterLink, RouterView } from 'vue-router'
import { computed, defineComponent } from 'vue'
import style from './style.module.css'
import { LoadingScreen } from './components'
import { useUserStore } from './stores/user'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		const isLoading = computed(() => {
			return userStore.isLoading
		})

		const onCreated = () => {
			userStore.loadUser()
		}

		onCreated()

		return () => (
			<>
				{isLoading.value ? (
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
