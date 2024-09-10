import { useUserStore } from '@/stores/user'
import styles from './onboarding.module.css'
import { ref, computed, defineComponent, type VNode } from 'vue'
import { UiButton, type ButtonMod } from '../ui'

export const OnboardingComponent = defineComponent({
	name: 'OnboardingComponent',
	setup: () => {
		const userStore = useUserStore()
		const currentStep = ref(1)

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
							image: './images/onboarding-1.jpg',
							title: (
								<>
									<span class={styles.yellow}>yo broski</span>, welcome to brocoin! 👊
								</>
							),
							description: (
								<>
									<p class={styles.description}>fun & earn — we’re all about that</p>
									<p class={styles.description}>
										find letters B, R, O under the cells and get your points — you need them to get
										bigger airdrop
									</p>
								</>
							),
							buttonMod: 'inverse',
							buttonText: 'next',
							handler: () => (currentStep.value += 1)
						}
					case 2:
						return {
							image: './images/onboarding-2.jpg',
							title: (
								<>
									1 game = 1 ticket&nbsp;
									<img class={styles.icon} src="/images/ticket.png" />
								</>
							),
							description: (
								<>
									<p class={styles.description}>
										if given tickets aren’t enough, hit up "Earn" for more earning opportunities
									</p>
									<p class={styles.description}>
										bring ur bros along using ur ref link, vibe together, and score a cut from their
										earnings too!
									</p>
								</>
							),
							buttonMod: 'inverse',
							buttonText: 'next',
							handler: () => (currentStep.value += 1)
						}
					case 3:
						return {
							image: './images/onboarding-3.jpg',
							title: (
								<>
									<span class={styles.yellow}>airdrop</span>&nbsp;with no vesting!
								</>
							),
							description: (
								<>
									<p class={styles.description}>stay tuned ’n be active in our brotherhood </p>
									<p class={styles.description}>
										and don’t forget to show up every 8 hours to grab ur loot from the farm – it’s
										free stuff, why miss out?
									</p>
								</>
							),
							buttonMod: 'primary',
							buttonText: 'ok',
							handler: userStore.doneFirstLogin
						}
					default:
						return {
							image: './images/onboarding-1.png',
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
