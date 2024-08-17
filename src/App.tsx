import { RouterLink, RouterView } from 'vue-router'
import { computed, defineComponent } from 'vue'
import styles from './style.module.css'
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

		const coins = computed(() => Intl.NumberFormat('en-US').format(100500))

		onCreated()

		return () => (
			<>
				{isLoading.value ? (
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
