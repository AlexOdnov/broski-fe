import { computed, defineComponent, ref } from 'vue'
import styles from './header.module.css'
import { useUserStore } from '@/stores/user'
import { UiHeightPlaceholder, UiProgressBar, UiText, type UiBottomSheetMethods } from '@/components'
import { usePvpStore } from '@/stores/pvp'
import { HeaderPremActiveIcon, HeaderPremIcon } from '@/components/icons'
import { BuyPremium } from '@/components/pvp'
import { useCommonStore } from '@/stores/common'
import { useTgSdkStore } from '@/stores/tg-sdk'

export const UiHeader = defineComponent({
	name: 'UiHeader',
	setup: () => {
		const userStore = useUserStore()
		const pvpStore = usePvpStore()
		const commonStore = useCommonStore()
		const tgStore = useTgSdkStore()

		const premiumModal = ref<UiBottomSheetMethods | null>(null)

		const coins = computed(() =>
			userStore.userScore > 100000
				? Intl.NumberFormat('en-US', { notation: 'compact' }).format(userStore.userScore)
				: Intl.NumberFormat('en-US').format(userStore.userScore)
		)
		const tonBalance = computed(() =>
			new Intl.NumberFormat('en-us', { minimumFractionDigits: 3 }).format(
				userStore.user?.ton_balance ?? 0
			)
		)

		return () => (
			<>
				<div
					class={styles.header}
					style={commonStore.isNavigationDisabled && 'pointer-events: none'}
				>
					<div
						class={styles.headerItem}
						onClick={() => {
							premiumModal.value?.open()
							tgStore.hapticFeedback()
						}}
					>
						<UiProgressBar
							filledItems={pvpStore.pvpCharacter?.experience.current_experience ?? 0}
							totalItems={pvpStore.pvpCharacter?.experience.maximum_experience ?? 1}
							borderColor={'#FFB800'}
							fillerColor={'#815D00'}
							height={18}
							rounded={false}
							leftStraight
						/>
						<div class={styles.headerIcon} style={'border-color: #FFB800'}>
							<img
								class={styles.headerIconImage}
								src={
									pvpStore.isCharacterPremium
										? '/images/header-level-prem.webp'
										: '/images/header-level.webp'
								}
							/>
							<UiText class={styles.level} color={'#141517'} fontSize={'14px'} fontWeight={700}>
								{pvpStore.pvpCharacter?.level}
							</UiText>
							{pvpStore.isCharacterPremium ? (
								<HeaderPremActiveIcon class={styles.premIcon} />
							) : (
								<HeaderPremIcon class={styles.premIcon} />
							)}
						</div>
						<UiText class={styles.headerText} color={'#F0F0F0'} fontSize={'10px'} fontWeight={600}>
							{`${pvpStore.pvpCharacter?.experience.current_experience || 0}/${pvpStore.pvpCharacter?.experience.maximum_experience || 0}`}
						</UiText>
					</div>
					<div class={styles.headerItem}>
						<UiProgressBar
							filledItems={pvpStore.pvpCharacter?.energy.remaining ?? 0}
							totalItems={pvpStore.pvpCharacter?.energy.maximum ?? 1}
							borderColor={'#8000FF'}
							fillerColor={'#490092'}
							height={18}
							rounded={false}
							leftStraight
						/>
						<div class={styles.headerIcon} style={'border-color: #8000FF'}>
							<img class={styles.headerIconImage} src="/images/header-energy.webp" />
						</div>
						<UiText class={styles.headerText} color={'#F0F0F0'} fontSize={'10px'} fontWeight={600}>
							{`${pvpStore.pvpCharacter?.energy.remaining || 0}/${pvpStore.pvpCharacter?.energy.maximum || 0}`}
						</UiText>
						{pvpStore.timeToRestoreEnergy && (
							<UiText
								class={styles.energyTimer}
								color={'#F0F0F0'}
								fontSize={'8px'}
								fontWeight={400}
							>
								{pvpStore.timeToRestoreEnergy}
							</UiText>
						)}
					</div>
					<div class={styles.headerItem}>
						<UiProgressBar
							filledItems={userStore.userScore ?? 0}
							totalItems={userStore.userScore ?? 1}
							borderColor={'#FFB800'}
							fillerColor={'#815D00'}
							height={18}
							rounded={false}
							leftStraight
						/>
						<div class={styles.headerIcon} style={'border-color: #FFB800'}>
							<img class={styles.headerIconImage} src="/images/header-coin.webp" />
						</div>
						<UiText class={styles.headerText} color={'#F0F0F0'} fontSize={'10px'} fontWeight={600}>
							{coins.value}
						</UiText>
					</div>
					<div class={styles.headerItem}>
						<UiProgressBar
							filledItems={userStore.user?.ton_balance ?? 0}
							totalItems={userStore.user?.ton_balance ?? 1}
							borderColor={'#0088CC'}
							fillerColor={'#006496'}
							height={18}
							rounded={false}
							leftStraight
						/>
						<div class={styles.headerIcon} style={'border-color: #0088CC'}>
							<img class={styles.headerIconImage} src="/images/header-ton.webp" />
						</div>
						<UiText class={styles.headerText} color={'#F0F0F0'} fontSize={'10px'} fontWeight={600}>
							{tonBalance.value}
						</UiText>
					</div>
				</div>
				<UiHeightPlaceholder height={'var(--headerHeight)'} />
				<BuyPremium ref={premiumModal} />
			</>
		)
	}
})
