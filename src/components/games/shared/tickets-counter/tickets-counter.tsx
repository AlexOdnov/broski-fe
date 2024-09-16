import { defineComponent } from 'vue'
import styles from './styles.module.css'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

export const TicketsCounter = defineComponent({
	name: 'TicketsCounter',
	setup: () => {
		const userStore = useUserStore()
		const { t } = useI18n()

		return () => (
			<p class={styles.ticketsCounter}>
				{userStore.userTickets > 0 ? (
					<>
						You got <span class={styles.ticketsExist}>{t('ticket', userStore.userTickets)}</span>
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
