import { computed, defineComponent, onMounted, ref } from 'vue'

import styles from './pvp.module.css'
import { EnergyCounter } from '@/components/pvp/energy-counter'
import { usePvpStore } from '@/stores/pvp'
import {
	CombinationsIcon,
	DefenceIcon,
	LevelIcon,
	ProfileIcon,
	SpeedIcon,
	StrengthIcon,
	TicketIcon,
	WeightIcon
} from '@/components/icons'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { PowerCounter } from '@/components/pvp'
import { type AbilityScores, MatchResult } from '@/api/generatedApi'
import { UiButton, UiText, type UiTextFontWeight } from '@/components'
import { useI18n } from 'vue-i18n'

const PvpPage = defineComponent({
	name: 'PvpPage',
	setup() {
		const pvpStore = usePvpStore()
		const loading = ref(true)
		const tgStore = useTgSdkStore()

		const { t } = useI18n()

		const renderAbilities = (abilities: AbilityScores | undefined) => {
			return (
				<div class={styles.flexRow}>
					<div class={styles.iconWithNumber}>
						<WeightIcon height={12} />
						&nbsp;{abilities?.weight ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<DefenceIcon height={12} />
						&nbsp;{abilities?.defence ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<StrengthIcon height={12} />
						&nbsp;{abilities?.strength ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<SpeedIcon height={12} />
						&nbsp;{abilities?.speed ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<CombinationsIcon height={12} />
						&nbsp;{abilities?.combinations ?? '00'}
					</div>
				</div>
			)
		}

		const playerAbils = computed(() => renderAbilities(pvpStore.pvpCharacter?.abilities))
		const enemyAbils = computed(() => renderAbilities(pvpStore.pvpMatch?.opponent.abilities))

		const renderButtons = computed(() => {
			if (!pvpStore.pvpMatch) {
				return (
					<UiButton
						class={styles.fullWidth}
						font="BarcadeBrawlRegular"
						text={t('pvp.findEnemy')}
						loading={pvpStore.isLoading}
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
							mod="secondary"
							whenClick={async () => {
								await pvpStore.searchPvpOpponent()
							}}
						/>
					</>
				)
			}
			return (
				<UiButton
					font="BarcadeBrawlRegular"
					text={t('claim')}
					loading={pvpStore.isLoading}
					mod="secondary"
					whenClick={async () => {
						// тут что?
					}}
				/>
			)
		})

		const textInFront = computed(() => {
			if (pvpStore.pvpMatchResult) {
				return `${pvpStore.pvpMatchResult?.result === MatchResult.Win ? t('pvp.youWon') : t('pvp.YouLost')} ${pvpStore.pvpMatchResult?.loot?.coins} $BRO`
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
							</UiText>&nbsp;
							<TicketIcon height={14} />
						</>
					)}
					{pvpStore.pvpMatchResult?.result === MatchResult.Lose && (
						<>
							<UiText {...textProps}> {t('pvp.youWas')}</UiText>&nbsp;
							<UiText {...textProps} color={'#FF5449'}>{t('pvp.knockedOut')}</UiText>
						</>
					)}
				</div>
			)
		})

		onMounted(async () => {
			await pvpStore.loadPvpCharacter()
			loading.value = false
		})
		return () => (
			<div class={styles.pvp}>
				{!loading.value && (
					<EnergyCounter
						class={styles.fullWidth}
						currentEnergy={pvpStore.pvpCharacter?.energy.remaining ?? 0}
						totalEnergy={pvpStore.pvpCharacter?.energy.maximum ?? 0}
					/>
				)}
				{textInFront.value && (
					<div style={{ height: 0 }} class={[styles.textInFrontWrapper, styles.fullWidth]}>
						<UiText
							fontFamily="barcadeBrawl"
							class={styles.textInFront}
							fontSize="24px"
							fontWeight={400}
							lineHeight="40px"
							color={pvpStore.pvpMatchResult?.result === MatchResult.Win ? '#FFFFFF' : '#FF5449'}
						>
							{textInFront.value}
						</UiText>
					</div>
				)}
				<div class={styles.card}>
					<div class={styles.userName}>
						<div class={styles.profileIconWrapper}>
							<ProfileIcon size={10} />
						</div>
						{tgStore.user?.username ?? 'user'}
					</div>
					<div class={[styles.you, styles.profile, styles.yellowBorder]} />
					<PowerCounter power={pvpStore.pvpCharacter?.power ?? 0} />
					{playerAbils.value}
					<div class={styles.lvl}>
						<LevelIcon height={12} />
						&nbsp;
						<UiText
							color="#4E4F4F"
							fontSize="12"
							fontWeight={400}
						>{`lvl ${pvpStore.pvpCharacter?.level ?? '??'}`}</UiText>
					</div>
				</div>
				<div class={styles.card}>
					<div class={styles.userName}>
						<div class={styles.profileIconWrapper}>
							<ProfileIcon size={10} />
						</div>
						<UiText color="#797979">
							{pvpStore.pvpMatch?.opponent.username ?? t('pvp.lookingForEnemy')}
						</UiText>
					</div>
					<div
						class={[
							pvpStore.pvpMatch?.opponent ? styles.enemy : styles.enemyUnknown,
							styles.profile
						]}
					/>
					<PowerCounter power={pvpStore.pvpMatch?.opponent?.power ?? 0} />
					{enemyAbils.value}
					<div class={styles.lvl}>
						<LevelIcon height={12} />
						&nbsp;
						<UiText
							color="#4E4F4F"
							fontSize="12px"
							fontWeight={400}
						>{`lvl ${pvpStore.pvpMatch?.opponent?.level ?? '??'}`}</UiText>
					</div>
				</div>
				{renderButtons.value}
				{renderBottomText.value}
			</div>
		)
	}
})

export default PvpPage
