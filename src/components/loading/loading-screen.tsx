import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import styles from './styles.module.css'
import { envVariables } from '@/services/env'
import { UiProgressBar } from '@/components/ui'
import { UiText } from '../ui'
import { useLocalization } from '@/services/localization'

export const LoadingScreen = defineComponent({
	name: 'LoadingScreen',
	setup: () => {
		const { t } = useLocalization()

		const scriptTag = ref<HTMLScriptElement | null>(null)
		const totalItems = 20
		const currentProgress = ref(0)
		const interval = ref<ReturnType<typeof setInterval> | null>(null)

		onMounted(() => {
			interval.value = setInterval(
				() => {
					if (currentProgress.value < totalItems - 1) {
						currentProgress.value += 1
					}
				},
				envVariables.loaderDuration / (totalItems - 1)
			)
			if (!envVariables.enableLoaderBanner) {
				return
			}
			scriptTag.value = document.createElement('script')
			scriptTag.value.src = 'https://js.onclckmn.com/static/onclicka.js'
			scriptTag.value.dataset.admpid = '231083'
			document.head.appendChild(scriptTag.value)
		})

		onBeforeUnmount(() => {
			interval.value && clearInterval(interval.value)
			if (!envVariables.enableLoaderBanner) {
				return
			}
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
						<UiProgressBar
							totalItems={totalItems}
							filledItems={currentProgress.value}
							height={30}
							mod={'segmented'}
							padding={2}
						/>
						<UiText class={styles.loadingText} fontSize={'14px'}>
							{t('loading')}...
						</UiText>
					</div>
				</div>
				{envVariables.enableLoaderBanner && (
					<div class={styles.bannerWrapper}>
						<div class={styles.banner} data-banner-id="6031971"></div>
						<UiText class={styles.loadingText} fontSize={'14px'}>
							{t('noResponsibleForAd')}
						</UiText>
					</div>
				)}
			</div>
		)
	}
})
