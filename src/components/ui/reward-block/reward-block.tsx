import { computed, defineComponent } from 'vue'
import styles from './reward-block.module.css'
import { useLocalization } from '@/services/localization'
import { CoinIcon, GiftIcon, StarsIcon, TicketIcon } from '@/components/icons'

export const RewardBlock = defineComponent({
	name: 'RewardBlock',
	props: {
		coins: { type: Number, default: 0 },
		tickets: { type: Number, default: 0 },
		premium: { type: Number, default: 0 },
		lootboxes: { type: Number, default: 0 }
	},
	setup: (props) => {
		const { t } = useLocalization()

		const length = computed(() => {
			let result = 0
			props.coins && result++
			props.tickets && result++
			props.premium && result++
			props.lootboxes && result++
			return result
		})

		return () => (
			<div class={styles.frame} style={`grid-template-columns: repeat(${length.value - 1}, 1fr 1px) 1fr;`}>
				{props.coins != 0 && (
					<>
						<div class={styles.coins}>
							<CoinIcon class={styles.marginHorizontal} height={50} />
							{`${props.coins} $BRO`}
						</div>
					</>
				)}
				{props.tickets != 0 && (
					<>
						{props.coins != 0 && <div class={styles.separator} />}
						<div class={styles.tickets}>
							<TicketIcon class={styles.marginHorizontal} height={50} />
							{t('ticket', props.tickets)}
						</div>
					</>
				)}
				{props.premium != 0 && (
					<>
						{(props.coins != 0 || props.tickets != 0) && <div class={styles.separator} />}
						<div class={styles.tickets}>
							<StarsIcon class={styles.marginHorizontal} height={50} style={{color: '#ffb800'}} />
							{`${t('days', props.premium)} ${t('superBro')}`}
						</div>
					</>
				)}
				{props.lootboxes != 0 && (
					<>
						{(props.coins != 0 || props.tickets != 0 || props.premium != 0) && <div class={styles.separator} />}
						<div class={styles.tickets}>
							<GiftIcon class={styles.marginHorizontal} height={50} />
							{`${props.lootboxes} ${t('lootbox', props.lootboxes)}`}
						</div>
					</>
				)}
			</div>
		)
	}
})
