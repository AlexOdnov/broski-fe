import styles from './main.module.css'
import { computed, defineComponent, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useTasksStore } from '@/stores/tasks'
import { useReferralsStore } from '@/stores/referrals'
import { RouteName } from '@/router'
import { useCommonStore } from '@/stores/common'
import { usePvpStore } from '@/stores/pvp'
import { DollarIcon, GamepadIcon, GiftIcon, UserIcon, ConstructIcon } from '@/components/icons'
import { UiText } from '@/components'
import { useLocalization } from '@/services/localization'
import { LootboxesModal } from '@/components/lootboxes-modal'

export const MainComponent = defineComponent({
	name: 'MainComponent',
	setup: () => {
		const { t } = useLocalization()

		const userStore = useUserStore()
		const tasksStore = useTasksStore()
		const referralsStore = useReferralsStore()
		const commonStore = useCommonStore()
		const pvpStore = usePvpStore()

		const isMiningLoading = ref(false)

		const isRewardAvailable = computed(
			() => !timeBeforeMiningLeft.value && !userStore.user?.mining.claim
		)
		const timeBeforeMiningLeft = computed(() => userStore.timeBeforeMiningLeftString)

		const whenMiningClicked = async () => {
			if (isMiningLoading.value) {
				return
			}
			isMiningLoading.value = true
			if (!isRewardAvailable.value && !timeBeforeMiningLeft.value) {
				await userStore.startMining()
				await userStore.loadUser()
				return
			}
			if (isRewardAvailable.value) {
				await userStore.doneMining()
				await userStore.loadUser()
				await pvpStore.loadPvpCharacter()
			}
			isMiningLoading.value = false
		}

		return () => (
			<>
				<main class={styles.pageContainer}>
					<RouterView class={styles.page} />
				</main>
				<footer class={styles.footer}>
					<nav
						class={[
							styles.navigation,
							commonStore.isNavigationDisabled && styles.navigationDisabled
						]}
					>
						<div class={[styles.nav, styles.navLeft, styles.border]}>
							<RouterLink
								to={{ name: RouteName.Game }}
								activeClass={styles.activeLink}
								class={styles.routerLink}
							>
								<div class={styles.navBtn}>
									<GamepadIcon />
									<UiText fontSize="12px" fontWeight={400} lineHeight="12px" fontFamily="roboto">
										{t('game')}
									</UiText>
								</div>
							</RouterLink>
							<div class={styles.delimiter} />
							<RouterLink
								to={{ name: RouteName.Tasks }}
								activeClass={styles.activeLink}
								class={styles.routerLink}
							>
								<div class={styles.navBtn}>
									<DollarIcon />
									{Boolean(tasksStore.uncompletedTasks.length) && (
										<img class={styles.notice} src="/images/notice.webp" />
									)}
									<UiText fontSize="12px" fontWeight={400} lineHeight="12px" fontFamily="roboto">
										{t('earn')}
									</UiText>
								</div>
							</RouterLink>
						</div>
						<LootboxesModal
							openButton={
								<div class={[styles.centralNav, styles.navBtn, styles.border]}>
									<GiftIcon height={40} />
									<UiText
										fontSize="12px"
										fontWeight={400}
										lineHeight="12px"
										fontFamily="roboto"
										color="#FFB800"
									>
										{t('lootboxes.open')}
									</UiText>
								</div>
							}
						/>
						<div class={[styles.nav, styles.navRight, styles.border]}>
							<RouterLink
								to={{ name: RouteName.Referrals }}
								activeClass={styles.activeLink}
								class={styles.routerLink}
							>
								<div class={styles.navBtn}>
									{Boolean(referralsStore.sumReferralsReward) && (
										<img class={styles.notice} src="/images/notice.webp" />
									)}
									<UserIcon />
									<UiText fontSize="12px" fontWeight={400} lineHeight="12px" fontFamily="roboto">
										{t('frens')}
									</UiText>
								</div>
							</RouterLink>
							<div class={styles.delimiter} />
							<div class={[styles.navBtn]}>
								<ConstructIcon style={{ color: '#4e4f4f' }} />
								<UiText
									fontSize="12px"
									fontWeight={400}
									lineHeight="12px"
									fontFamily="roboto"
									color={'#4e4f4f'}
								>
									{t('soon')}
								</UiText>
							</div>
						</div>
					</nav>
				</footer>
			</>
		)
	}
})
