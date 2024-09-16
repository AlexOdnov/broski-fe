import { computed, defineComponent, onMounted, type PropType } from 'vue'
import sharedStyles from '../shared/game-styles.module.css'
import styles from './super-game.module.css'
import { type ButtonMod, UiButton, UiHeightPlaceholder } from '@/components'
import { GameElement, TicketsCounter } from '../shared'
import { FIELD_PLACEHOLDERS, GameStatus, WIN_GAME_POINTS } from '@/utils/games'
import { useSuperGameStore, INITIAL_ATTEMPTS_COUNT } from '@/stores/super-game'
import { useI18n } from 'vue-i18n'

export const SuperGame = defineComponent({
	name: 'SuperGame',
	props: {
		whenSwitchToFindBroGame: { type: Function as PropType<() => void>, required: true }
	},
	setup(props) {
		const gameStore = useSuperGameStore()
		const { t } = useI18n()
		const topText = computed(() => {
			switch (gameStore.gameStatus) {
				case GameStatus.Win:
					return t('message.superBro')
				case GameStatus.Nothing:
					return t('message.badLuck')
				case GameStatus.Lose:
					return t('message.bRooster')
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
							text: `${t('message.claim')}} x5`,
							mod: 'primary',
							whenClick: finishGame
						}
					case GameStatus.Lose:
						return {
							text: t('message.nextTime'),
							mod: 'inverse',
							whenClick: finishGame
						}
					case GameStatus.Nothing:
						return {
							text: t('message.nextTime'),
							mod: 'inverse',
							whenClick: finishGame
						}
					case GameStatus.InProgress:
						return {
							text: t('message.superGame'),
							mod: 'secondary',
							whenClick: () => {}
						}
					default:
						return {
							text:  t('message.wait'),
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
						{t('message.broOrNot')}
						<br />
						{t('message.urTurnToPick')}
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
