import { defineComponent } from 'vue'

import style from './HelloWorld.module.css'

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		return () => <div>Game Page</div>
	}
})

export default GamePage
