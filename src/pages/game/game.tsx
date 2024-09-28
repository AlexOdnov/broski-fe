import { defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import { UserBalance } from '@/components/ui/user-balance'
import { RouterView, useRouter } from 'vue-router'
import { UiTabs } from '@/components'
import { RouteName } from '@/router'
import { useCommonStore } from '@/stores/common'

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		const router = useRouter()

		const commonStore = useCommonStore()

		const activeTab = ref(router.currentRoute.value.name as string)

		const tabOptions = [
			{
				label: 'Fight',
				value: RouteName.GamePvp
			},
			{
				label: 'Profile',
				value: RouteName.GamePvpProfile
			},
			{
				label: '3x3',
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
