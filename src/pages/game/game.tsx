import { computed, defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import { FindBroGame } from '@/components'

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
					return <div>supergame</div>
				default:
					return <FindBroGame whenSwitchToSuperGame={switchToSuperGame} />
			}
		})

		const switchToSuperGame = () => {
			currentGame.value = GameVariant.SuperGame
		}

		return () => <div>{currentGameComponent.value}</div>
	}
})

export default GamePage
