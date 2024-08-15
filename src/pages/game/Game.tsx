import { defineComponent } from 'vue'

import style from './style.module.css'

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		return () => <div class={style.game}>Game Page</div>
	}
})

export default GamePage
