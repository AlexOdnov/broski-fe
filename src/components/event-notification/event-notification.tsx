import styles from './event-notification.module.css'
import { defineComponent } from 'vue'
import { UiPopup, UiText } from '../ui'
import { useUserStore } from '@/stores/user'
import { useEventDescription } from '@/services/event-description'

export const EventNotificationComponent = defineComponent({
	name: 'EventNotificationComponent',
	setup: () => {
		const userStore = useUserStore()
		const eventDescription = useEventDescription()

		return () => (
			<UiPopup
				header={
					<UiText
						class={styles.title}
						fontWeight={500}
						fontSize={'22px'}
						color={'#F0F0F0'}
						alignCenter
					>
						{eventDescription.title}
					</UiText>
				}
				body={
					<div class={styles.description}>
						{eventDescription.description.map((el) => (
							<UiText fontWeight={400} fontSize={'16px'} color={'#CBCBCB'}>
								{el}
							</UiText>
						))}
					</div>
				}
				image={`/images/event.webp?${Date.now()}`}
				whenClick={userStore.doneUpdateNotification}
			/>
		)
	}
})
