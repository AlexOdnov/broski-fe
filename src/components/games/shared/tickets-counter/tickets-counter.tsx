import { defineComponent } from 'vue'
import styles from './styles.module.css'
import { useUserStore } from '@/stores/user'
import { useLocalization } from '@/services/localization'

/** @deprecated */
export const TicketsCounter = defineComponent({
	name: 'TicketsCounter',
	setup: () => {
		const userStore = useUserStore()
		const { t } = useLocalization()

		return () => (
			<p class={styles.ticketsCounter}>
				{userStore.userTickets > 0 ? (
					<>
						{t('youGot')}&nbsp;
						<span class={styles.ticketsExist}>{t('ticket', userStore.userTickets)}</span>
						<img class={styles.ticketImg} src="/images/ticket.webp" />
					</>
				) : (
					<>
						{t('broOutOfTickets')}
						<img class={styles.ticketImg} src="/images/ticket.webp" />
					</>
				)}
			</p>
		)
	}
})
