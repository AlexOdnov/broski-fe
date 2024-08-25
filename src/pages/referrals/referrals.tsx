import { computed, defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import { UiButton, type ButtonMod, ReferralElement } from '@/components'
import { useUserStore } from '@/stores/user'

const ReferralsPage = defineComponent({
	name: 'ReferralsPage',
	setup() {
		const userStore = useUserStore()

		const isLinkCopied = ref(false)

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
				return userStore.sumRefBonus
					? {
							mod: 'inverse',
							text: `Claim ${userStore.sumRefBonus} $BRO`,
							whenClick: userStore.claimRefBonus
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

		return () => (
			<div class={styles.referralsPage}>
				<div class={styles.header}>
					<div class={styles.text}>
						<p class={styles.headerDark}>
							10% from bro's income + <img class={styles.icon} src="/images/ticket.png" /> 1 Ticket
						</p>
						<p class={styles.headerLight}>
							<img class={styles.icon} src="/images/star.png" /> Premium: additionally
							<span class={styles.yellow}>50 $BRO</span> +
							<img class={styles.icon} src="/images/ticket.png" /> 3 Tickets
						</p>
					</div>
					<UiButton size={'sm'} {...copyButtonProps.value} whenClick={whenCopyLink} />
				</div>
				<div class={styles.content}>
					<p class={styles.subTitle}>My Bros</p>
					<div class={styles.scrollContent}>
						{userStore.referals.map((el) => (
							<ReferralElement referralElement={el} />
						))}
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
