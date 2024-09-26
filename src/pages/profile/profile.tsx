import { defineComponent, ref } from 'vue'
import styles from './profile.module.css'
import { BoxIcon, CoinIcon, InfoIcon, MedalIcon, TonIcon } from '@/components/icons'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { HalfCircleDiagramm } from '@/components/ui/half-circle-diagram/half-circle-diagram'
import { TicketIcon } from '@/components/icons/ticket-icon'

const ProfilePage = defineComponent({
	name: 'ProfilePage',
	setup: () => {
		const userStore = useUserStore()
		const hlafCirclcreDiv = ref<HTMLDivElement | null>(null)
		const { t } = useI18n()
		return () => (
			<div class={styles.profileWrapper}>
				<div class={styles.profile}>
					<div class={[styles.fullWidth, styles.textTitle]}>{t('balance')}</div>
					<div class={[styles.card, styles.balance, styles.column]}>
						<TonIcon />
						<div>{userStore.user?.ton_balance}</div>
					</div>
					<div class={styles.delimiter} />
					<div class={[styles.card, styles.yellow, styles.column]}>
						<CoinIcon />
						<div>{userStore.user?.score}</div>
					</div>
					<div class={[styles.fullWidth, styles.balances, styles.card, styles.cardPadding]}>
						<div class={styles.iconWithNumber}>
							<TicketIcon height={14} /> {userStore.user?.tickets}
						</div>
						<div class={styles.delimiter} />
						<div class={styles.iconWithNumber}>
							<BoxIcon height={14} /> {userStore.user?.boxes}
						</div>
						<div class={styles.delimiter} />
						<div class={styles.iconWithNumber}>
							<MedalIcon height={14} /> ???
						</div>
					</div>
					<div class={[styles.fullWidth, styles.textTitle]}>
						{t('duelStatistics')}
						<InfoIcon />
					</div>
					<div ref={hlafCirclcreDiv} class={[styles.graphic, styles.yellow]}>
						<HalfCircleDiagramm width={hlafCirclcreDiv.value?.clientWidth} value={50} />
						{t('winRate')}
					</div>
					<div class={[styles.card, styles.yellow, styles.column, styles.statBlockText]}>
						{userStore.userStats?.duel.wins}
						<div>{t('wins')}</div>
					</div>
					<div class={[styles.card, styles.red, styles.column, styles.statBlockText]}>
						{userStore.userStats?.duel.loses}
						<div>{t('loses')}</div>
					</div>
					<div class={[styles.fullWidth, styles.balances, styles.card]}>
						<div class={styles.grayText}>{t('earned')}</div>
						<div class={styles.iconWithNumber}>
							<TonIcon />
							{userStore.userStats?.duel.tons}
						</div>
						<div class={styles.delimiter} />
						<div class={[styles.iconWithNumber, styles.yellow]}>
							<CoinIcon />
							{userStore.userStats?.duel.score}
						</div>
						<div class={styles.delimiter} />
						<div class={styles.grayText}>
							{t('games')}&nbsp;<b class={styles.white}>{userStore.userStats?.duel.total}</b>
						</div>
					</div>
					<div class={[styles.textTitle]}>
						{t('broFound')}
						<InfoIcon />
					</div>
					<div class={[styles.delimiter, styles.threeRow]} />
					<div class={[styles.textTitle]}>
						{t('superGame')}
						<InfoIcon />
					</div>
					<div class={[styles.card, styles.statBlockText]}>{userStore.userStats?.game.wins}</div>
					<div class={[styles.card, styles.statBlockText]}>
						{userStore.userStats?.super_game.wins}
					</div>
					<div class={[styles.card]}>
						<div class={[styles.iconWithNumber, styles.yellow]}>
							{userStore.userStats?.game.score}
							<CoinIcon />
						</div>
					</div>
					<div class={[styles.card]}>
						<div class={[styles.iconWithNumber, styles.yellow]}>
							{userStore.userStats?.super_game.score}
							<CoinIcon />
						</div>
					</div>
					<div class={[styles.fullWidth, styles.spaceBetween]}>
						<div class={styles.grayText}>{t('type')}</div>
						<div class={styles.grayText}>{t('totalEarned')}</div>
					</div>
					<div
						class={[
							styles.fullWidth,
							styles.bottomInfoBlock,
							styles.card,
							styles.cardPadding,
							styles.spaceBetween
						]}
					>
						<div>
							<span class={styles.grayText}>{t('bros')}:&nbsp;</span>
							<span class={styles.whiteText}>{userStore.userStats?.refs.total}</span>
						</div>
						<div class={styles.balances}>
							<div class={styles.iconWithNumber}>
								<CoinIcon />
								{userStore.userStats?.refs.score}
							</div>
							<div class={styles.delimiter} />
							<div class={styles.iconWithNumber}>
								<TicketIcon />
								{userStore.userStats?.refs.tickets}
							</div>
						</div>
					</div>
					<div
						class={[
							styles.fullWidth,
							styles.bottomInfoBlock,
							styles.card,
							styles.cardPadding,
							styles.spaceBetween
						]}
					>
						<div>
							<span class={styles.grayText}>{t('tasks')}:&nbsp;</span>
							<span class={styles.whiteText}>{userStore.userStats?.tasks.total}</span>
						</div>
						<div class={styles.balances}>
							<div class={styles.iconWithNumber}>
								<CoinIcon />
								{userStore.userStats?.tasks.score}
							</div>
							<div class={styles.delimiter} />
							<div class={styles.iconWithNumber}>
								<TicketIcon />
								{userStore.userStats?.tasks.tickets}
							</div>
						</div>
					</div>
					<div
						class={[
							styles.fullWidth,
							styles.bottomInfoBlock,
							styles.card,
							styles.cardPadding,
							styles.spaceBetween
						]}
					>
						<div>
							<span class={styles.grayText}>{t('farming')}:&nbsp;</span>
							<span class={styles.whiteText}>{userStore.userStats?.mining.total}</span>
						</div>
						<div class={styles.balances}>
							<div class={styles.iconWithNumber}>
								<CoinIcon />
								{userStore.userStats?.mining.score}
							</div>
							<div class={styles.delimiter} />
						</div>
					</div>
				</div>
			</div>
		)
	}
})
export default ProfilePage
