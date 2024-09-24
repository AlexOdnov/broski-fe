import { useUserStore } from '@/stores/user'
import styles from './onboarding.module.css'
import { ref, computed, defineComponent, type VNode } from 'vue'
import { UiPopup, type ButtonMod } from '../ui'
import { useI18n } from 'vue-i18n'

export const OnboardingComponent = defineComponent({
	name: 'OnboardingComponent',
	setup: () => {
		const userStore = useUserStore()
		const currentStep = ref(1)
		const { t } = useI18n()

		const currentProperties = computed(
			(): {
				image: string
				title: VNode
				description: VNode
				buttonMod: ButtonMod
				buttonText: string
				handler: () => void
			} => {
				switch (currentStep.value) {
					case 1:
						return {
							image: './images/onboarding-1.webp',
							title: (
								<div class={styles.title}>
									<span class={styles.yellow}>{t('onboarding.yoBroski')}</span>,&nbsp;
									{t('onboarding.welcome')}
								</div>
							),
							description: (
								<div class={styles.description}>
									<span>{t('onboarding.funAndEarn')}</span>
									<span>{t('onboarding.findBRO')}</span>
									<p class={styles.steps}>{currentStep.value}/3</p>
								</div>
							),
							buttonMod: 'inverse',
							buttonText: t('next'),
							handler: () => (currentStep.value += 1)
						}
					case 2:
						return {
							image: './images/onboarding-2.webp',
							title: (
								<div class={[styles.title, styles.titleFlex]}>
									{t('onboarding.1game1Ticket')}&nbsp;
									<img class={styles.icon} src="/images/ticket.webp" />
								</div>
							),
							description: (
								<div class={styles.description}>
									<span>{t('onboarding.inNotEnough')}</span>
									<span>{t('onboarding.bringUrBros')}</span>
									<p class={styles.steps}>{currentStep.value}/3</p>
								</div>
							),
							buttonMod: 'inverse',
							buttonText: t('onboarding.next'),
							handler: () => (currentStep.value += 1)
						}
					case 3:
						return {
							image: './images/onboarding-3.webp',
							title: (
								<div class={styles.title}>
									<span class={styles.yellow}>{t('airdrop')}</span>&nbsp;
									{t('onboarding.withNoVesting')}
								</div>
							),
							description: (
								<div class={styles.description}>
									<span>{t('onboarding.stayTuned')}</span>
									<span>{t('onboarding.dontForgetEvery8Hours')}</span>
									<p class={styles.steps}>{currentStep.value}/3</p>
								</div>
							),
							buttonMod: 'primary',
							buttonText: t('ok'),
							handler: userStore.doneFirstLogin
						}
					default:
						return {
							image: './images/onboarding-1.webp',
							title: <></>,
							description: <></>,
							buttonMod: 'inverse',
							buttonText: 'wait',
							handler: () => {}
						}
				}
			}
		)

		return () => (
			<UiPopup
				header={currentProperties.value.title}
				body={currentProperties.value.description}
				image={currentProperties.value.image}
				buttonText={currentProperties.value.buttonText}
				buttonMod={currentProperties.value.buttonMod}
				whenClick={currentProperties.value.handler}
			/>
		)
	}
})
