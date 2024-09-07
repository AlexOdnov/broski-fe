import { useUserStore } from '@/stores/user'
import styles from './onboarding.module.css'
import { ref, computed, defineComponent } from 'vue'
import { UiButton, type ButtonMod } from '../ui'

export const OnboardingComponent = defineComponent({
	name: 'OnboardingComponent',
	setup: () => {
		const userStore = useUserStore()
		const currentStep = ref(1)

		const currentProperties = computed(
			(): {
				image: string
				title: string
				description: string
				buttonMod: ButtonMod
				buttonText: string
				handler: () => void
			} => {
				switch (currentStep.value) {
					case 1:
						return {
							image: './images/onboarding-1.jpg',
							title: 'step 1',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et augue ut ex rhoncus fermentum eget et libero. Curabitur ac mattis nisl. Nulla lacinia sollicitudin justo, at egestas libero hendrerit vitae. ',
							buttonMod: 'inverse',
							buttonText: 'next',
							handler: () => (currentStep.value += 1)
						}
					case 2:
						return {
							image: './images/onboarding-2.jpg',
							title: 'step 2',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et augue ut ex rhoncus fermentum eget et libero. Curabitur ac mattis nisl. Nulla lacinia sollicitudin justo, at egestas libero hendrerit vitae. ',
							buttonMod: 'inverse',
							buttonText: 'next',
							handler: () => (currentStep.value += 1)
						}
					case 3:
						return {
							image: './images/onboarding-3.jpg',
							title: 'step 3',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et augue ut ex rhoncus fermentum eget et libero. Curabitur ac mattis nisl. Nulla lacinia sollicitudin justo, at egestas libero hendrerit vitae. ',
							buttonMod: 'primary',
							buttonText: 'ok',
							handler: userStore.doneFirstLogin
						}
					default:
						return {
							image: './images/onboarding-1.png',
							title: 'step 1',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et augue ut ex rhoncus fermentum eget et libero. Curabitur ac mattis nisl. Nulla lacinia sollicitudin justo, at egestas libero hendrerit vitae. ',
							buttonMod: 'inverse',
							buttonText: 'next',
							handler: () => (currentStep.value += 1)
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
