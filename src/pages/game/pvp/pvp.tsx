import { computed, defineComponent, onMounted, ref } from 'vue'

import styles from './pvp.module.css'
import { EnergyCounter } from '@/components/pvp/energy-counter'
import { usePvpStore } from '@/stores/pvp'
import {
	CombinationsIcon,
	DefenceIcon,
	LevelIcon,
	ProfileIcon,
	SpeedIcon,
	StrengthIcon,
	WeightIcon
} from '@/components/icons'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { PowerCounter } from '@/components/pvp'
import type { AbilityScores } from '@/api/generatedApi'
import { UiButton, UiText } from '@/components'

const PvpPage = defineComponent({
	name: 'PvpPage',
	setup() {
		const pvpStore = usePvpStore()
		const loading = ref(true)
		const tgStore = useTgSdkStore()

		const renderAbilities = (abilities: AbilityScores | undefined) => {
			return (
				<div class={styles.flexRow}>
					<div class={styles.iconWithNumber}>
						<WeightIcon height={12} />
						&nbsp;{abilities?.weight ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<DefenceIcon height={12} />
						&nbsp;{abilities?.defence ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<StrengthIcon height={12} />
						&nbsp;{abilities?.strength ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<SpeedIcon height={12} />
						&nbsp;{abilities?.speed ?? '00'}
					</div>
					<div class={styles.delimiter} />
					<div class={styles.iconWithNumber}>
						<CombinationsIcon height={12} />
						&nbsp;{abilities?.combinations ?? '00'}
					</div>
				</div>
			)
		}

		const playerAbils = computed(() => renderAbilities(pvpStore.pvpCharacter?.abilities))
		const enemyAbils = computed(() => renderAbilities(pvpStore.pvpMatch?.opponent.abilities))

		const renderButns = computed(() => {
			if (!pvpStore.pvpMatch) {
				return (
					<UiButton
						class={styles.fullWidth}
						font="BarcadeBrawlRegular"
						text="FIND ENEMY"
						loading={pvpStore.isLoading}
						mod="primary"
						whenClick={async () => {
							await pvpStore.searchPvpOpponent()
						}}
					/>
				)
			}
			if (!pvpStore.pvpMatchResult) {
				return (
					<>
						<UiButton
							font="BarcadeBrawlRegular"
							text="FIGHT"
							loading={pvpStore.isLoading}
							mod="primary"
							whenClick={async () => {
								await pvpStore.startPvpMatch()
							}}
						/>
						<UiButton
							font="BarcadeBrawlRegular"
							text="SKIP"
							loading={pvpStore.isLoading}
							mod="secondary"
							whenClick={async () => {
								await pvpStore.searchPvpOpponent()
							}}
						/>
					</>
				)
			}
			return (
				<UiButton
					font="BarcadeBrawlRegular"
					text="CLAIM"
					loading={pvpStore.isLoading}
					mod="secondary"
					whenClick={async () => {
						// тут что?
					}}
				/>
			)
		})

		onMounted(async () => {
			await pvpStore.loadPvpCharacter()
			loading.value = false
		})
		return () => (
			<div class={styles.pvp}>
				{!loading.value && (
					<EnergyCounter
						class={styles.fullWidth}
						currentEnergy={pvpStore.pvpCharacter?.energy.remaining ?? 0}
						totalEnergy={pvpStore.pvpCharacter?.energy.maximum ?? 0}
					/>
				)}
				<div class={styles.card}>
					<div class={styles.flexRow}>
						<div class={styles.profileIconWrapper}>
							<ProfileIcon size={10} />
						</div>
						{tgStore.user?.username ?? 'user'}
					</div>
					<div class={[styles.you, styles.profile, styles.yellowBorder]} />
					<PowerCounter power={pvpStore.pvpCharacter?.power ?? 0} />
					{playerAbils.value}
					<div class={styles.lvl}>
						<LevelIcon height={12} />
						<UiText
							color="#4E4F4F"
							fontSize="12"
							fontWeight={400}
						>{`lvl ${pvpStore.pvpCharacter?.level ?? '??'}`}</UiText>
					</div>
				</div>
				<div class={styles.card}>
					<div class={styles.flexRow}>
						<div class={styles.profileIconWrapper}>
							<ProfileIcon size={10} />
						</div>
						<UiText color="#797979">
							{pvpStore.pvpMatch?.opponent.username ?? 'looking for enemy'}
						</UiText>
					</div>
					<div
						class={[
							pvpStore.pvpMatch?.opponent ? styles.enemy : styles.enemyUnknown,
							styles.profile
						]}
					/>
					<PowerCounter power={pvpStore.pvpMatch?.opponent?.power ?? 0} />
					{enemyAbils.value}
					<div class={styles.lvl}>
						<LevelIcon height={12} />
						<UiText
							color="#4E4F4F"
							fontSize="12"
							fontWeight={400}
						>{`lvl ${pvpStore.pvpMatch?.opponent?.level ?? '??'}`}</UiText>
					</div>
				</div>
				{renderButns.value}
			</div>
		)
	}
})

export default PvpPage
