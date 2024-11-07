import { computed, defineComponent } from 'vue'
import { LevelIcon, StarsIcon, ProfileIcon } from '@/components/icons'
import { AbilityCounter, PowerCounter } from '@/components/pvp'
import { CoinCounter, UiText } from '@/components'

import styles from './match-character-card.module.css'
import { usePvpStore } from '@/stores/pvp'
import { useTgSdkStore } from '@/stores/tg-sdk'
import { useLocalization } from '@/services/localization'

export const MatchCharacterCard = defineComponent({
	name: 'MatchCharacterCard',
	props: {
		isEnemy: { type: Boolean, default: false }
	},
	setup: (props) => {
		const tgStore = useTgSdkStore()
		const pvpStore = usePvpStore()
		const { t } = useLocalization()

		const character = computed(() => {
			return props.isEnemy ? (pvpStore.pvpMatch?.opponent ?? null) : (pvpStore.pvpCharacter ?? null)
		})

		const totalPower = computed(() =>
			character.value?.power
				? Math.max(pvpStore.pvpCharacter?.power ?? 0, pvpStore.pvpMatch?.opponent.power ?? 0)
				: 0
		)

		const imageUrl = computed(() => {
			const enemyImg = character.value?.premium ? '/images/enemy-prem.webp' : '/images/enemy.webp'

			const userImg = character.value?.premium ? '/images/user-prem.webp' : '/images/user.webp'

			return props.isEnemy ? (character.value ? enemyImg : '/images/enemy_unknown.webp') : userImg
		})

		const maximumAbilityValue = computed(() => {
			return (
				Math.max(
					...Object.values(pvpStore.pvpCharacter?.abilities || {}),
					...Object.values(pvpStore.pvpMatch?.opponent.abilities || {})
				) ?? 1
			)
		})

		return () => (
			<div class={styles.card}>
				<div class={styles.userName}>
					{props.isEnemy ? (
						character.value ? (
							<div class={styles.lvl}>
								<LevelIcon height={11} />
								<UiText
									color="#797979"
									fontSize="12px"
									lineHeight="12px"
									fontWeight={400}
								>{`lvl ${character.value?.level}`}</UiText>
							</div>
						) : (
							<div class={styles.profileIconWrapper}>
								<UiText isAccent fontWeight={700} fontSize={'12px'}>
									i
								</UiText>
							</div>
						)
					) : (
						<div class={styles.profileIconWrapper}>
							<ProfileIcon size={10} />
						</div>
					)}
					<UiText color={props.isEnemy && !character.value ? '#797979' : undefined}>
						{props.isEnemy
							? (pvpStore.pvpMatch?.opponent.username ?? t('pvp.lookingForEnemy'))
							: (tgStore.user?.username ?? 'user')}
					</UiText>
				</div>
				<div class={styles.avatarWrapper}>
					<img
						src={imageUrl.value}
						class={[styles.avatar, !props.isEnemy && styles.yellowBorder]}
					/>
					{character.value?.premium && (
						<StarsIcon class={props.isEnemy ? styles.premIconEnemy : styles.premIcon} />
					)}
				</div>
				<div class={styles.abilities}>
					<AbilityCounter
						size={'sm'}
						abilityType={'strength'}
						currentValue={character.value?.abilities.strength ?? 0}
						maximumValue={maximumAbilityValue.value}
						disabled={!character.value}
					/>
					<AbilityCounter
						size={'sm'}
						abilityType={'defence'}
						currentValue={character.value?.abilities.defence ?? 0}
						maximumValue={maximumAbilityValue.value}
						disabled={!character.value}
					/>
					<AbilityCounter
						size={'sm'}
						abilityType={'speed'}
						currentValue={character.value?.abilities.speed ?? 0}
						maximumValue={maximumAbilityValue.value}
						disabled={!character.value}
					/>
					<AbilityCounter
						size={'sm'}
						abilityType={'weight'}
						currentValue={character.value?.abilities.weight ?? 0}
						maximumValue={maximumAbilityValue.value}
						disabled={!character.value}
					/>
					<AbilityCounter
						size={'sm'}
						abilityType={'combinations'}
						currentValue={character.value?.abilities.combinations ?? 0}
						maximumValue={maximumAbilityValue.value}
						disabled={!character.value}
					/>
				</div>
				<PowerCounter power={character.value?.power ?? 0} totalPower={totalPower.value} />
				{pvpStore.isCharacterPremium && (
					<div class={styles.stats}>
						<div class={styles.statsRow}>
							<UiText fontSize={'12px'} color={'#797979'}>
								{t('premium.pvpWon')}:
							</UiText>
							<UiText fontSize={'12px'} fontWeight={700} isAccent>
								{typeof character.value?.stats?.won === 'number'
									? Intl.NumberFormat('en-US').format(character.value?.stats?.won)
									: '??'}
							</UiText>
						</div>
						<div class={styles.statsRow}>
							<UiText fontSize={'12px'} color={'#797979'}>
								{t('premium.robbed')}:
							</UiText>
							{typeof character.value?.stats?.loot === 'number' ? (
								<CoinCounter size={12} coins={character.value?.stats?.loot} />
							) : (
								<UiText fontSize={'12px'} fontWeight={700} isAccent>
									??
								</UiText>
							)}
						</div>
					</div>
				)}
			</div>
		)
	}
})
