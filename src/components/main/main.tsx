import styles from './main.module.css'
import { computed, defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useTasksStore } from '@/stores/tasks'
import { useReferralsStore } from '@/stores/referrals'
import { useI18n } from 'vue-i18n'

export const MainComponent = defineComponent({
	name: 'MainComponent',
	setup: () => {
		const userStore = useUserStore()
		const tasksStore = useTasksStore()
		const referralsStore = useReferralsStore()

		const isRewardAvailable = computed(
			() => !timeBeforeMiningLeft.value && !userStore.user?.mining_claim
		)
		const timeBeforeMiningLeft = computed(() => userStore.timeBeforeMiningLeftString)

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

		const { t } = useI18n()

		return () => (
			<>
				<header class={styles.header}>
					<div class={styles.coins}>
						<img class={styles.coinIcon} src="/images/bro-coin.webp" />
						{coins.value}
					</div>
					<div class={styles.boxes}>
						<img class={styles.boxIcon} src="/images/box.webp" />
						{userStore.userBoxes}
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
								<span class={styles.btnText}>{t('game')}</span>
							</div>
						</RouterLink>
						<RouterLink activeClass={styles.active} to="/tasks">
							<div class={styles.navBtn}>
								{Boolean(tasksStore.uncompletedTasks.length) && (
									<img class={styles.notice} src="/images/notice.webp" />
								)}
								<div class={[styles.letter, styles.rotateRight]}>R</div>
								<div class={[styles.letterShadow, styles.rotateRight]}>R</div>
								<span class={styles.btnText}>{t('earn')}</span>
							</div>
						</RouterLink>
						<RouterLink activeClass={styles.active} to="/referrals">
							<div class={styles.navBtn}>
								{Boolean(referralsStore.sumReferralsReward) && (
									<img class={styles.notice} src="/images/notice.webp" />
								)}
								<div class={[styles.letter, styles.rotateLeft]}>O</div>
								<div class={[styles.letterShadow, styles.rotateLeft]}>O</div>
								<span class={styles.btnText}>{t('myBros')}</span>
							</div>
						</RouterLink>
						<div
							class={[styles.navBtn, timeBeforeMiningLeft.value && styles.opacity]}
							onClick={whenMiningClicked}
						>
							{(isRewardAvailable.value ||
								(!isRewardAvailable.value && !timeBeforeMiningLeft.value)) && (
								<img class={styles.notice} src="/images/notice.webp" />
							)}
							<img class={styles.btnImg} src="/images/pickaxe.webp" />
							{isRewardAvailable.value && (
								<>
									<span class={[styles.btnText, styles.yellow]}>{t('claim')}</span>
									<span class={[styles.claimNumber, styles.yellow]}>+72</span>
								</>
							)}
							{!isRewardAvailable.value && !timeBeforeMiningLeft.value && (
								<span class={[styles.btnText, styles.yellow]}>{t('farm')}</span>
							)}
							{!isRewardAvailable.value && timeBeforeMiningLeft.value && (
								<span class={styles.time}>{timeBeforeMiningLeft.value}</span>
							)}
						</div>
					</nav>
				</footer>
			</>
		)
	}
})
