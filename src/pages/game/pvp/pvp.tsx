import { computed, defineComponent, ref } from 'vue'

import styles from './pvp.module.css'
import { BuyPremium, DropConfetti, MatchCharacterCard } from '@/components/pvp'
import { usePvpStore } from '@/stores/pvp'
import { AdIcon } from '@/components/icons'
import { MatchResult } from '@/api/generatedApi'
import {
	CoinCounter,
	UiButton,
	UiText,
	type UiTextFontWeight,
	type UiBottomSheetMethods,
	UiBanner
} from '@/components'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { envVariables } from '@/services/env'
import { useLocalization } from '@/services/localization'
import { useUserStore } from '@/stores/user'
import { useAdvertisingStore } from '@/stores/advertising'

const PvpPage = defineComponent({
	name: 'PvpPage',
	setup() {
		const pvpStore = usePvpStore()
		const tgStore = useTgSdkStore()
		const userStore = useUserStore()
		const advStore = useAdvertisingStore()
		const { t } = useLocalization()

		const premiumModal = ref<UiBottomSheetMethods | null>(null)

		const renderDonateButton = computed(() => {
			return pvpStore.isCharacterPremium ? (
				<UiButton
					class={styles.fullWidth}
					text={t('pvp.getEnergy')}
					loading={pvpStore.isLoading}
					whenClick={async () => {
						tgStore.openInvoice(envVariables.invoice10Energy, () => pvpStore.loadPvpCharacter())
					}}
				/>
			) : (
				<UiButton
					class={styles.fullWidth}
					text={t('premium.getPremium')}
					loading={pvpStore.isLoading}
					whenClick={() => premiumModal.value?.open()}
				/>
			)
		})

		const renderButtons = computed(() => {
			if (!pvpStore.pvpMatch && !pvpStore.pvpCharacter?.energy.remaining) {
				return renderDonateButton.value
			}
			if (!pvpStore.pvpMatch) {
				return (
					<UiButton
						class={styles.fullWidth}
						font="BarcadeBrawlRegular"
						text={t('pvp.findEnemy')}
						loading={pvpStore.isLoading}
						disabled={!pvpStore.pvpCharacter?.energy.remaining}
						mod="primary"
						whenClick={async () => {
							await pvpStore.searchPvpOpponent()
						}}
					/>
				)
			}
			if (!pvpStore.pvpMatchResult) {
				return (
					<>
						<UiButton
							font="BarcadeBrawlRegular"
							text={t('pvp.fight')}
							loading={pvpStore.isLoading}
							mod="primary"
							whenClick={async () => {
								await pvpStore.startPvpMatch()
								if (pvpStore.pvpMatchResult?.result === MatchResult.Win) {
									tgStore.hapticFeedback('heavy')
								}
							}}
						/>
						<UiButton
							font="BarcadeBrawlRegular"
							text={t('pvp.skip')}
							loading={pvpStore.isLoading}
							mod="inverse"
							whenClick={async () => {
								await pvpStore.skipPvpMatch()
							}}
						/>
					</>
				)
			}
			return (
				<>
					{pvpStore.pvpMatchResult?.result === MatchResult.Win && (
						<UiButton
							font="BarcadeBrawlRegular"
							size={'xs'}
							text={'X3 $BRO'}
							loading={pvpStore.isLoading}
							mod="primary"
							leftIcon={<AdIcon />}
							disabled={!userStore.user?.advertising.limit}
							whenClick={async () => {
								if (await advStore.showAdv()) {
									await pvpStore.clearPvp(true)
									return
								}
							}}
						/>
					)}
					<UiButton
						class={pvpStore.pvpMatchResult?.result === MatchResult.Lose && styles.fullWidth}
						size={'xs'}
						font="BarcadeBrawlRegular"
						text={t(pvpStore.pvpMatchResult?.result === MatchResult.Win ? 'claim' : 'pvp.exit')}
						loading={pvpStore.isLoading}
						mod="inverse"
						whenClick={async () => {
							await pvpStore.clearPvp()
						}}
					/>
				</>
			)
		})

		const textInFront = computed(() => {
			if (pvpStore.pvpMatchResult) {
				return (
					<>
						{pvpStore.pvpMatchResult?.result === MatchResult.Win
							? t('pvp.youWon')
							: t('pvp.YouLost')}
						<br />
						{pvpStore.pvpMatchResult?.loot?.coins ?? 0}&nbsp;$BRO
					</>
				)
			}
			if (pvpStore.pvpMatch) {
				return 'VS'
			}
			return null
		})

		const renderBottomText = computed(() => {
			const textProps = {
				color: '#797979',
				fontSize: '14px',
				lineHeight: '14px',
				fontWeight: 400 as UiTextFontWeight
			}
			return (
				<>
					{!pvpStore.pvpMatchResult && pvpStore.pvpMatch?.match_id && (
						<div class={[styles.fullWidth, styles.bottomText]}>
							<UiText {...textProps}> {t('pvp.skipOpponent')}:</UiText>&nbsp;
							<CoinCounter reverse coins={50} />
						</div>
					)}
					{pvpStore.pvpMatchResult?.result === MatchResult.Lose && (
						<div class={[styles.fullWidth, styles.bottomText]}>
							<UiText {...textProps}> {t('pvp.youWas')}</UiText>&nbsp;
							<UiText {...textProps} color={'#FF5449'}>
								{t('pvp.knockedOut')}
							</UiText>
						</div>
					)}
				</>
			)
		})

		return () => (
			<div class={styles.pvp}>
				<div class={[styles.textInFrontWrapper, styles.fullWidth]}>
					{textInFront.value && (
						<>
							{pvpStore.pvpMatchResult?.result === MatchResult.Win && <DropConfetti />}
							<UiText
								shadow
								fontFamily="barcadeBrawl"
								class={styles.textInFront}
								fontSize="24px"
								fontWeight={400}
								lineHeight="40px"
								color={pvpStore.pvpMatchResult?.result === MatchResult.Lose ? '#FF5449' : '#FFFFFF'}
							>
								{textInFront.value}
							</UiText>
						</>
					)}
				</div>
				<MatchCharacterCard
					class={pvpStore.pvpMatchResult?.result === MatchResult.Lose && styles.lose}
				/>
				<MatchCharacterCard
					class={pvpStore.pvpMatchResult?.result === MatchResult.Win && styles.lose}
					isEnemy
				/>
				{renderButtons.value}
				{renderBottomText.value}
				<UiBanner class={styles.fullWidth} />
				<BuyPremium ref={premiumModal} />
			</div>
		)
	}
})

export default PvpPage
