import { computed, defineComponent, ref } from 'vue'

import styles from './pvp.module.css'
import { EnergyCounter, BuyPremium, MatchCharacterCard } from '@/components/pvp'
import { usePvpStore } from '@/stores/pvp'
import { TicketIcon } from '@/components/icons'
import { MatchResult } from '@/api/generatedApi'
import {
	CoinCounter,
	UiButton,
	UiText,
	type UiTextFontWeight,
	UiBottomSheet,
	type UiBottomSheetMethods
} from '@/components'
import { useI18n } from 'vue-i18n'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { envVariables } from '@/services/env'

const PvpPage = defineComponent({
	name: 'PvpPage',
	setup() {
		const pvpStore = usePvpStore()
		const tgStore = useTgSdkStore()
		const { t } = useI18n()

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
				<UiButton
					class={styles.fullWidth}
					font="BarcadeBrawlRegular"
					text={t(pvpStore.pvpMatchResult.result === MatchResult.Win ? 'claim' : 'pvp.exit')}
					loading={pvpStore.isLoading}
					mod="inverse"
					whenClick={async () => {
						pvpStore.clearPvp()
					}}
				/>
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
				<div class={[styles.fullWidth, styles.bottomText]}>
					{!pvpStore.pvpMatchResult && pvpStore.pvpMatch?.match_id && (
						<>
							<UiText {...textProps}> {t('pvp.skipOpponent')}:</UiText>&nbsp;
							{envVariables.skipPvpCost === 'ticket' ? (
								<>
									<UiText {...textProps} color={'#FFB800'}>
										1
									</UiText>
									&nbsp;
									<TicketIcon height={14} />
								</>
							) : (
								<CoinCounter reverse coins={50} />
							)}
						</>
					)}
					{pvpStore.pvpMatchResult?.result === MatchResult.Lose && (
						<>
							<UiText {...textProps}> {t('pvp.youWas')}</UiText>&nbsp;
							<UiText {...textProps} color={'#FF5449'}>
								{t('pvp.knockedOut')}
							</UiText>
						</>
					)}
				</div>
			)
		})

		return () => (
			<div class={styles.pvp}>
				<EnergyCounter
					class={styles.fullWidth}
					currentEnergy={pvpStore.pvpCharacter?.energy.remaining ?? 0}
					totalEnergy={pvpStore.pvpCharacter?.energy.maximum ?? 0}
					timeToRestore={pvpStore.timeToRestoreEnergy}
				/>
				<div class={[styles.textInFrontWrapper, styles.fullWidth]}>
					{textInFront.value && (
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
				<UiBottomSheet
					ref={premiumModal}
					body={<BuyPremium whenBuyPremium={() => premiumModal.value?.close()} />}
					fullscreen
					withExitButton
				/>
			</div>
		)
	}
})

export default PvpPage
