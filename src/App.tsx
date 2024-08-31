import { RouterLink, RouterView } from 'vue-router'
import { computed, defineComponent, ref } from 'vue'
import styles from './style.module.css'
import { LoadingScreen } from './components'
import { useUserStore } from './stores/user'
import { useTgSdkStore } from './stores/tg-sdk'
import { useTasksStore } from './stores/tasks'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		const tasksStore = useTasksStore()
		const tgStore = useTgSdkStore()

		const isUserError = ref(false)

		const isLoaderVisible = computed(() => {
			return userStore.isLoading || isUserError.value
		})

		const isRewardAvailable = computed(
			() => !timeBeforeMiningLeft.value && !userStore.user?.mining_claim
		)
		const timeBeforeMiningLeft = computed(() => userStore.timeBeforeMiningLeftString)

		const onCreated = async () => {
			tgStore.initTgApp()
			if (!tgStore.user) {
				isUserError.value = true
				console.warn('Failed to get telegram user information')
				return
			}
			await userStore.loadUser(true)
			await tasksStore.getTasks()
			userStore.startUpdateMiningString()
			if (!userStore.user) {
				isUserError.value = true
				console.warn('Failed to get broski user information')
			}
		}

		const whenMiningClicked = async () => {
			if (!isRewardAvailable.value && !timeBeforeMiningLeft.value) {
				await userStore.startMining()
				await userStore.loadUser()
				return
			}
			if (isRewardAvailable.value) {
				await userStore.doneMining()
				await userStore.loadUser()
			}
		}

		const coins = computed(() => Intl.NumberFormat('en-US').format(userStore.userScore))

		onCreated()

		return () => (
			<>
				{isLoaderVisible.value ? (
					<LoadingScreen />
				) : (
					<div class={styles.app}>
						<header class={styles.coins}>
							<img class={styles.coinIcon} src="/images/bro-coin.png" />
							{coins.value}
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
										{Boolean(tasksStore.uncompletedTasks.length) && (
											<img class={styles.notice} src="/images/notice.png" />
										)}
										<div class={[styles.letter, styles.rotateRight]}>R</div>
										<div class={[styles.letterShadow, styles.rotateRight]}>R</div>
										<span class={styles.btnText}>Earn</span>
									</div>
								</RouterLink>
								<RouterLink activeClass={styles.active} to="/referrals">
									<div class={styles.navBtn}>
										{Boolean(userStore.sumReferralsReward) && (
											<img class={styles.notice} src="/images/notice.png" />
										)}
										<div class={[styles.letter, styles.rotateLeft]}>O</div>
										<div class={[styles.letterShadow, styles.rotateLeft]}>O</div>
										<span class={styles.btnText}>My Bros</span>
									</div>
								</RouterLink>
								<div
									class={[styles.navBtn, timeBeforeMiningLeft.value && styles.opacity]}
									onClick={whenMiningClicked}
								>
									{(isRewardAvailable.value ||
										(!isRewardAvailable.value && !timeBeforeMiningLeft.value)) && (
										<img class={styles.notice} src="/images/notice.png" />
									)}
									<img class={styles.btnImg} src="/images/pickaxe.png" />
									{isRewardAvailable.value && (
										<>
											<span class={[styles.btnText, styles.yellow]}>Claim</span>
											<span class={[styles.claimNumber, styles.yellow]}>+72</span>
										</>
									)}
									{!isRewardAvailable.value && !timeBeforeMiningLeft.value && (
										<span class={[styles.btnText, styles.yellow]}>Farm</span>
									)}
									{!isRewardAvailable.value && timeBeforeMiningLeft.value && (
										<span class={styles.time}>{timeBeforeMiningLeft.value}</span>
									)}
								</div>
							</nav>
						</footer>
					</div>
				)}
			</>
		)
	}
})
