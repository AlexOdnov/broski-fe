import { useUserStore } from '@/stores/user'
import styles from './onboarding.module.css'
import { ref, computed, defineComponent, type VNode } from 'vue'
import { UiPopup, UiText, type ButtonMod } from '../ui'
import { BoxIcon, EnergyIcon, TicketIcon } from '@/components/icons'
import { useLocalization } from '@/services/localization'

export const OnboardingComponent = defineComponent({
	name: 'OnboardingComponent',
	setup: () => {
		const userStore = useUserStore()
		const { t } = useLocalization()

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
							image: '/images/onboarding-new-1.webp',
							title: (
								<div class={styles.title}>
									<UiText isAccent>{t('onboarding.yoBro')}</UiText>&nbsp;
									<UiText>{t('onboarding.guide')}</UiText>
								</div>
							),
							description: (
								<div class={styles.description}>
									<span>{t('onboarding.boostUrStats')}</span>
									<span>
										{t('onboarding.eachVictory')}
										<UiText isAccent> $BRO</UiText>
										{t('onboarding.eachVictory2')}
									</span>
									<span>
										{t('onboarding.useEarned')}
										<UiText isAccent> $BRO </UiText>
										{t('onboarding.useEarned2')}
									</span>
									<p class={styles.steps}>{currentStep.value}/3</p>
								</div>
							),
							buttonMod: 'inverse',
							buttonText: t('next'),
							handler: () => (currentStep.value += 1)
						}
					case 2:
						return {
							image: '/images/onboarding-new-2.webp',
							title: (
								<div class={[styles.title, styles.titleFlex]}>
									<UiText isAccent>{t('onboarding.battlesAndEnergy')}</UiText>
								</div>
							),
							description: (
								<div class={styles.description}>
									<span>
										{t('onboarding.winBattles')}
										<UiText isAccent> $BRO</UiText>
										{t('onboarding.winBattles2')}
									</span>
									<span>{t('onboarding.oneBattleOneEnergy')}</span>
									<span>
										<UiText isAccent>{t('onboarding.wantToWinMore')}</UiText>
									</span>
									<span>{t('onboarding.keepUpdatingYourStats')}</span>
									<p class={styles.steps}>{currentStep.value}/3</p>
								</div>
							),
							buttonMod: 'inverse',
							buttonText: t('onboarding.next'),
							handler: () => (currentStep.value += 1)
						}
					// пока не актуально
					// case 3:
					// 	return {
					// 		image: '/images/onboarding-new-3.webp',
					// 		title: (
					// 			<div class={styles.title}>
					// 				{t('onboarding.wasToEarn')}
					// 				<UiText isAccent> $BRO</UiText>
					// 			</div>
					// 		),
					// 		description: (
					// 			<div class={styles.description}>
					// 				<span>
					// 					{t('onboarding.quests')}
					// 					<UiText isAccent> $BRO </UiText>
					// 					{t('onboarding.and')} <TicketIcon height={14} />
					// 				</span>
					// 				<span>
					// 					{t('onboarding.game')}
					// 					<UiText isAccent> B,R,O </UiText> {t('onboarding.attempts')}
					// 				</span>
					// 				<span>{t('onboarding.inGameYouCanFind')}</span>
					// 				<ul class={styles.list}>
					// 					<li>
					// 						<EnergyIcon height={17} /> {t('onboarding.energy')} (5%{' '}
					// 						{t('onboarding.chance')})
					// 					</li>
					// 					<li>
					// 						{t('onboarding.bag')}
					// 						<UiText isAccent> $BRO </UiText> (2% {t('onboarding.chance')})
					// 					</li>
					// 					<li>
					// 						<BoxIcon height={17} /> {t('lootbox', 1)} (1% {t('onboarding.chance')}
					// 						)
					// 					</li>
					// 				</ul>
					// 				<p class={styles.steps}>{currentStep.value}/4</p>
					// 			</div>
					// 		),
					// 		buttonMod: 'inverse',
					// 		buttonText: t('onboarding.next'),
					// 		handler: () => (currentStep.value += 1)
					// 	}
					case 3:
						return {
							image: '/images/onboarding-new-4.webp',
							title: (
								<div class={styles.title}>
									<UiText isAccent>{t('onboarding.growFaster')}</UiText>
								</div>
							),
							description: (
								<div class={styles.description}>
									<span>
										{t('onboarding.earnFivePercent')}
										<UiText isAccent> $BRO </UiText>
										{t('onboarding.earnings')}
									</span>
									<span>{t('onboarding.moreFriends')}</span>
									<span>{t('onboarding.shareYourLink')}</span>
									<p class={styles.steps}>{currentStep.value}/3</p>
								</div>
							),
							buttonMod: 'primary',
							buttonText: t('onboarding.letsGo'),
							handler: userStore.doneFirstLogin
						}
					default:
						return {
							image: '/images/onboarding-new-1.webp',
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
