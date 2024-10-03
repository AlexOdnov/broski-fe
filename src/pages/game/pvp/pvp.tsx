import { computed, defineComponent } from 'vue'

import styles from './pvp.module.css'
import { EnergyCounter } from '@/components/pvp/energy-counter'
import { usePvpStore } from '@/stores/pvp'
import { TicketIcon } from '@/components/icons'
import { MatchCharacterCard } from '@/components/pvp'
import { MatchResult } from '@/api/generatedApi'
import { UiButton, UiText, type UiTextFontWeight } from '@/components'
import { useI18n } from 'vue-i18n'

const PvpPage = defineComponent({
	name: 'PvpPage',
	setup() {
		const pvpStore = usePvpStore()
		const { t } = useI18n()
		const renderButtons = computed(() => {
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
							<UiText {...textProps} color={'#FFB800'}>
								1
							</UiText>
							&nbsp;
							<TicketIcon height={14} />
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
			</div>
		)
	}
})

export default PvpPage
