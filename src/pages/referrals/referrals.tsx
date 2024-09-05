import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import styles from './styles.module.css'
import { UiButton, type ButtonMod, ReferralElement } from '@/components'
import { useReferralsStore } from '@/stores/referrals'
import { useUserStore } from '@/stores/user'

const ReferralsPage = defineComponent({
	name: 'ReferralsPage',
	setup() {
		const referralsStore = useReferralsStore()
		const userStore = useUserStore()

		const isLinkCopied = ref(false)
		const intersectionObserver = ref<null | IntersectionObserver>(null)

		const copyButtonProps = computed(
			(): {
				mod: ButtonMod
				text: string
			} => {
				return isLinkCopied.value
					? {
							mod: 'inverse',
							text: 'Link Copied'
						}
					: {
							mod: 'primary',
							text: 'Invite Bro'
						}
			}
		)

		const claimButtonProps = computed(
			(): {
				mod: ButtonMod
				text: string
				disabled?: boolean
				whenClick: () => void
			} => {
				return referralsStore.sumReferralsReward
					? {
							mod: 'inverse',
							text: `Claim ${Intl.NumberFormat('en-US').format(referralsStore.sumReferralsReward)} $BRO`,
							whenClick: referralsStore.claimReferralsReward
						}
					: {
							mod: 'secondary',
							text: `Come back later, bro!`,
							disabled: true,
							whenClick: () => {}
						}
			}
		)

		const whenCopyLink = () => {
			navigator.clipboard.writeText(
				`${window.appConfig.botLink}?startapp=${userStore.user?.ref_code}`
			)
			isLinkCopied.value = true
			setTimeout(() => {
				isLinkCopied.value = false
			}, 3000)
		}

		onMounted(() => {
			const loader = document.querySelector('#infinity-loader') as Element
			const intersectionObserverConfig: IntersectionObserverInit = {
				threshold: 0.01
			}
			const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
				if (entries[0].isIntersecting) {
					referralsStore.loadReferrals()
				}
			}
			intersectionObserver.value = new IntersectionObserver(
				intersectionCallback,
				intersectionObserverConfig
			)
			intersectionObserver.value.observe(loader)
		})

		onBeforeUnmount(() => {
			intersectionObserver.value?.disconnect()
			referralsStore.resetStore()
		})

		return () => (
			<div class={styles.referralsPage}>
				<div class={styles.header}>
					<div class={styles.text}>
						<p class={styles.headerDark}>
							10% from bro's income + <img class={styles.icon} src="/images/ticket.png" /> 5 Tickets
						</p>
						<p class={styles.headerLight}>
							<img class={styles.icon} src="/images/star.png" /> Premium: additionally
							<span class={styles.yellow}>50 $BRO</span> +
							<img class={styles.icon} src="/images/ticket.png" /> 25 Tickets
						</p>
					</div>
					<UiButton size={'sm'} {...copyButtonProps.value} whenClick={whenCopyLink} />
				</div>
				<div class={styles.content}>
					<div class={styles.listHeader}>
						<p class={styles.subTitle}>My Bros</p>
						<p class={styles.total}>
							Total: {Intl.NumberFormat('en-US').format(referralsStore.totalReferrals)}
						</p>
					</div>
					<div class={styles.scrollContent}>
						{referralsStore.referrals.map((el) => (
							<ReferralElement referralElement={el} />
						))}
						<div id="infinity-loader" style={{ minHeight: '1px' }} />
					</div>
				</div>
				<div class={styles.claimButton}>
					<UiButton size={'sm'} {...claimButtonProps.value} />
				</div>
			</div>
		)
	}
})

export default ReferralsPage
