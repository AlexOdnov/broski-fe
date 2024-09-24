import styles from './update-notification.module.css'
import { defineComponent } from 'vue'
import { UiButton } from '../ui'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useUpdateDescription } from '@/services/update-description'

export const UpdateNotificationComponent = defineComponent({
	name: 'UpdateNotificationComponent',
	setup: () => {
		const userStore = useUserStore()
		const { t } = useI18n()
		const updateDescription = useUpdateDescription()

		return () => (
			<div class={styles.update}>
				<div class={styles.contentWrapper}>
					<img class={styles.image} src="./images/update.webp" alt="example" />
					<div class={styles.header}>
						<p class={styles.subTitle}>{t('whatsNew')}</p>
						<p class={styles.title}>
							<span class={styles.yellow}>BROSKI</span>&nbsp;
							<span>{updateDescription.version}</span>&nbsp;
							<span>{t('update')}</span>
						</p>
					</div>
					<ul class={styles.changes}>
						{updateDescription.changes.map((el) => (
							<li>{el}</li>
						))}
					</ul>
				</div>
				<UiButton
					text={'ok'}
					mod={'primary'}
					size={'lg'}
					minWidth={'306px'}
					whenClick={userStore.doneUpdateNotification}
				/>
			</div>
		)
	}
})
