import { useUserStore } from '@/stores/user'
import styles from './onboarding.module.css'
import { ref, computed, defineComponent, type VNode } from 'vue'
import { UiButton, type ButtonMod } from '../ui'
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
								<>
									<span class={styles.yellow}>{t('message.onboarding.yoBroski')}</span>,&nbsp;
									{t('message.onboarding.welcome')}
								</>
							),
							description: (
								<>
									<p class={styles.description}>{t('message.onboarding.funAndEarn')}</p>
									<p class={styles.description}>{t('message.onboarding.findBRO')}</p>
								</>
							),
							buttonMod: 'inverse',
							buttonText: t('message.next'),
							handler: () => (currentStep.value += 1)
						}
					case 2:
						return {
							image: './images/onboarding-2.webp',
							title: (
								<>
									{t('message.1game1Ticket')}&nbsp;
									<img class={styles.icon} src="/images/ticket.webp" />
								</>
							),
							description: (
								<>
									<p class={styles.description}>{t('message.onboarding.inNotEnough')}</p>
									<p class={styles.description}>{t('message.onboarding.bringUrBros')}</p>
								</>
							),
							buttonMod: 'inverse',
							buttonText: t('message.onboarding.next'),
							handler: () => (currentStep.value += 1)
						}
					case 3:
						return {
							image: './images/onboarding-3.webp',
							title: (
								<>
									<span class={styles.yellow}>{t('message.airdrop')}</span>&nbsp;
									{t('message.onboarding.withNoVesting')}
								</>
							),
							description: (
								<>
									<p class={styles.description}>{t('message.stayTuned')}</p>
									<p class={styles.description}>{t('message.dontForgetEvery8Hours')}</p>
								</>
							),
							buttonMod: 'primary',
							buttonText: t('message.ok'),
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
			<div class={styles.onboarding}>
				<div class={styles.contentWrapper}>
					<img class={styles.image} src={currentProperties.value.image} alt="example" />
					<p class={styles.title}>{currentProperties.value.title}</p>
					<p class={styles.description}>{currentProperties.value.description}</p>
				</div>
				<p class={styles.steps}>{currentStep.value}/3</p>
				<UiButton
					text={currentProperties.value.buttonText}
					mod={currentProperties.value.buttonMod}
					size={'lg'}
					minWidth={'306px'}
					whenClick={currentProperties.value.handler}
				/>
			</div>
		)
	}
})
