import { computed, defineComponent } from 'vue'

import style from './HelloWorld.module.css'

export default defineComponent({
	props: {
		msg: { type: String, required: true }
	},

	setup(props) {
		const splitMsg = computed(() => props.msg.split(' '))

		return () => (
			<div class={style.greetings}>
				<h1 class={style.green}>{props.msg}</h1>
				{splitMsg.value.map((el) => (
					<p>{el}</p>
				))}
				<h3>
					You’ve successfully created a project with
					<a href="https://vitejs.dev/" target="_blank" rel="noopener">
						Vite
					</a>{' '}
					+
					<a href="https://vuejs.org/" target="_blank" rel="noopener">
						Vue 3
					</a>
					. What's next?
				</h3>
			</div>
		)
	}
})
