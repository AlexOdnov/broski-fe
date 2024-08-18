import { defineComponent } from 'vue'
import styles from './styles.module.css'
import { useUserStore } from '@/stores/user'

export const TicketsCounter = defineComponent({
	name: 'TicketsCounter',
	setup: () => {
		const userStore = useUserStore()

		return () => (
			<p class={styles.ticketsCounter}>
				{userStore.userTickets ? (
					<>
						You got <span class={styles.ticketsExist}>{userStore.userTickets}</span>
						<img class={styles.ticketImg} src="/images/ticket.png" />
						{userStore.userTickets > 1 ? 'Tickets' : 'Ticket'}
					</>
				) : (
					<>
						Bro, you're <span class={styles.ticketsEmpty}>out of</span> tickets, bro!
						<img class={styles.ticketImg} src="/images/ticket.png" />
					</>
				)}
			</p>
		)
	}
})
