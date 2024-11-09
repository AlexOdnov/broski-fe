import styles from './main.module.css'
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTasksStore } from '@/stores/tasks'
import { useReferralsStore } from '@/stores/referrals'
import { RouteName } from '@/router'
import { useCommonStore } from '@/stores/common'
import { DollarIcon, GamepadIcon, GiftIcon, UserIcon, ConstructIcon } from '@/components/icons'
import { UiText } from '@/components'
import { useLocalization } from '@/services/localization'
import { LootboxesModal } from '@/components/lootboxes-modal'
import { useTgSdkStore } from '@/stores/tg-sdk'

export const MainComponent = defineComponent({
	name: 'MainComponent',
	setup: () => {
		const { t } = useLocalization()

		const tasksStore = useTasksStore()
		const referralsStore = useReferralsStore()
		const commonStore = useCommonStore()
		const tgStore = useTgSdkStore()

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
								<div
									class={styles.navBtn}
									onClick={() => Telegram.WebApp.HapticFeedback.notificationOccurred('error')}
								>
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
								<div
									class={styles.navBtn}
									onClick={() => Telegram.WebApp.HapticFeedback.notificationOccurred('success')}
								>
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
								<div
									class={[styles.centralNav, styles.navBtn, styles.border]}
									onClick={() => Telegram.WebApp.HapticFeedback.notificationOccurred('warning')}
								>
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
								<div
									class={styles.navBtn}
									onClick={() => Telegram.WebApp.HapticFeedback.selectionChanged()}
								>
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
							<div class={[styles.navBtn]} onClick={() => tgStore.hapticFeedback('rigid')}>
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
