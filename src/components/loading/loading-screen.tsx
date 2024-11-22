import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import styles from './styles.module.css'
import { envVariables } from '@/services/env'
import { UiBanner, UiProgressBar } from '@/components/ui'
import { UiText } from '../ui'
import { useLocalization } from '@/services/localization'

export const LoadingScreen = defineComponent({
	name: 'LoadingScreen',
	setup: () => {
		const { t } = useLocalization()

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
		})

		onBeforeUnmount(() => {
			interval.value && clearInterval(interval.value)
		})

		return () => (
			<div class={styles.loadingScreenWrapper}>
				<div class={styles.loadingScreen}>
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
				{envVariables.enableLoaderBanner && <UiBanner forceShow />}
			</div>
		)
	}
})
