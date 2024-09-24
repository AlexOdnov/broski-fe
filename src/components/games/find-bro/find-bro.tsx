import { computed, defineComponent, type PropType } from 'vue'
import styles from '../shared/game-styles.module.css'
import { INITIAL_ATTEMPTS_COUNT, useFindBroGameStore } from '@/stores/find-bro-game'
import { type ButtonMod, UiButton } from '@/components'
import { useUserStore } from '@/stores/user'
import { useAdvertisingStore } from '@/stores/advertising'
import { AdIcon } from '@/components/icons'
import { GameElement, TicketsCounter } from '../shared'
import { GameStatus, WIN_GAME_POINTS, FIELD_PLACEHOLDERS } from '@/utils/games'
import { useI18n } from 'vue-i18n'
import { LuckyButtons } from '@/utils/lucky-buttons'

export const FindBroGame = defineComponent({
	name: 'FindBroGame',
	props: {
		whenSwitchToSuperGame: { type: Function as PropType<() => void>, required: true }
	},
	setup(props) {
		const gameStore = useFindBroGameStore()
		const userStore = useUserStore()
		const advStore = useAdvertisingStore()
		const { t } = useI18n()

		const topText = computed(() => {
			switch (gameStore.gameStatus) {
				case GameStatus.Idle:
					return t('findBRO')
				case GameStatus.Win:
					return t('brooo')
				case GameStatus.Lose:
					return t('fail')
				case GameStatus.InProgress:
					return `${gameStore.remainAttempts}/${INITIAL_ATTEMPTS_COUNT}`
				default:
					return ''
			}
		})

		const buttonProps = computed(
			(): {
				text: string
				mod: ButtonMod
				loading: boolean
				minWidth?: string
				whenClick: () => void
			} => {
				switch (gameStore.gameStatus) {
					case GameStatus.Idle:
						return {
							text: t('startGame'),
							mod: 'primary',
							minWidth: '202px',
							loading: gameStore.isGameLoading,
							whenClick: () => {
								userStore.clickLuckyButton(LuckyButtons.GameStart)
								gameStore.startGame()
							}
						}
					case GameStatus.Win:
						return {
							text: `${t('claim')} ${WIN_GAME_POINTS} $bro`,
							mod: 'inverse',
							loading: gameStore.isGameLoading,
							whenClick: () => {
								userStore.clickLuckyButton(LuckyButtons.GameClaim)
								gameStore.finishGame()
							}
						}
					case GameStatus.Lose:
						return {
							text: t('nextTime'),
							mod: 'inverse',
							loading: gameStore.isGameLoading,
							whenClick: () => {
								userStore.clickLuckyButton(LuckyButtons.GameLose)
								gameStore.finishGame()
							}
						}
					case GameStatus.InProgress:
						return {
							text: t('inProgress'),
							mod: 'secondary',
							loading: gameStore.isGameLoading,
							whenClick: () => {}
						}
					default:
						return {
							text: t('wait'),
							mod: 'secondary',
							loading: gameStore.isGameLoading,
							whenClick: () => {}
						}
				}
			}
		)

		const advText = computed(
			() =>
				`${t('getTickets')}${userStore.user?.advertising_total ? ` ${userStore.user?.advertising_limit || 0}/${userStore.user?.advertising_total}` : ''}`
		)

		const isButtonShown = computed(
			() => userStore.userTickets > 0 || gameStore.gameStatus !== GameStatus.Idle
		)

		const whenAdvClick = async () => {
			userStore.clickLuckyButton(LuckyButtons.AdWatch)
			if ((await advStore.showAdv()) && userStore.user?.advertising_limit !== 0) {
				await userStore.claimAdvertisingReward()
				return
			}
		}

		const switchToSuperGame = () => {
			userStore.clickLuckyButton(LuckyButtons.SuperGameStart)
			gameStore.finishGame(true)
			props.whenSwitchToSuperGame()
		}

		return () => (
			<div class={styles.game}>
				<p
					class={[styles.topText, gameStore.gameStatus === GameStatus.Lose && styles.topTextError]}
				>
					{topText.value}
				</p>
				<div class={styles.gameField} onClick={gameStore.startGame}>
					{gameStore.gameField.map((el, index) => (
						<GameElement
							key={index}
							placeholder={FIELD_PLACEHOLDERS[index]}
							gameElement={el}
							whenClick={() => gameStore.selectElement(index)}
						/>
					))}
				</div>
				<div class={styles.bottomBlock}>
					{isButtonShown.value ? (
						<>
							{gameStore.gameStatus === GameStatus.Win && (
								<UiButton text={t('superGame')} whenClick={switchToSuperGame} />
							)}
							<UiButton {...buttonProps.value} />
							<TicketsCounter />
						</>
					) : (
						<>
							<UiButton
								leftIcon={<AdIcon />}
								disabled={!userStore.user?.advertising_limit}
								mod={!userStore.user?.advertising_limit ? 'secondary' : 'primary'}
								text={advText.value}
								whenClick={whenAdvClick}
							/>
							<div class={styles.disclaimer}>{t('noResponsibleForAd')}</div>
						</>
					)}
				</div>
			</div>
		)
	}
})
