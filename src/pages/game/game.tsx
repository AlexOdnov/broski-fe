import { defineComponent } from 'vue'

import styles from './styles.module.css'
import { FindBroGame } from '@/components'

export enum GameVariant {
	FindBro = 'findBro',
	SuperGame = 'superGame'
}

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		return () => (
			<div>
				<FindBroGame />
			</div>
		)
	}
})

export default GamePage
