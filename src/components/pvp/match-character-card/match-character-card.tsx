import { computed, defineComponent } from 'vue'
import {
	CombinationsIcon,
	DefenceIcon,
	LevelIcon,
	ProfileIcon,
	SpeedIcon,
	StrengthIcon,
	WeightIcon
} from '@/components/icons'
import { PowerCounter } from '@/components/pvp'
import { UiText } from '@/components'

import styles from './match-competitioner-card.module.css'
import { usePvpStore } from '@/stores/pvp'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { useI18n } from 'vue-i18n'

export const MatchCharacterCard = defineComponent({
	name: 'MatchCharacterCard',
	props: {
		isEnemy: { type: Boolean, default: false }
	},
	setup: (props) => {
		const tgStore = useTgSdkStore()
		const pvpStore = usePvpStore()
		const { t } = useI18n()
		const character = computed(() => {
			return props.isEnemy ? (pvpStore.pvpMatch?.opponent ?? null) : (pvpStore.pvpCharacter ?? null)
		})
		const totalPower = computed(() =>
			(pvpStore.pvpCharacter?.power ?? 0) > (pvpStore.pvpMatch?.opponent.power ?? 0)
				? pvpStore.pvpCharacter?.power
				: pvpStore.pvpMatch?.opponent.power
		)
		const imageUrl = computed(() => {
			return props.isEnemy
				? character.value
					? '/images/enemy-halloween.webp'
					: '/images/enemy_unknown-halloween.webp'
				: '/images/user-halloween.webp'
		})
		return () => (
			<div class={styles.card}>
				<div class={styles.userName}>
					<div class={styles.lvl}>
						<LevelIcon height={11} />
						<UiText
							color="#797979"
							fontSize="12px"
							lineHeight="12px"
							fontWeight={400}
						>{`lvl ${character.value?.level ?? '??'}`}</UiText>
					</div>
					<div class={styles.profileIconWrapper}>
						<ProfileIcon size={10} />
					</div>
					<UiText color={props.isEnemy && !character.value ? '#797979' : undefined}>
						{props.isEnemy
							? (pvpStore.pvpMatch?.opponent.username ?? t('pvp.lookingForEnemy'))
							: (tgStore.user?.username ?? 'user')}
					</UiText>
				</div>
				<img src={imageUrl.value} class={[styles.avatar, !props.isEnemy && styles.yellowBorder]} />
				<PowerCounter power={character.value?.power ?? 0} totalPower={totalPower.value} />
				<div class={styles.flexRow}>
					<div class={styles.iconWithNumber}>
						<StrengthIcon height={12} />
						&nbsp;
						{character.value?.abilities?.strength?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<DefenceIcon height={12} />
						&nbsp;
						{character.value?.abilities?.defence?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<SpeedIcon height={12} />
						&nbsp;
						{character.value?.abilities?.speed?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<WeightIcon height={12} />
						&nbsp;
						{character.value?.abilities?.weight?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<CombinationsIcon height={12} />
						&nbsp;
						{character.value?.abilities?.combinations?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
				</div>
			</div>
		)
	}
})
