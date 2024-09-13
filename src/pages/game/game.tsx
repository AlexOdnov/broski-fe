import { computed, defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import { FindBroGame, SuperGame } from '@/components'

export enum GameVariant {
	FindBro = 'findBro',
	SuperGame = 'superGame'
}

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		const currentGame = ref(GameVariant.FindBro)

		const currentGameComponent = computed(() => {
			switch (currentGame.value) {
				case GameVariant.FindBro:
					return <FindBroGame whenSwitchToSuperGame={switchToSuperGame} />
				case GameVariant.SuperGame:
					return <SuperGame whenSwitchToFindBroGame={switchToFindBroGame} />
				default:
					return <FindBroGame whenSwitchToSuperGame={switchToSuperGame} />
			}
		})

		const switchToSuperGame = () => {
			currentGame.value = GameVariant.SuperGame
		}

		const switchToFindBroGame = () => {
			currentGame.value = GameVariant.FindBro
		}

		return () => <div class={styles.wrapper}>{currentGameComponent.value}</div>
	}
})

export default GamePage
