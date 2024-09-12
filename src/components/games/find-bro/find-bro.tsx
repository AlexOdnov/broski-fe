import { computed, defineComponent, type PropType } from 'vue'
import styles from './find-bro.module.css'
import { GameStatus, INITIAL_ATTEMPTS_COUNT, useGameStore, WIN_GAME_POINTS } from '@/stores/game'
import { type ButtonMod, UiButton, UiHeightPlaceholder } from '@/components'
import { useUserStore } from '@/stores/user'
import { useAdvertisingStore } from '@/stores/advertising'
import { AdIcon } from '@/components/icons'
import { GameElement, TicketsCounter } from '../shared'

const placeholders = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']

export const FindBroGame = defineComponent({
	name: 'FindBroGame',
	props: {
		whenSwitchToSuperGame: { type: Function as PropType<() => void>, required: true }
	},
	setup(props) {
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
							mod: 'inverse',
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

		const advText = computed(
			() =>
				`Get tickets${userStore.user?.advertising_total ? ` ${userStore.user?.advertising_limit || 0}/${userStore.user?.advertising_total}` : ''}`
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
					{isButtonShown.value ? (
						<>
							{gameStore.gameStatus === GameStatus.Win && (
								<UiButton text={'Super game'} whenClick={props.whenSwitchToSuperGame} />
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
								Bro, we are not responsible for advertising. Don't connect your main wallet
								anywhere.
							</div>
						</>
					)}
				</div>
			</div>
		)
	}
})
