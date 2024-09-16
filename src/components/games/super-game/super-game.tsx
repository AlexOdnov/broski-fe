import { computed, defineComponent, onMounted, type PropType } from 'vue'
import sharedStyles from '../shared/game-styles.module.css'
import styles from './super-game.module.css'
import { type ButtonMod, UiButton, UiHeightPlaceholder } from '@/components'
import { GameElement, TicketsCounter } from '../shared'
import { FIELD_PLACEHOLDERS, GameStatus, WIN_GAME_POINTS } from '@/utils/games'
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

		const finishGame = () => {
			props.whenSwitchToFindBroGame()
			gameStore.finishGame()
		}

		onMounted(() => {
			gameStore.startGame()
		})

		return () => (
			<div class={[sharedStyles.game, styles.superGame]}>
				<p
					class={[
						sharedStyles.topText,
						gameStore.gameStatus === GameStatus.Lose && sharedStyles.topTextError
					]}
				>
					{topText.value}
				</p>
				{gameStore.gameStatus === GameStatus.InProgress ? (
					<p class={sharedStyles.topText}>
						bro or not bro?
						<br />
						ur turn to pick
					</p>
				) : (
					<UiHeightPlaceholder height={'48px'} />
				)}
				<div class={styles.superGameField}>
					{gameStore.gameField.map((el, index) => (
						<GameElement
							key={index}
							placeholder={FIELD_PLACEHOLDERS[index + 3]}
							gameElement={el}
							whenClick={() => gameStore.selectElement(index)}
						/>
					))}
				</div>
				<div class={styles.description}>
					<div class={styles.descriptionItem}>
						<img class={styles.descriptionIcon} src="/images/fist-small.webp" />
						<span>+{WIN_GAME_POINTS * 5}</span>
					</div>
					<div class={styles.separator} />
					<div class={[styles.descriptionItem, styles.descriptionItemRight]}>
						<img class={styles.descriptionIcon} src="/images/chicken.webp" />
						<span class={sharedStyles.topTextError}>-{WIN_GAME_POINTS}</span>
					</div>
				</div>
				<div class={sharedStyles.bottomBlock}>
					<UiButton {...buttonProps.value} />
					<TicketsCounter />
				</div>
			</div>
		)
	}
})
