import { RouterLink, RouterView } from 'vue-router'
import { computed, defineComponent, ref } from 'vue'
import styles from './style.module.css'
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

		const coins = computed(() => Intl.NumberFormat('en-US').format(userStore.userScore))

		onCreated()

		return () => (
			<>
				{isLoaderVisible.value ? (
					<LoadingScreen />
				) : (
					<div class={styles.app}>
						<header>
							<div class={styles.coins}>
								<img class={styles.coinIcon} src="/images/bro-coin.png" />
								{coins.value}
							</div>
						</header>
						<main class={styles.pageContainer}>
							<RouterView class={styles.page} />
						</main>
						<footer class={styles.footer}>
							<nav class={styles.navigation}>
								<RouterLink activeClass={styles.active} to="/">
									<div class={styles.navBtn}>
										<div class={[styles.letter, styles.rotateLeft]}>B</div>
										<div class={[styles.letterShadow, styles.rotateLeft]}>B</div>
										<span class={styles.btnText}>Game</span>
									</div>
								</RouterLink>
								<RouterLink activeClass={styles.active} to="/tasks">
									<div class={styles.navBtn}>
										<div class={[styles.letter, styles.rotateRight]}>R</div>
										<div class={[styles.letterShadow, styles.rotateRight]}>R</div>
										<span class={styles.btnText}>Earn</span>
									</div>
								</RouterLink>
								<RouterLink activeClass={styles.active} to="/referrals">
									<div class={styles.navBtn}>
										<div class={[styles.letter, styles.rotateLeft]}>O</div>
										<div class={[styles.letterShadow, styles.rotateLeft]}>O</div>
										<span class={styles.btnText}>My Bros</span>
									</div>
								</RouterLink>
								<div class={styles.navBtn}>
									<img class={styles.btnImg} src="/images/pickaxe.svg" />
									<span class={styles.btnText}>Claim</span>
								</div>
							</nav>
						</footer>
					</div>
				)}
			</>
		)
	}
})
