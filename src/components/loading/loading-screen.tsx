import { defineComponent } from 'vue'
import styles from './styles.module.css'
export const LoadingScreen = defineComponent({
	name: 'LoadingScreen',
	setup: () => {
		return () => (
			<div class={styles.loadingScreenWrapper}>
				<div class={styles.loadingScreen}>
					<img class={styles.fist} src="/images/fist.png" alt="fist" />
					<img class={styles.logo} src="/images/BROski.png" alt="BROski" />
				</div>
			</div>
		)
	}
})
