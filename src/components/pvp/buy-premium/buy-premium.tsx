import { computed, defineComponent, ref, type PropType } from 'vue'
import styles from './buy-premium.module.css'
import { UiButton, UiTabs, UiText } from '@/components/ui'
import { useI18n } from 'vue-i18n'
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

export const BuyPremium = defineComponent({
	name: 'BuyPremium',
	props: {
		whenBuyPremium: { type: Function as PropType<() => void>, required: true }
	},
	setup: (props) => {
		const { t } = useI18n()
		const tgStore = useTgSdkStore()
		const pvpStore = usePvpStore()

		const selectedPeriod = ref('30')

		const PREMIUM_OPTIONS = [
			{
				label: `14 ${t('days')}`,
				value: '14'
			},
			{
				label: `30 ${t('days')}`,
				value: '30'
			},
			{
				label: `90 ${t('days')}`,
				value: '90'
			}
		]

		const periodProperties = computed(() => {
			switch (selectedPeriod.value) {
				case '14':
					return {
						cost: '465',
						boxes: 3,
						coins: 3000,
						invoice: envVariables.invoice14Premium
					}
				case '30':
					return {
						cost: '777',
						boxes: 10,
						coins: 10000,
						invoice: envVariables.invoice30Premium
					}
				case '90':
					return {
						cost: '1899',
						boxes: 45,
						coins: 45000,
						invoice: envVariables.invoice90Premium
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
			tgStore.openInvoice(periodProperties.value.invoice, async () => {
				await pvpStore.loadPvpCharacter()
				props.whenBuyPremium()
			})
		}

		return () => (
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
						<LevelIcon height={13} />
						&nbsp;
						<UiText fontSize={'12px'} color={'#CBCBCB'}>
							{t('premium.premium')}
						</UiText>
						&nbsp;
						<UiText fontSize={'12px'} isAccent>
							{t('pvp.pvp')}
						</UiText>
						&nbsp;
						<UiText fontSize={'12px'} color={'#CBCBCB'}>
							{t('premium.heroCard')}
						</UiText>
					</li>
					<li class={[styles.listItem, styles.listItemIcon]}>
						<BoxIcon height={13} />
						&nbsp;
						<UiText fontSize={'12px'} color={'#CBCBCB'}>
							{periodProperties.value.boxes}&nbsp;{t('premium.bronze')}
						</UiText>
						&nbsp;
						<UiText fontSize={'12px'} isAccent>
							{t('premium.lootboxes')}
						</UiText>
					</li>
					<li class={styles.listItem}>
						<UiText fontSize={'12px'} color={'#CBCBCB'}>
							💰&nbsp;{t('premium.oneTimeBonus')}
						</UiText>
						&nbsp;
						<UiText fontSize={'12px'} isAccent>
							LVL*{Intl.NumberFormat('en-US').format(periodProperties.value.coins)}&nbsp;$BRO
						</UiText>
					</li>
					<li class={styles.listItem}>
						<UiText fontSize={'12px'} isAccent>
							👀&nbsp;{t('premium.statistics')}
						</UiText>
						&nbsp;
						<UiText fontSize={'12px'} color={'#CBCBCB'}>
							{t('premium.battle')}
						</UiText>
					</li>
					<li class={styles.listItem}>
						<UiText fontSize={'12px'} isAccent>
							📄&nbsp;{t('premium.WLspot')}
						</UiText>
						&nbsp;
						<UiText fontSize={'12px'} color={'#CBCBCB'}>
							{t('premium.NFTcollection')}
						</UiText>
					</li>
				</ul>
				<UiButton
					size={'lg'}
					text={periodProperties.value.cost}
					loading={pvpStore.isLoading}
					leftIcon={<StarsIcon />}
					whenClick={whenBuyPremium}
				/>
			</div>
		)
	}
})
