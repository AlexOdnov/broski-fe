import { computed, defineComponent, onMounted, type PropType } from 'vue'
import styles from '../shared/game-styles.module.css'
import { type ButtonMod, UiButton } from '@/components'
import { GameElement, TicketsCounter } from '../shared'
import { FIELD_PLACEHOLDERS, GameStatus } from '@/utils/games'
import { useSuperGameStore, INITIAL_ATTEMPTS_COUNT } from '@/stores/super-game'

export const SuperGame = defineComponent({
	name: 'SuperGame',
	props: {
		whenSwitchToFindBroGame: { type: Function as PropType<() => void>, required: true }
	},
	setup(props) {
		const gameStore = useSuperGameStore()

		const topText = computed(() => {
			switch (gameStore.gameStatus) {
				case GameStatus.Win:
					return '“suuuper brooo”'
				case GameStatus.Nothing:
					return 'bad luck'
				case GameStatus.Lose:
					return '“b-rooster”'
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
				minWidth?: string
				whenClick: () => void
			} => {
				switch (gameStore.gameStatus) {
					case GameStatus.Win:
						return {
							text: `Claim x5`,
							mod: 'primary',
							whenClick: finishGame
						}
					case GameStatus.Lose:
						return {
							text: 'next time',
							mod: 'inverse',
							whenClick: finishGame
						}
					case GameStatus.Nothing:
						return {
							text: 'next time',
							mod: 'inverse',
							whenClick: finishGame
						}
					case GameStatus.InProgress:
						return {
							text: 'Super game',
							mod: 'secondary',
							whenClick: () => {}
						}
					default:
						return {
							text: 'wait',
							mod: 'secondary',
							whenClick: () => {}
						}
				}
			}
		)

		const getPlaceholders = computed(() =>
			Array(3)
				.fill(null)
				.map(() => <div />)
		)

		const finishGame = () => {
			props.whenSwitchToFindBroGame()
			gameStore.finishGame()
		}

		onMounted(() => {
			gameStore.startGame()
		})

		return () => (
			<div class={styles.game}>
				<p
					class={[styles.topText, gameStore.gameStatus === GameStatus.Lose && styles.topTextError]}
				>
					{topText.value}
				</p>
				<div class={styles.gameField}>
					{getPlaceholders.value}
					{gameStore.gameField.map((el, index) => (
						<GameElement
							key={index}
							placeholder={FIELD_PLACEHOLDERS[index + 3]}
							gameElement={el}
							whenClick={() => gameStore.selectElement(index)}
						/>
					))}
					{getPlaceholders.value}
				</div>
				<div class={styles.bottomBlock}>
					<UiButton {...buttonProps.value} />
					<TicketsCounter />
				</div>
			</div>
		)
	}
})
