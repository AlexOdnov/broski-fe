import { computed, defineComponent, ref } from 'vue'

import styles from './styles.module.css'
import { RouterView, useRouter } from 'vue-router'
import { UiTabs } from '@/components'
import { RouteName } from '@/router'
import { useCommonStore } from '@/stores/common'
import { useLocalization } from '@/services/localization'
import { UiHeader, type ITabOption } from '@/components/ui'
import { useUserStore } from '@/stores/user'
import { usePvpStore } from '@/stores/pvp'

const GamePage = defineComponent({
	name: 'GamePage',
	setup() {
		const { t } = useLocalization()
		const router = useRouter()
		const commonStore = useCommonStore()
		const userStore = useUserStore()
		const pvpStore = usePvpStore()

		const activeTab = ref(router.currentRoute.value.name as string)

		const isAbilityUpgradeAvailable = computed(
			() => userStore.userScore >= Math.min(...Object.values(pvpStore.abilityUpgradeCosts))
		)

		const tabOptions = computed<ITabOption[]>(() => [
			{
				label: t('profile'),
				value: RouteName.GamePvpProfile,
				notice: isAbilityUpgradeAvailable.value
			},
			{
				label: t('fight'),
				value: RouteName.GamePvp
			},
			{
				label: t('soon'),
				value: RouteName.GameFindBro,
				disabled: true
			}
		])

		const changeTab = (newTab: string) => {
			router.push({ name: newTab })
			activeTab.value = newTab
		}

		return () => (
			<>
				<UiHeader />
				<div class={styles.navigation}>
					<UiTabs
						disabled={commonStore.isNavigationDisabled}
						selected={activeTab.value}
						options={tabOptions.value}
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
