import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import styles from './styles.module.css'
import { UiButton, type ButtonMod, ReferralElement, UiText } from '@/components'
import { useReferralsStore } from '@/stores/referrals'
import { useUserStore } from '@/stores/user'
import { envVariables } from '@/services/env'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { UserBalance } from '@/components/ui/user-balance'
import { StarIcon, TicketIcon } from '@/components/icons'
import { useLocalization } from '@/services/localization'

const ReferralsPage = defineComponent({
	name: 'ReferralsPage',
	setup() {
		const referralsStore = useReferralsStore()
		const userStore = useUserStore()
		const tgSdk = useTgSdkStore()
		const { t } = useLocalization()

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
							text: t('linkCopied')
						}
					: {
							mod: 'primary',
							text: t('inviteBro')
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
							text: `${t('claim')} ${Intl.NumberFormat('en-US').format(referralsStore.sumReferralsReward)} $BRO`,
							whenClick: referralsStore.claimReferralsReward
						}
					: {
							mod: 'secondary',
							text: t('comeBackLater'),
							disabled: true,
							whenClick: () => {}
						}
			}
		)

		const whenCopyLink = () => {
			tgSdk.openLink(
				`https://t.me/share/url?url=${envVariables.botUrl}?startapp=${userStore.userLegacy?.ref_code}&text=${t('inviteText')}`
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
				<UserBalance />
				<div class={styles.header}>
					<div class={styles.text}>
						<p class={styles.headerDark}>
							5% {t('fromBrosIncome')} + <TicketIcon height={14} />
							&nbsp;
							{t('ticket', 1)}
						</p>
						<p class={styles.headerLight}>
							<StarIcon height={14} />
							{t('premiumAdditionally')}
							<UiText isAccent>50 $BRO</UiText> +
							<TicketIcon height={14} /> {t('ticket', 3)}
						</p>
					</div>
					<UiButton size={'sm'} {...copyButtonProps.value} whenClick={whenCopyLink} />
				</div>
				<div class={styles.content}>
					<div class={styles.listHeader}>
						<UiText fontSize={'18px'} color={'#f0f0f0'} fontWeight={500} class={styles.subTitle}>
							{t('myBros')}
						</UiText>
						<UiText fontWeight={400} fontSize={'14px'} color={'#797979'}>
							{t('total')}: {Intl.NumberFormat('en-US').format(referralsStore.totalReferrals)}
						</UiText>
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
