import { computed, defineComponent } from 'vue'

import styles from './styles.module.css'
import { GameStatus, INITIAL_ATTEMPTS_COUNT, useGameStore, WIN_GAME_POINTS } from '@/stores/game'
import {
	UiButton,
	type ButtonMod,
	TicketsCounter,
	UiHeightPlaceholder,
	GameElement
} from '@/components'
import { useUserStore } from '@/stores/user'

const placeholders = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		const gameStore = useGameStore()
		const userStore = useUserStore()

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
				isLoading: boolean
				whenClick: () => void
			} => {
				switch (gameStore.gameStatus) {
					case GameStatus.Idle:
						return {
							text: 'Start game',
							mod: 'primary',
							isLoading: gameStore.isGameLoading,
							whenClick: gameStore.startGame
						}
					case GameStatus.Win:
						return {
							text: `CLAIM ${WIN_GAME_POINTS} $bro`,
							mod: 'primary',
							isLoading: gameStore.isGameLoading,
							whenClick: gameStore.finishGame
						}
					case GameStatus.Lose:
						return {
							text: 'next time',
							mod: 'inverse',
							isLoading: gameStore.isGameLoading,
							whenClick: gameStore.finishGame
						}
					case GameStatus.InProgress:
						return {
							text: 'in progress',
							mod: 'secondary',
							isLoading: gameStore.isGameLoading,
							whenClick: () => {}
						}
					default:
						return {
							text: 'wait',
							mod: 'secondary',
							isLoading: gameStore.isGameLoading,
							whenClick: () => {}
						}
				}
			}
		)

		const isButtonShown = computed(
			() => userStore.userTickets > 0 || gameStore.gameStatus !== GameStatus.Idle
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
							placeholder={placeholders[index]}
							gameElement={el}
							whenClick={() => gameStore.selectElement(index)}
						/>
					))}
				</div>
				<div class={styles.bottomBlock}>
					{isButtonShown.value ? (
						<UiButton {...buttonProps.value} />
					) : (
						<UiHeightPlaceholder height={'30px'} />
					)}
					<TicketsCounter />
				</div>
			</div>
		)
	}
})

export default GamePage
