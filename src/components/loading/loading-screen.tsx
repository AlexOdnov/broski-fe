import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import styles from './styles.module.css'
import { UiProgressBar } from '../ui/progress-bar'
import { envVariables } from '@/services/env'
import { useI18n } from 'vue-i18n'

export const LoadingScreen = defineComponent({
	name: 'LoadingScreen',
	setup: () => {
		const scriptTag = ref<HTMLScriptElement | null>(null)
		const { t } = useI18n()

		onMounted(() => {
			scriptTag.value = document.createElement('script')
			scriptTag.value.src = 'https://js.onclckmn.com/static/onclicka.js'
			scriptTag.value.dataset.admpid = '231083'
			document.head.appendChild(scriptTag.value)
		})

		onBeforeUnmount(() => {
			scriptTag.value?.remove()
		})

		return () => (
			<div class={styles.loadingScreenWrapper}>
				<div class={styles.loadingScreen}>
					<div class={styles.handWrapper}>
						<img class={styles.shadow} src="/images/shadow.webp" />
						<img class={styles.hand} src="/images/hand.gif" alt="hand" />
					</div>
					<div class={styles.progressBarWrapper}>
						<img class={styles.logo} src="/images/broski.webp" alt="BROski" />
						<UiProgressBar duration={envVariables.loaderDuration} />
						<p class={styles.loadingText}>{t('message.loading')}...</p>
					</div>
				</div>
				<div class={styles.bannerWrapper}>
					<div class={styles.banner} data-banner-id="6031971"></div>
					<p class={[styles.loadingText, styles.bannerText]}>
						{t('message.noResponsibleForAd')}
					</p>
				</div>
			</div>
		)
	}
})
