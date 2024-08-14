import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import style from './style.module.css'

export default defineComponent({
	setup() {
		return () => (
			<div class={style.app}>
				<header>coin count component</header>

				<main class={style.pageContainer}>
					<RouterView class={style.page} />
				</main>

				<footer>
					<nav class={style.navigation}>
						<RouterLink to="/">game</RouterLink>
						<RouterLink to="/tasks">task</RouterLink>
						<RouterLink to="/referrals">refs</RouterLink>
					</nav>
				</footer>
			</div>
		)
	}
})
