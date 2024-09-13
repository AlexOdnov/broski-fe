import { defineComponent } from 'vue'
import styles from './styles.module.css'
export const LoadingScreen = defineComponent({
	name: 'LoadingScreen',
	setup: () => {
		return () => (
			<div class={styles.loadingScreenWrapper}>
				<div class={styles.loadingScreen}>
					<img class={styles.fist} src="/images/fist.webp" alt="fist" />
					<img class={styles.logo} src="/images/broski.webp" alt="BROski" />
				</div>
			</div>
		)
	}
})
