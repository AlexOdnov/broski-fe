import { RouterLink, RouterView } from 'vue-router'
import { computed, defineComponent, onMounted } from 'vue'
import style from './style.module.css'
import { useTgSdkStore } from './stores/tg-sdk'
import { LoadingScreen } from './components'

export default defineComponent({
	setup() {
		const tgStore = useTgSdkStore()
		const isLoading = computed(() => {
			return tgStore.isLoading
		})
		onMounted(() => {
			tgStore.setIsLoading(true)
			setTimeout(() => {
				tgStore.setIsLoading(false)
			}, 5000) // for example
		})

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
