import { defineComponent, onMounted } from 'vue'
import styles from './styles.module.css'
import { UiProgressBar } from '../ui/progress-bar'
import { LOADER_TIMEOUT } from '@/utils/constants'
export const LoadingScreen = defineComponent({
	name: 'LoadingScreen',
	setup: () => {
		onMounted(() => {
			const scriptTag = document.createElement('script')
			scriptTag.src = 'https://js.onclckmn.com/static/onclicka.js'
			scriptTag.dataset.admpid = '231083'
			document.head.appendChild(scriptTag)
		})

		return () => (
			<div class={styles.loadingScreenWrapper}>
				<div class={styles.loadingScreen}>
					<div class={styles.handWrapper}>
						<img class={styles.shadow} src="/images/shadow.webp" />
						<img class={styles.hand} src="/images/hand.avif" alt="hand" />
					</div>
					<div class={styles.progressBarWrapper}>
						<img class={styles.logo} src="/images/broski.webp" alt="BROski" />
						<UiProgressBar duration={LOADER_TIMEOUT} />
						<p class={styles.loadingText}>Loading...</p>
					</div>
				</div>
				<div class={styles.bannerWrapper}>
					<div class={styles.banner} data-banner-id="6031971"></div>
					<p class={[styles.loadingText, styles.bannerText]}>
						Bro, we are not responsible for advertising. Don't connect your main wallet anywhere.
						DYOR.
					</p>
				</div>
			</div>
		)
	}
})
