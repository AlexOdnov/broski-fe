import { computed, defineComponent, ref, type PropType } from 'vue'
import styles from '../shared/game-styles.module.css'
import { INITIAL_ATTEMPTS_COUNT, useFindBroGameStore } from '@/stores/find-bro-game'
import { type ButtonMod, UiButton } from '@/components'
import { useUserStore } from '@/stores/user'
import { useAdvertisingStore } from '@/stores/advertising'
import { AdIcon } from '@/components/icons'
import { GameElement } from '../shared'
import {
	GameStatus,
	WIN_GAME_POINTS,
	FIELD_PLACEHOLDERS,
	HALLOWEEN_FIELD_PLACEHOLDERS
} from '@/utils/games'
import { UiText } from '@/components/ui/ui-text'
import { shuffle } from '@/utils/shuffle'
import { useLocalization } from '@/services/localization'

export const FindBroGame = defineComponent({
	name: 'FindBroGame',
	props: {
		whenSwitchToSuperGame: { type: Function as PropType<() => void>, required: true }
	},
	setup(props) {
		const gameStore = useFindBroGameStore()
		const userStore = useUserStore()
		const advStore = useAdvertisingStore()
		const { t } = useLocalization()

		const placeholders = ref(shuffle(HALLOWEEN_FIELD_PLACEHOLDERS))

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
							whenClick: gameStore.startGame
						}
					case GameStatus.Win:
						return {
							text: `${t('claim')} ${WIN_GAME_POINTS} $bro`,
							mod: 'inverse',
							loading: gameStore.isGameLoading,
							whenClick: finishGame
						}
					case GameStatus.Lose:
						return {
							text: t('nextTime'),
							mod: 'inverse',
							loading: gameStore.isGameLoading,
							whenClick: finishGame
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
				`${t('getTickets')}${userStore.user?.advertising.total ? ` ${userStore.user?.advertising.limit || 0}/${userStore.user?.advertising.total}` : ''}`
		)

		const isButtonShown = computed(
			() => userStore.userTickets > 0 || gameStore.gameStatus !== GameStatus.Idle
		)

		const finishGame = () => {
			gameStore.finishGame()
			placeholders.value = shuffle(HALLOWEEN_FIELD_PLACEHOLDERS)
		}

		const whenAdvClick = async () => {
			if ((await advStore.showAdv()) && userStore.user?.advertising.limit !== 0) {
				await userStore.claimAdvertisingReward()
				return
			}
		}

		const switchToSuperGame = () => {
			gameStore.finishGame(true)
			placeholders.value = shuffle(HALLOWEEN_FIELD_PLACEHOLDERS)
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
							placeholder={placeholders.value[index]}
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
						</>
					) : (
						<>
							<UiButton
								leftIcon={<AdIcon />}
								disabled={!userStore.user?.advertising.limit}
								text={advText.value}
								whenClick={whenAdvClick}
							/>
							<UiText color={'#797979'} fontSize={'12px'} alignCenter>
								{t('noResponsibleForAd')}
							</UiText>
						</>
					)}
				</div>
			</div>
		)
	}
})
