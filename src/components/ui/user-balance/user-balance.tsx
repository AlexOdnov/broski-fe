import { computed, defineComponent } from 'vue'
import styles from './user-balance.module.css'
import { useUserStore } from '@/stores/user'
import { ProfileIcon, TonIcon } from '@/components/icons'
import { UiButton } from '@/components'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

export const UserBalance = defineComponent({
	name: 'UserBalance',
	setup: () => {
		const { t } = useI18n()
		const userStore = useUserStore()
		const coins = computed(() => Intl.NumberFormat('en-US').format(userStore.userScore))
		const tonBalance = computed(() => userStore.user?.ton_balance ?? 0)
		const boxes = computed(() => userStore.user?.boxes ?? 0)
		return () => (
			<div>
				<div class={styles.coins}>
					<img class={styles.coinIcon} src="/images/bro-coin.webp" />
					{coins.value}
				</div>
				<div class={styles.secondRow}>
					{!!tonBalance.value && (
						<>
							<div class={styles.tons}>
								<TonIcon class={styles.tonIcon} />
								{tonBalance.value}
							</div>
							<div class={styles.delimiter} />
						</>
					)}
					<div class={styles.boxes}>
						<img class={styles.boxIcon} src="/images/box.webp" />
						{boxes.value}
					</div>
					<div class={styles.delimiter} />
					<RouterLink class={styles.profileBtn} to="/profile">
						<UiButton
							size="sm"
							font="Roboto"
							mod="secondary"
							text={t('profile')}
							leftIcon={<ProfileIcon />}
							whenClick={() => {}}
						/>
					</RouterLink>
				</div>
			</div>
		)
	}
})
