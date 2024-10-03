import { defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import { UserBalance } from '@/components/ui/user-balance'
import { RouterView, useRouter } from 'vue-router'
import { UiTabs } from '@/components'
import { RouteName } from '@/router'
import { useCommonStore } from '@/stores/common'
import { useI18n } from 'vue-i18n'

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		const router = useRouter()
		const { t } = useI18n()

		const commonStore = useCommonStore()

		const activeTab = ref(router.currentRoute.value.name as string)

		const tabOptions = [
			{
				label: t('fight'),
				value: RouteName.GamePvp
			},
			{
				label: t('profile'),
				value: RouteName.GamePvpProfile
			},
			{
				label: t('findBroGame'),
				value: RouteName.GameFindBro
			}
		]

		const changeTab = (newTab: string) => {
			router.push({ name: newTab })
			activeTab.value = newTab
		}

		return () => (
			<>
				<UserBalance />
				<div class={styles.navigation}>
					<UiTabs
						disabled={commonStore.isNavigationDisabled}
						selected={activeTab.value}
						options={tabOptions}
						whenChange={changeTab}
					/>
				</div>
				<div class={styles.wrapper}>
					<RouterView />
				</div>
			</>
		)
	}
})

export default GamePage
