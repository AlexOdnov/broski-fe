import { defineComponent } from 'vue'

import styles from './styles.module.css'

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		return () => <div class={styles.game}>Game</div>
	}
})

export default GamePage
