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
					return t('message.findBRO')
				case GameStatus.Win:
					return t('message.brooo')
				case GameStatus.Lose:
					return t('message.fail')
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
							text: t('message.startGame'),
							mod: 'primary',
							minWidth: '202px',
							loading: gameStore.isGameLoading,
							whenClick: gameStore.startGame
						}
					case GameStatus.Win:
						return {
							text: `${t('message.claim')} ${WIN_GAME_POINTS} $bro`,
							mod: 'inverse',
							loading: gameStore.isGameLoading,
							whenClick: gameStore.finishGame
						}
					case GameStatus.Lose:
						return {
							text: t('message.nextTime'),
							mod: 'inverse',
							loading: gameStore.isGameLoading,
							whenClick: gameStore.finishGame
						}
					case GameStatus.InProgress:
						return {
							text: t('message.inProgress'),
							mod: 'secondary',
							loading: gameStore.isGameLoading,
							whenClick: () => {}
						}
					default:
						return {
							text: t('message.wait'),
							mod: 'secondary',
							loading: gameStore.isGameLoading,
							whenClick: () => {}
						}
				}
			}
		)

		const advText = computed(
			() =>
				`${t('message.getTickets')}${userStore.user?.advertising_total ? ` ${userStore.user?.advertising_limit || 0}/${userStore.user?.advertising_total}` : ''}`
		)

		const isButtonShown = computed(
			() => userStore.userTickets > 0 || gameStore.gameStatus !== GameStatus.Idle
		)

		const whenAdvClick = async () => {
			if ((await advStore.showAdv()) && userStore.user?.advertising_limit !== 0) {
				await userStore.claimAdvertisingReward()
				return
			}
		}

		const switchToSuperGame = () => {
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
								<UiButton text={t('message.superGame')} whenClick={switchToSuperGame} />
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
							<div class={styles.disclaimer}>
								{t('message.noResponsibleForAd')}
							</div>
						</>
					)}
				</div>
			</div>
		)
	}
})
