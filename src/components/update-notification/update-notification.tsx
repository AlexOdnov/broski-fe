import styles from './update-notification.module.css'
import { defineComponent } from 'vue'
import { UiPopup, UiText } from '../ui'
import { useUserStore } from '@/stores/user'
import { useUpdateDescription } from '@/services/update-description'
import { useLocalization } from '@/services/localization'

export const UpdateNotificationComponent = defineComponent({
	name: 'UpdateNotificationComponent',
	setup: () => {
		const userStore = useUserStore()
		const updateDescription = useUpdateDescription()
		const { t } = useLocalization()

		return () => (
			<UiPopup
				header={
					<div class={styles.header}>
						<UiText fontWeight={700} fontSize={'18px'} color={'#f0f0f0'} alignCenter>
							{t('whatsNew')}
						</UiText>
						<p class={styles.title}>
							<UiText isAccent>BROSKI</UiText>&nbsp;
							<span>{updateDescription.version}</span>&nbsp;
							<span>{t('update')}</span>
						</p>
					</div>
				}
				body={
					<ul class={styles.changes}>
						{updateDescription.changes.map((el) => (
							<li>{el}</li>
						))}
					</ul>
				}
				image="/images/update.webp"
				whenClick={userStore.doneUpdateNotification}
			/>
		)
	}
})
