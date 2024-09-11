import { RouterLink, RouterView } from 'vue-router'
import { computed, defineComponent, ref } from 'vue'
import styles from './style.module.css'
import { DailyComponent, LoadingScreen } from './components'
import { useUserStore } from './stores/user'
import { useTgSdkStore } from './stores/tg-sdk'
import { useTasksStore } from './stores/tasks'
import { useReferralsStore } from './stores/referrals'
import { useAdvertisingStore } from '@/stores/advertising'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		const tasksStore = useTasksStore()
		const tgStore = useTgSdkStore()
		const referralsStore = useReferralsStore()

		const isUserError = ref(false)

		const isLoaderVisible = computed(() => {
			return userStore.isLoading || isUserError.value
		})

		const isRewardAvailable = computed(
			() => !timeBeforeMiningLeft.value && !userStore.user?.mining_claim
		)
		const timeBeforeMiningLeft = computed(() => userStore.timeBeforeMiningLeftString)

		const onCreated = async () => {
			await useAdvertisingStore().init()
			// tgStore.initTgApp()
			// if (!tgStore.user) {
			// 	isUserError.value = true
			// 	console.warn('Failed to get telegram user information')
			// 	return
			// }
			// await userStore.loadUser(true)
			if (!userStore.user) {
				isUserError.value = true
				console.warn('Failed to get broski user information')
			}
			tasksStore.getTasks()
			referralsStore.loadReferrals()
			userStore.startUpdateMiningString()
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
		const needRenderDaily = computed(() => userStore.user?.daily_claim === false)

		const coins = computed(() => Intl.NumberFormat('en-US').format(userStore.userScore))

		onCreated()

		return () => (
			<>
				{isLoaderVisible.value ? (
					<LoadingScreen />
				) : (
					<div class={styles.app}>
						{needRenderDaily.value ? (
							<DailyComponent day={userStore.user?.daily_stric ?? 1} />
						) : (
							<>
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
												{Boolean(referralsStore.sumReferralsReward) && (
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
							</>
						)}
					</div>
				)}
			</>
		)
	}
})
