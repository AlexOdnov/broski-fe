import { defineComponent } from 'vue'
import styles from './styles.module.css'
import { UiProgressBar } from '../ui/progress-bar'
import { LOADER_TIMEOUT } from '@/utils/constants'
export const LoadingScreen = defineComponent({
	name: 'LoadingScreen',
	setup: () => {
		return () => (
			<div class={styles.loadingScreenWrapper}>
				<div class={styles.loadingScreen}>
					<div class={styles.handWrapper}>
						<img class={styles.shadow} src="/images/shadow.png" />
						<img class={styles.hand} src="/images/hand.gif" alt="hand" />
					</div>
					<div class={styles.progressBarWrapper}>
						<img class={styles.logo} src="/images/BROski.png" alt="BROski" />
						<UiProgressBar duration={LOADER_TIMEOUT} />
						<p class={styles.loadingText}>Loading...</p>
					</div>
				</div>
				<div class={styles.bannerWrapper}>
					<div class={styles.banner}>banner</div>
					<p class={[styles.loadingText, styles.bannerText]}>
						Bro, we are not responsible for advertising. Don't connect your main wallet anywhere.
						DYOR.
					</p>
				</div>
			</div>
		)
	}
})
