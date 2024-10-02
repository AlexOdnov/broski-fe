import { defineComponent, type PropType } from 'vue'
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
import type { CharacterProfile } from '@/api/generatedApi'

import styles from './match-competitioner-card.module.css'

export type CharacterProp = Pick<CharacterProfile, 'power' | 'abilities' | 'level'>

export const MatchCharacterCard = defineComponent({
	name: 'MatchCharacterCard',
	props: {
		userName: { type: String, required: true },
		character: { type: Object as PropType<CharacterProp | null> },
		isEnemy: { type: Boolean, default: false }
	},
	setup: (props) => {
		return () => (
			<div class={styles.card}>
				<div class={styles.userName}>
					<div class={styles.profileIconWrapper}>
						<ProfileIcon size={10} />
					</div>
					<UiText color={props.isEnemy && !props.character ? '#797979' : undefined}>
						{props.userName}
					</UiText>
				</div>
				<div
					class={
						props.isEnemy
							? [styles.profile, props.character ? styles.enemy : styles.enemyUnknown]
							: [styles.you, styles.profile, styles.yellowBorder]
					}
				/>
				<PowerCounter power={props.character?.power ?? 0} />
				<div class={styles.flexRow}>
					<div class={styles.iconWithNumber}>
						<WeightIcon height={12} />
						&nbsp;
						{props.character?.abilities?.weight?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<DefenceIcon height={12} />
						&nbsp;
						{props.character?.abilities?.defence?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<StrengthIcon height={12} />
						&nbsp;
						{props.character?.abilities?.strength?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<SpeedIcon height={12} />
						&nbsp;
						{props.character?.abilities?.speed?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<CombinationsIcon height={12} />
						&nbsp;
						{props.character?.abilities?.combinations?.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false
						}) ?? '00'}
					</div>
				</div>
				<div class={styles.lvl}>
					<LevelIcon height={12} />
					&nbsp;
					<UiText
						color="#4E4F4F"
						fontSize="12"
						fontWeight={400}
					>{`lvl ${props.character?.level ?? '??'}`}</UiText>
				</div>
			</div>
		)
	}
})
