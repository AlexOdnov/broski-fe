import { computed, defineComponent, ref } from 'vue'
import styles from './buy-premium.module.css'
import { UiBottomSheet, UiButton, UiTabs, UiText, type UiBottomSheetMethods } from '@/components/ui'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { usePvpStore } from '@/stores/pvp'
import {
	BoxIcon,
	EnergyIcon,
	EnergyShadowedIcon,
	LevelIcon,
	StarsIcon,
	TimerIcon
} from '@/components/icons'
import { envVariables } from '@/services/env'
import { useUserStore } from '@/stores/user'
import { useLocalization } from '@/services/localization'

export const BuyPremium = defineComponent({
	name: 'BuyPremium',
	setup: (_, { expose }) => {
		const { t } = useLocalization()
		const tgStore = useTgSdkStore()
		const pvpStore = usePvpStore()
		const userStore = useUserStore()

		const premiumModal = ref<UiBottomSheetMethods | null>(null)
		const selectedPeriod = ref('7')

		const PREMIUM_OPTIONS = [
			{
				label: `${t('days', 3)}`,
				value: '3'
			},
			{
				label: `${t('days', 7)}`,
				value: '7'
			},
			{
				label: `${t('days', 14)}`,
				value: '14'
			}
		]

		const periodProperties = computed(() => {
			switch (selectedPeriod.value) {
				case '3':
					return {
						cost: '50',
						boxes: 2,
						coins: 3000,
						invoice: envVariables.invoice3Premium
					}
				case '7':
					return {
						cost: '100',
						boxes: 7,
						coins: 8000,
						invoice: envVariables.invoice7Premium
					}
				case '14':
					return {
						cost: '200',
						boxes: 10,
						coins: 20000,
						invoice: envVariables.invoice14Premium
					}
				default:
					return {
						cost: '',
						boxes: 0,
						coins: 0,
						invoice: ''
					}
			}
		})

		const whenChangePeriod = (period: string) => (selectedPeriod.value = period)

		const whenBuyPremium = () => {
			tgStore.openInvoice(periodProperties.value.invoice, async (status) => {
				if (status === 'cancelled') {
					return
				}
				await Promise.all([pvpStore.loadPvpCharacter(), userStore.loadUser()])
				premiumModal.value?.close()
			})
		}

		const publicApi: UiBottomSheetMethods = {
			open: () => premiumModal.value?.open(),
			close: () => premiumModal.value?.close()
		}

		expose(publicApi)

		return () => (
			<UiBottomSheet
				ref={premiumModal}
				fullscreen
				withExitButton
				body={
					<div class={styles.buyPremium}>
						<img class={styles.image} src="/images/super-bro.webp" />
						<UiTabs
							selected={selectedPeriod.value}
							options={PREMIUM_OPTIONS}
							whenChange={whenChangePeriod}
						/>
						<div class={styles.informerBlock}>
							<div class={styles.informerItem}>
								<EnergyShadowedIcon height={50} />
								<div class={styles.informerTag}>
									<UiText fontSize={'10px'} fontFamily={'barcadeBrawl'} isAccent>
										5 {t('premium.energy')}
									</UiText>
								</div>
								<UiText fontSize={'12px'} fontWeight={700} color={'#F0F0F0'}>
									{t('premium.pointsLimit')}
								</UiText>
							</div>
							<div class={styles.informerItem}>
								<TimerIcon height={50} />
								<div class={styles.informerTag}>
									<UiText fontSize={'10px'} fontFamily={'barcadeBrawl'} isAccent>
										5 {t('minutes')}
									</UiText>
								</div>
								<UiText
									class={styles.textWithIcon}
									fontSize={'12px'}
									fontWeight={700}
									color={'#F0F0F0'}
								>
									{t('premium.regeneration')}
									<EnergyIcon height={14} />
								</UiText>
							</div>
						</div>
						<ul class={styles.list}>
							<li class={[styles.listItem, styles.listItemIcon]}>
								<LevelIcon height={17} />
								&nbsp;
								<UiText fontSize={'16px'} color={'#CBCBCB'}>
									{t('premium.premium')}
								</UiText>
								&nbsp;
								<UiText fontSize={'16px'} isAccent>
									{t('pvp.pvp')}
								</UiText>
								&nbsp;
								<UiText fontSize={'16px'} color={'#CBCBCB'}>
									{t('premium.heroCard')}
								</UiText>
							</li>
							{Boolean(periodProperties.value.boxes) && (
								<li class={[styles.listItem, styles.listItemIcon]}>
									<BoxIcon height={17} />
									&nbsp;
									<UiText fontSize={'16px'} color={'#CBCBCB'}>
										{periodProperties.value.boxes}&nbsp;{t('premium.bronze')}
									</UiText>
									&nbsp;
									<UiText fontSize={'16px'} isAccent>
										{t('lootbox', periodProperties.value.boxes)}
									</UiText>
								</li>
							)}
							<li class={styles.listItem}>
								<UiText fontSize={'16px'} color={'#CBCBCB'}>
									💰&nbsp;{t('premium.oneTimeBonus')}
								</UiText>
								&nbsp;
								<UiText fontSize={'16px'} isAccent>
									LVL*{Intl.NumberFormat('en-US').format(periodProperties.value.coins)}&nbsp;$BRO
								</UiText>
							</li>
							<li class={styles.listItem}>
								<UiText fontSize={'16px'} isAccent>
									👀&nbsp;{t('premium.statistics')}
								</UiText>
								&nbsp;
								<UiText fontSize={'16px'} color={'#CBCBCB'}>
									{t('premium.battle')}
								</UiText>
							</li>
							<li class={styles.listItem}>
								<UiText fontSize={'16px'} isAccent>
									📄&nbsp;{t('premium.WLspot')}
								</UiText>
								&nbsp;
								<UiText fontSize={'16px'} color={'#CBCBCB'}>
									{t('premium.NFTcollection')}
								</UiText>
							</li>
						</ul>
					</div>
				}
				footer={
					<UiButton
						size={'lg'}
						text={periodProperties.value.cost}
						loading={pvpStore.isLoading}
						leftIcon={<StarsIcon />}
						whenClick={whenBuyPremium}
					/>
				}
			/>
		)
	}
})
