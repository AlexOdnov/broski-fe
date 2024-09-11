import { computed, defineComponent } from 'vue'

import styles from './styles.module.css'
import { GameStatus, INITIAL_ATTEMPTS_COUNT, useGameStore, WIN_GAME_POINTS } from '@/stores/game'
import {
	type ButtonMod,
	GameElement,
	TicketsCounter,
	UiButton,
	UiHeightPlaceholder
} from '@/components'
import { useUserStore } from '@/stores/user'
import { useAdvertisingStore } from '@/stores/advertising'

const placeholders = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		const gameStore = useGameStore()
		const userStore = useUserStore()
		const advStore = useAdvertisingStore()

		const topText = computed(() => {
			switch (gameStore.gameStatus) {
				case GameStatus.Idle:
					return ''
				case GameStatus.Win:
					return '“BROOO”'
				case GameStatus.Lose:
					return '“Fail”'
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
							text: 'Start game',
							mod: 'primary',
							minWidth: '202px',
							loading: gameStore.isGameLoading,
							whenClick: gameStore.startGame
						}
					case GameStatus.Win:
						return {
							text: `CLAIM ${WIN_GAME_POINTS} $bro`,
							mod: 'primary',
							loading: gameStore.isGameLoading,
							whenClick: gameStore.finishGame
						}
					case GameStatus.Lose:
						return {
							text: 'next time',
							mod: 'inverse',
							loading: gameStore.isGameLoading,
							whenClick: gameStore.finishGame
						}
					case GameStatus.InProgress:
						return {
							text: 'in progress',
							mod: 'secondary',
							loading: gameStore.isGameLoading,
							whenClick: () => {}
						}
					default:
						return {
							text: 'wait',
							mod: 'secondary',
							loading: gameStore.isGameLoading,
							whenClick: () => {}
						}
				}
			}
		)

		const whenAdvClick = async () => {
			if (await advStore.showAdv()) {
				await userStore.claimAdvertisingReward()
				return
			}
		}
		const advText = computed(() => {
			let result = 'Get tickets'
			if (userStore.user?.advertising_limit && userStore.user?.advertising_total) {
				result += ` ${userStore.user?.advertising_limit}/${userStore.user?.advertising_total}`
			}
			return result
		})

		const isButtonShown = computed(
			() =>
				(userStore.userTickets > 0 || gameStore.gameStatus !== GameStatus.Idle) &&
				userStore.userTickets !== 0
		)
		const getTicketsForAdvButtonShown = computed(
			() => userStore.userTickets === 0 &&
				gameStore.gameStatus !== GameStatus.InProgress
		)

		return () => (
			<div class={styles.game}>
				{topText.value ? (
					<p
						class={[
							styles.topText,
							gameStore.gameStatus === GameStatus.Lose && styles.topTextError
						]}
					>
						{topText.value}
					</p>
				) : (
					<UiHeightPlaceholder height={'16px'} />
				)}
				<div class={styles.gameField} onClick={gameStore.startGame}>
					{gameStore.gameField.map((el, index) => (
						<GameElement
							key={index}
							placeholder={placeholders[index]}
							gameElement={el}
							whenClick={() => gameStore.selectElement(index)}
						/>
					))}
				</div>
				<div class={styles.bottomBlock}>
					{getTicketsForAdvButtonShown.value && (
						<>
							<UiButton
								style={'font-weight: 400; font-size:12px;'}
								leftIcon={<img src="/images/ad.svg" />}
								disabled={(userStore.user?.advertising_limit ?? 0) === 0}
								text={advText.value}
								whenClick={whenAdvClick}
							/>
							<div class={styles.disclaimer}>
								Bro, we are not responsible for advertising. Don't connect your main wallet
								anywhere.
							</div>
						</>
					)}
					{isButtonShown.value && <UiButton {...buttonProps.value} />}
					{!getTicketsForAdvButtonShown.value && <TicketsCounter />}
				</div>
			</div>
		)
	}
})

export default GamePage
